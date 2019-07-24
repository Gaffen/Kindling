const path = require("path");
const Jimp = require("jimp");
const fs = require("fs");
module.exports = function(nunjucksEngine) {
  this.tags = ["rimg"];

  this.nunjucksEngine = nunjucksEngine;

  this.parse = function(parser, nodes, lexer) {
    let tok = parser.nextToken();

    let args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);

    return new nodes.CallExtensionAsync(this, "run", args);
  };

  this.run = function(context, args, callback) {
    const nunjucksEngine = this.nunjucksEngine;

    let result = "";
    try {
      const dir = path.join(__dirname, "..", "img", args.src);
      if (fs.existsSync(dir)) {
        const filename = args.src.split(".");
        let smallest = 0,
          imgBase = "/img/",
          sizes = "";
        const image = new Jimp(dir, function(err, image) {
          let w = image.bitmap.width,
            h = image.bitmap.height,
            smallest = w;

          sizes += `${imgBase + args.src} ${w}w`;

          for (let i = 0; i < args.srcset.length; i++) {
            if (args.srcset[i] != w) {
              if (smallest > args.srcset[i]) {
                smallest = args.srcset[i];
              }

              const currFileName = `${filename[0]}-${args.srcset[i]}.${
                filename[1]
              }`;

              let currFileFullPath = path.join(
                __dirname,
                "..",
                "build",
                "img",
                currFileName
              );

              if (!fs.existsSync(currFileFullPath)) {
                image
                  .resize(args.srcset[i], Jimp.AUTO)
                  .write(
                    path.join(__dirname, "..", "build", "img", currFileName)
                  );
              }

              sizes += `, ${imgBase + currFileName} ${args.srcset[i]}w`;
              console.log(`resize operation for width ${args.srcset[i]}`);
            } else {
              console.log(`original size of image: ${w}`);
            }
          }

          result = `<img src="${filename[0]}-${smallest}.${
            filename[1]
          }" sizes="${args.sizes}" srcset="${sizes}"/>`;

          callback(null, new nunjucksEngine.runtime.SafeString(result));
        });
      } else {
        result = "<pre>Image not found</pre>";

        callback(null, new nunjucksEngine.runtime.SafeString(result));
      }
    } catch (err) {
      result = "<pre>Image not found</pre>";
      console.log(err);
      callback(null, new nunjucksEngine.runtime.SafeString(result));
    }
  };
};
