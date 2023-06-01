/**
 * Декодирует изображение в data-формат
 * @param element изображение
 * @returns {string}
 */

async function decoderImage(element: HTMLInputElement): Promise<string> {
    if (!element.files || element.files.length === 0) {
        throw new Error('No file selected.');
    }

    const file = element.files[0];
    const reader = new FileReader();
    const promise = new Promise<string>((resolve) => {
        reader.onload = () => {
            resolve(reader.result as string);
        };
    });
    reader.readAsDataURL(file);
    return await promise;
}

export default decoderImage;
