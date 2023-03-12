async function encodeImageFileAsURL(element) {
    let file = element.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
        return reader.result
    }
    reader.readAsDataURL(file);
}

export default encodeImageFileAsURL
