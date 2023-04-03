/**
 * Декодирует изображение в data-формат
 * @param element изображение
 * @returns {string}
 */

async function decoderImage(element) {
   const file = element.files[0];
   const reader = new FileReader();
   const promise = new Promise((resolve) => {
      reader.onload = () => {
         resolve(reader.result)
      }
   });
   reader.readAsDataURL(file);
   return await promise
}

export default decoderImage
