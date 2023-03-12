const decoderImage = (element) => {
    let value
    const file = element.files[0];
    const reader = new FileReader();
    console.log(reader)
    reader.onloadend = () => {
        value = reader.result
    }
    reader.readAsDataURL(file);
    return value
}

export default decoderImage
