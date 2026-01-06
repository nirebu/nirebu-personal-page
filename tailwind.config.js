module.exports = {
  content: [
    './_drafts/**/*.html',
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './_posts/*.md',
    './*.md',
    './*.html',
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          400: '#c084fc',
          600: '#9333ea',
        }
      }
    },
  },
  plugins: []
}
