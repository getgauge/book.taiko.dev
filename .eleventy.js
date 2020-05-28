const tocPlugin = require('eleventy-plugin-toc');
const markdownIt = require("markdown-it");
 
module.exports = function(eleventyConfig) {
  // Output directory: _site

  eleventyConfig.addPassthroughCopy("assets");

  // This filter is used for deriving the chapter names
  // from data in chapters.json
  eleventyConfig.addFilter('heading', function(str){
    return str.replace(/_/g, " ");
  });
  let markdownItAnchor = require("markdown-it-anchor");
  let mdIt = markdownIt({
		html: true,
		breaks: true,
		linkify: true
	})
	.use(markdownItAnchor, {
		permalink: true,
		permalinkBefore: false,
		permalinkClass: "direct-link",
		permalinkSymbol: "#",
		level: [1,2,3,4]
	});
	eleventyConfig.setLibrary("md", mdIt);
  eleventyConfig.addPlugin(tocPlugin);
};
