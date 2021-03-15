const WIDTH = 3;    // width of canvas in pixels
const HEIGHT = 1;   // height of canvas in pixels


document.getElementById('canvas').width = WIDTH;
document.getElementById('canvas').height = HEIGHT;

let canvasAPI = (function (canvas) {

    function setPixel(x,y, color) {
        if (!Array.isArray(color)){
            let c = color;
            canvas.fillStyle = `rgb(${c}, ${c}, ${c})`;
        }
        else if (color.length === 3) {
            canvas.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
        } 
        else if (color.length === 4) {
            canvas.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`;
        } 
        else if (color.length === 1) {
            let c = color[0];
            canvas.fillStyle = `rgb(${c}, ${c}, ${c})`;
        } else {
            console.error(`${color} is not a valid color value. Should be single value, rgb, or rgba.`);
            return;
        }
        canvas.fillRect(x,y,1,1);
    }

    function drawPixelImage(x,y, w,h, src) {
        for (let i=0; i<h; ++i) {
            for (let j=0; j<w; ++j) {
                setPixel(x+j,y+i, src[i][j]);
            }
        }
    }

    return {
        setPixel,
        drawPixelImage
    }
    
})(document.getElementById('canvas').getContext('2d'));

canvasAPI.drawPixelImage(0,0, WIDTH, HEIGHT, random_three_channel('h', WIDTH, HEIGHT));
// setInterval( function() {
//     canvasAPI.drawPixelImage(0,0, WIDTH, HEIGHT, random_three_channel(null, WIDTH, HEIGHT));
// }, 50);
//canvasAPI.drawPixelImage(0,0, WIDTH, HEIGHT, random_three_channel('1', WIDTH, HEIGHT));