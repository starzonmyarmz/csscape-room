import htmlmin from "html-minifier-terser"

export default async function (eleventyConfig) {
  eleventyConfig.setIncludesDirectory("includes")
  eleventyConfig.setDataDirectory("data")

  eleventyConfig.addShortcode("img", function (src) {
    return `
      <img src="images/${src}.png" id="image_${src}" alt="" draggable="false" />
    `
  })

  const img = eleventyConfig.getShortcode('img')

  eleventyConfig.addShortcode("book", function (color, height, width) {
    return `
      <button popovertarget="${color}-book" style="width: ${width}px; height: ${height}px;" tabindex="-1">
      </button>
    `
  })

  eleventyConfig.addPairedShortcode("bookpopover", function (content, color) {
    return `
      <div id="${color}-book" class="book-popover" style="background: var(--color-${color})" popover>
        ${content}
        <button popovertarget="${color}-book" popovertargetaction="hide" tabindex="-1">
          Shelve ${color} book
        </button>
        ${img("east_open_book")}
      </div>
    `
  })

  eleventyConfig.addPassthroughCopy("font")
  eleventyConfig.addPassthroughCopy("images")
  eleventyConfig.addPassthroughCopy("styles")

  eleventyConfig.addTransform("htmlmin", function (content) {
    if ((this.page.outputPath || "").endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      })
      return minified
    }
    return content
  })
}
