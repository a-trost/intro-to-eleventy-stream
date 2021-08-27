const embedEverything = require("eleventy-plugin-embed-everything");
const pluginSass = require("eleventy-plugin-sass");
const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [300, 600],
    formats: ["avif", "jpeg"],
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(embedEverything);
  eleventyConfig.addPlugin(pluginSass);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  // eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  // eleventyConfig.addJavaScriptFunction("image", imageShortcode);
  return { dir: { input: "src" } };
};
