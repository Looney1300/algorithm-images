// Returns a 2d array of random numbers between 0 and 255 of dimensions h by w. Requires a seed for repeatablility.
// Requires the altered Math.random from the seedrandom.min.js included in resources).
function random_one_channel(seed, w,h) {
    Math.seedrandom(seed);
    return [...new Array(h)].map(y => [...new Array(w)].map(x => Math.random()*255));
}

function random_three_channel(seed, w,h) {
    Math.seedrandom(seed);
    return [...new Array(h)].map(y => 
                [...new Array(w)].map(x =>  
                        [Math.random()*255, Math.random()*255, Math.random(255)*365]
    ));
}