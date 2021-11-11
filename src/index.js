const extractFrames = require('gif-extract-frames');
const ji = require('join-images');
const fs = require('fs');

(async () => {
    // Create temp directory
    if (!fs.existsSync('./temp')){
        fs.mkdirSync('./temp');
    }

    // Extract frames
    const results = await extractFrames({
        input: process.argv[2],
        output: './temp/frame-%d.png',
        coalesce: false
    });

    // Add frames to list
    let images = [];
    for (let i = 0; i < results.shape[0]; i++) {
        images.push(`./temp/frame-${i}.png`);
    }
    
    // Merge together into one image
    ji.joinImages(images, {
        direction: "horizontal",
        color: { alpha: 0, b: 0, g: 0, r: 0 }
    }).then((img) => {
        // Save image as file
        img.toFile('./temp/exploded.png');
    });
})();