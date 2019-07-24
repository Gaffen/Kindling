const path = require("path");
const fs = require("fs");
const babel = require("@babel/core");
const manifest = require("./data/manifest.json");
const pluginYamldata = require("eleventy-plugin-yamldata");
const Jimp = require("jimp");

const Nunjucks = require("nunjucks");
const nunjucksDate = require("nunjucks-date");

const rimg = require("./njktags/rimg");

module.exports = function(eleventyConfig) {
  let nunjucksEnvironment = new Nunjucks.Environment(
    new Nunjucks.FileSystemLoader("layouts")
  );

  nunjucksDate.install(nunjucksEnvironment);

  eleventyConfig.setLibrary("njk", nunjucksEnvironment);

  let options = {
    html: true
  };
  let markdownIt = require("markdown-it");
  let mila = require("markdown-it-link-attributes");
  let md = markdownIt(options).use(mila, {
    pattern: /:\/\//,
    attrs: {
      target: "_blank",
      rel: "noopener"
    }
  });

  eleventyConfig.setLibrary("md", md);
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addNunjucksFilter("debug", function(value) {
    console.log(value);
    return `<pre>${value ? JSON.stringify(value) : "Variable undefined"}</pre>`;
  });
  eleventyConfig.addNunjucksShortcode("md", function(value) {
    if (value) {
      return md.render(value);
    } else {
      return "";
    }
  });

  eleventyConfig.addNunjucksShortcode("today", function() {
    return new Date().getFullYear().toString();
  });

  eleventyConfig.addNunjucksTag("rimg", function(nunjucksEngine) {
    return new rimg(nunjucksEngine);
  });

  eleventyConfig.addPlugin(pluginYamldata);

  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/favicon");

  return {
    dir: {
      input: "src/content",
      output: "build",
      includes: "../../layouts",
      data: "../../data"
    },
    templateFormats: ["md", "njk"]
  };
};
