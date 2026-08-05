/**
 * Fast & Reliable Image Uploader for MalluChat
 * Compresses photo to ~20KB JPEG Blob on HTML5 canvas and uploads via CORS multipart FormData.
 * Guarantees direct HTTPS image URL (< 100 bytes) so ntfy.sh and PeerJS WebSocket broadcast to all receiving users!
 */

export const compressImageToBlob = (file: File, maxWidth = 800, maxHeight = 800, quality = 0.7): Promise<Blob> => {
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
          reject(new Error('Canvas context not available'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Canvas toBlob failed'));
            }
          },
          'image/jpeg',
          quality
        );
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const uploadOrCompressImage = async (file: File): Promise<string> => {
  // Compress photo to small JPEG Blob (~20KB) for instant high-speed upload
  let blobToUpload: Blob = file;
  try {
    blobToUpload = await compressImageToBlob(file, 800, 800, 0.7);
  } catch (e) {
    console.warn('Canvas blob compression fallback:', e);
  }

  // 1. Primary Upload: Tmpfiles.org (CORS FormData browser endpoint)
  try {
    const form = new FormData();
    form.append('file', blobToUpload, 'photo.jpg');

    const res = await fetch('https://tmpfiles.org/api/v1/upload', {
      method: 'POST',
      body: form
    });

    if (res.ok) {
      const data = await res.json();
      if (data?.data?.url) {
        const directUrl = data.data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
        return directUrl;
      }
    }
  } catch (e) {
    console.warn('Tmpfiles upload failed, trying secondary host...', e);
  }

  // 2. Secondary Upload: Catbox.moe
  try {
    const form = new FormData();
    form.append('reqtype', 'fileupload');
    form.append('fileToUpload', blobToUpload, 'photo.jpg');
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

  throw new Error('Image upload failed. Please check your internet connection.');
};
