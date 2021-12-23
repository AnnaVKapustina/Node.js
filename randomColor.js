const CHARACTERS = "0123456789abcdef";

const randomColor = () => {
    let random = "";
    const charactersLength = CHARACTERS.length;
    for (let i = 0; i < 6; i++) {
        random += CHARACTERS.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return random;
};

exports.randomColor = randomColor;