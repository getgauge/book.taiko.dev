let njk = require("nunjucks");

module.exports = function(eleventyConfig) {
  // Output directory: _site

  eleventyConfig.addPassthroughCopy("assets");

  // This filter is used for deriving the chapter names
  // from data in chapters.json
  eleventyConfig.addFilter('heading', function(str){
    return str.replace(/_/g, " ");
  });

};
