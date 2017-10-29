var gr8 = require('gr8')

var typography = {
  sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  heading: '"Cotham", sans-serif',
  mono: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace'
}

var colors = {
  white: '#fff',
  greyish: 'rgba(230, 230, 230, 0.95)',
  black: '#000',
  transparent: 'transparent'
}

var utils = [ ]

utils.push({
  prop: 'font-family',
  join: '-',
  vals: typography
})

utils.push({
  prop: { bgc: 'background-color' },
  join: '-',
  vals: colors
})

utils.push({
  prop: { fc: 'color' },
  join: '-',
  vals: colors
})

utils.push({
  prop: { oph: 'opacity' },
  tail: ':hover',
  vals: [0, 25, 50, 75, 100]
})

utils.push({
  prop: { pvw: 'padding' },
  unit: 'vw',
  vals: [0, 0.5, 1, 1.5, 2]
})

utils.push({
  prop: { fsvw: 'font-size' },
  unit: 'vw',
  vals: [1, 1.5, 2, 2.5, 5, 6]
})

utils.push({
  prop: 'font-weight',
  vals: ['normal', 'bold', 200, 300, 500, 800]
})

var borderWeights = [1]
var borders = {}
borderWeights.forEach(border => {
  Object.keys(colors).forEach(key => {
    borders[border + '-' + key] = `${border}px solid ${colors[key]}`
  })
})

utils.push({
  prop: [
    'border',
    'border-top',
    'border-right',
    'border-bottom',
    'border-left'
  ],
  vals: borders
})

var gr8css = gr8({
  lineHeight: [1, 1.1, 1.25, 1.5],
  spacing: [0.5, 1, 1.5, 2, 3, 4],
  fontSize: [0, 0.75, 1, 1.5, 2, 3],
  utils: utils
})

var custom = `
  html {
    font-size: 100%
  }
  
  .fab {
    border-radius: 1.5rem;
    text-align: center;
    line-height: 3rem;
    font-weight: 300;
    font-size: 2rem;
    height: 3rem;
    width: 3rem;
  }

  .button-wide {
    border-radius: 2rem;
    height: 3rem;
    line-height: 3rem;
  }

  .ti1 {
    padding-left: 1em;
    text-indent: -1em;
  }

  .toe {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .panel-save {
    opacity: 0;
    transition: opacity 300ms cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  .panel-save-active {
    opacity: 1;
  }

  .panel-save input {
    transform: translate3d(0, 1rem, 0);
    transition: transform 300ms cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  .panel-save-active input {
    transform: translate3d(0, 0, 0);
  }

  .button-wide {
    opacity: 0;
    transform: translate3d(0, -1rem, 0);
    transition: transform 300ms cubic-bezier(0.215, 0.61, 0.355, 1), opacity 300ms cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  .button-wide-active {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  .curt { cursor: text }
  input { -webkit-appearance: none }

  ::-webkit-input-placeholder { color: ${colors.black}; }
  ::-moz-placeholder { color: ${colors.black}; }
  :-ms-input-placeholder { color: ${colors.black}; }
  :-moz-placeholder { color: ${colors.black}; }

  @font-face {
    font-family: 'Cotham';
    src: url('/bundles/CothamSans.otf');
}
`

module.exports = gr8css + custom