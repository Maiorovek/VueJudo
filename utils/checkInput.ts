const checkInput = (ref: HTMLElement): boolean => {
    const inputs: HTMLInputElement[] = Array.from(ref.querySelectorAll('[required-input]'));

    const errorInputs: HTMLInputElement[] = inputs.filter(input => {
        const trimmedValue: string = input.value.trim();
        const hasError: boolean = trimmedValue === '';

        input.classList.toggle('error', hasError);

        return hasError;
    });

    inputs.forEach(input => {
        if (!input.classList.contains('error')) {
            input.classList.remove('error');
        }
    });

    return errorInputs.length === 0;
}

export default checkInput
