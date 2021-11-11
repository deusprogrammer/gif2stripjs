const extractFrames = require('gif-extract-frames');
const ji = require('join-images');

(async () => {
    const results = await extractFrames({
        input: process.argv[2],
        output: './temp/frame-%d.png',
        coalesce: false
    });

    let images = [];
    for (let i = 0; i < results.shape[0]; i++) {
        images.push(`./temp/frame-${i}.png`);
    }
    
    ji.joinImages(images, {
        direction: "horizontal",
        color: { alpha: 0, b: 0, g: 0, r: 0 }
    }).then((img) => {
        // Save image as file
        img.toFile('./temp/exploded.png');
    });
})();