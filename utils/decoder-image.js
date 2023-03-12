async function decoderImage(element) {
    const file = element.files[0];
    const reader = new FileReader();
    const promise = new Promise((resolve) => {
        reader.onload = () => {
            resolve(reader.result)
        }
    });
    reader.readAsDataURL(file);
    const result = await promise
    return result 
} 
export default decoderImage
