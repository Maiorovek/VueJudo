
async function decoderImage(element) {
    let value = 0
    const file = element.files[0];
    const reader = new FileReader();
    console.log(reader)

    let promise = new Promise((resolve, reject) => {
        reader.onload = () => {
            resolve(reader.result)
        }
    });

    reader.readAsDataURL(file);
    let result = await promise
    return result
} 

export default decoderImage
