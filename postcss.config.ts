// const autoprefixer = require('autoprefixer');
// const postcssNesting = require('postcss-nesting');

import * as tailwindcss from 'tailwindcss';
import postcssNesting from 'postcss-nesting';
import * as tailwindNesting from '@tailwindcss/nesting';
import * as autoprefixer from 'autoprefixer';

module.exports = {
   plugins: [tailwindNesting(postcssNesting), tailwindcss, autoprefixer],
};
