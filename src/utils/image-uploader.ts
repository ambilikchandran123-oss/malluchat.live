/**
 * Image Uploader & Compressor Utility for MalluChat
 * Compresses images on HTML5 canvas and uploads to reliable direct CORS-enabled hosts
 * (catbox.moe -> tmpfiles.org -> compressed base64 fallback).
 */

export const compressImage = (file: File, maxWidth = 600, maxHeight = 600, quality = 0.5): Promise<string> => {
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
  // 1. Try Catbox.moe (CORS-enabled direct image hosting)
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
    console.warn('Catbox upload failed, trying secondary host...', e);
  }

  // 2. Try Tmpfiles.org
  try {
    const form = new FormData();
    form.append('file', file);
    const res = await fetch('https://tmpfiles.org/api/v1/upload', {
      method: 'POST',
      body: form
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.data?.url) {
        return data.data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
      }
    }
  } catch (e) {
    console.warn('Tmpfiles upload failed, using compressed canvas base64...', e);
  }

  // 3. Fallback: Compress photo to small JPEG data URL (< 25KB)
  return await compressImage(file, 500, 500, 0.45);
};
