// Returns a 2d array of random numbers between 0 and 255 of dimensions h by w. Requires a seed for repeatablility.
// Set seed to null to get random seeding.
// Requires the altered Math.random from the seedrandom.min.js included in resources).
function random_one_channel(seed, w,h) {
    Math.seedrandom(seed);
    return [...new Array(h)].map(y => [...new Array(w)].map(x => Math.random()*255));
}

function random_black_or_white(seed, w,h) {
    Math.seedrandom(seed);
    return [...new Array(h)].map(y => [...new Array(w)].map(x => Math.round(Math.random())*255));
}

function random_three_channel(seed, w,h) {
    Math.seedrandom(seed);
    return [...new Array(h)].map(y => 
                [...new Array(w)].map(x =>  
                        [Math.random()*255, Math.random()*255, Math.random(255)*365]
    ));
}

// Expects a smoothing factor between 0 (no smoothing) and 1 (fully gradient).
// TODO: fix this to do as stated
function random_smooth_one_channel(seed, w,h, smoothing) {
    let image = random_one_channel(seed, w,h);
    let numPixelsToSmooth = Math.floor(smoothing * w);
    let d = function (a,b) {
        return Math.sqrt(((a.x - b.x)**2 + (a.y - b.y)**2));
    }
    for (let i=0; i<h; ++i) {
        for (let j=0; j<w; ++j) {


            if (i%numPixelsToSmooth!=0 && j%numPixelsToSmooth!=0 && i!=0 && j!=0 && i!=h-1 && j!=w-1) {
                image[Math.floor(i/numPixelsToSmooth)][Math.floor(j/numPixelsToSmooth)];
                image[i][j] = [0,100,0];
            } else {
            }
        }
    }
    return image;
}

let experiments = [
    function (seed, w,h) {
        let image = random_one_channel(seed, w,h);

        for (let row=0; row<h; ++row) {
            for (let col=0; col<w; ++col) {
                if (col!=0) {
                    // This is the interesting part (I accidentally didn't put parenthesis and it did some wierd stuff and i messed up the order of col and rows)
                    image[row][col] = image[col-1][row] + image[col][row]/2;
                }
            }
        }
        return image;

    },
    function (seed, w,h) {
        let image = random_one_channel(seed, w,h);

        for (let row=0; row<h; ++row) {
            for (let col=0; col<w; ++col) {
                if (col > 0) {
                    image[row][col] = (image[row][col-1] + image[row][col])/2;
                } else {
                    image[row][col] = (image[row][h-1] + image[row][col])/2;
                }
            }
        }
        return image;

    },
    function (seed, w,h) {
        let image = random_black_or_white(seed, w,h);

        for (let row=0; row<h; ++row) {
            for (let col=0; col<w; ++col) {
                if (col > 0) {
                    image[row][col] = (image[row][col-1] + image[row][col])/2;
                } else {
                    image[row][col] = (image[row][h-1] + image[row][col])/2;
                }
            }
        }
        return image;

    }
]