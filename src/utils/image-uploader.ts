/**
 * Image Uploader & Compressor Utility for MalluChat
 * Compresses images on HTML5 canvas and uploads to Cloudflare-backed iili.io (FreeImageHost)
 * with multi-host failovers and compressed base64 fallback.
 */

export const compressImage = (file: File, maxWidth = 500, maxHeight = 500, quality = 0.45): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        // Draw image on canvas with white background (in case of transparent PNG)
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      img.onerror = () => reject(new Error('Failed to load image for compression'));
      img.src = e.target?.result as string;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

export const uploadOrCompressImage = async (file: File): Promise<string> => {
  // Compress image on canvas first to get a small base64 string
  let compressedBase64 = '';
  try {
    compressedBase64 = await compressImage(file, 500, 500, 0.45);
  } catch (e) {
    console.warn('Canvas compression failed:', e);
  }

  // 1. Try FreeImageHost (iili.io Cloudflare CDN - 100% accessible worldwide including India ISPs & Safari)
  try {
    const base64Data = compressedBase64 ? compressedBase64.replace(/^data:image\/\w+;base64,/, '') : '';
    if (base64Data) {
      const form = new FormData();
      form.append('key', '6d207e02198a847aa98d0a2a901485a5');
      form.append('action', 'upload');
      form.append('source', base64Data);
      form.append('format', 'json');

      const res = await fetch('https://freeimage.host/api/1/upload', {
        method: 'POST',
        body: form
      });

      if (res.ok) {
        const data = await res.json();
        if (data?.image?.url) {
          return data.image.url;
        }
      }
    }
  } catch (e) {
    console.warn('FreeImageHost upload failed, trying secondary...', e);
  }

  // 2. Try Catbox.moe
  try {
    const form = new FormData();
    form.append('reqtype', 'fileupload');
    form.append('fileToUpload', file);
    const res = await fetch('https://catbox.moe/user/api.php', {
      method: 'POST',
      body: form
    });
    if (res.ok) {
      const url = (await res.text()).trim();
      if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
      }
    }
  } catch (e) {
    console.warn('Catbox upload failed:', e);
  }

  // 3. Fallback to direct compressed base64 (~15KB) if network uploads fail
  if (compressedBase64) {
    return compressedBase64;
  }

  // Final fallback: read raw file
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
