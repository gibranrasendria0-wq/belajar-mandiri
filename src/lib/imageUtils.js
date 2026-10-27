/**
 * Utility to process and resize images from device gallery/file picker
 * Automatically compresses to square base64 JPEG/WebP so it stores efficiently in localStorage.
 */

export function processImageFile(file, { maxSize = 256, quality = 0.85 } = {}) {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error('Tidak ada file gambar yang dipilih.'));
    }

    if (!file.type.startsWith('image/')) {
      return reject(new Error('Format file harus berupa gambar (JPG, PNG, WebP, GIF).'));
    }

    // Limit incoming file size to 15MB before resizing
    if (file.size > 15 * 1024 * 1024) {
      return reject(new Error('Ukuran file terlalu besar. Maksimal 15MB sebelum dikompresi.'));
    }

    const reader = new FileReader();

    reader.onerror = () => {
      reject(new Error('Gagal membaca file gambar dari galeri Anda.'));
    };

    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => {
        reject(new Error('Format gambar tidak dapat diproses.'));
      };

      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          // Center crop to square
          const minDim = Math.min(img.width, img.height);
          const startX = (img.width - minDim) / 2;
          const startY = (img.height - minDim) / 2;

          canvas.width = maxSize;
          canvas.height = maxSize;

          // High quality image smoothing
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';

          // Draw cropped and resized image
          ctx.drawImage(
            img,
            startX,
            startY,
            minDim,
            minDim,
            0,
            0,
            maxSize,
            maxSize
          );

          // Prefer webp, fallback to jpeg
          let dataUrl = '';
          try {
            dataUrl = canvas.toDataURL('image/webp', quality);
            if (!dataUrl.startsWith('data:image/webp')) {
              dataUrl = canvas.toDataURL('image/jpeg', quality);
            }
          } catch {
            dataUrl = canvas.toDataURL('image/jpeg', quality);
          }

          // Rough size estimate in KB
          const sizeKb = Math.round((dataUrl.length * 3) / 4 / 1024);

          resolve({
            dataUrl,
            width: maxSize,
            height: maxSize,
            sizeKb,
            name: file.name,
          });
        } catch (err) {
          reject(new Error(`Terjadi kesalahan saat memproses gambar: ${err.message}`));
        }
      };

      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  });
}
