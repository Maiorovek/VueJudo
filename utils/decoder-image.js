const decoderImage = (element) => {
    const file = element.files[0];
    const reader = new FileReader();
    reader.onloadend = () => { return reader.result }
    reader.readAsDataURL(file);
}
export default decoderImage
