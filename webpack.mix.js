const mix = require("laravel-mix");
const { join } = require("path");
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
  .webpackConfig({
    resolve: {
      extensions: [".js", ".json", ".vue"],
      alias: {
        "@": join(__dirname, "./resources/js"),
        assets: join(__dirname, "./resources/js/assets"),
      },
    },
  })
  .vue()
  .js("resources/js/app.js", "public/js")
  .postCss("resources/css/app.css", "public/css", [require("tailwindcss")]);
// .sass("resources/sass/app.scss", "public/css");
