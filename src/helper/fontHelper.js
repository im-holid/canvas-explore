import minecraftaFont from '../assets/fonts/Minecraft.ttf'

export const loadMinecraftFont = async () => {
    const fontFace = new FontFace('Minecraft', `url(${minecraftaFont})`)
    return new Promise((resolve) => {
        fontFace.load().then((res) => {
            document.fonts.add(res)
        }).catch((err) => {
            console.warn('failed load font\n', err);
        }).finally(() => resolve(true))
    })
}

/**
 * autimatically read break line since canvas doesnt provide it, also center between word
 * @param {CanvasRenderingContext2D} context 
 * @param {string} text 
 * @param {number} x 
 * @param {number} y 
 * @param {number} maxWidth 
 * @param {number} lineHeight 
 */
export const wrapText = (context, text, x, y, maxWidth, lineHeight) => {
    var cars = text.split("\n");

    for (var ii = 0; ii < cars.length; ii++) {

        var line = "";
        var words = cars[ii].split(" ");

        for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + " ";
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;

            if (testWidth > maxWidth) {
                context.fillText(line, x, y);
                line = words[n] + " ";
                y += lineHeight;
            }
            else {
                line = testLine;
            }
        }

        context.fillText(line, x, y);
        y += lineHeight;
    }
}