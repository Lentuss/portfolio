// vite.config.js
import glsl from 'vite-plugin-glsl'
import { resolve } from 'path';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import svgHelper from 'handlebars-helper-svg';

import { data as commonData } from './mock/common.mock.js'; //common data for all pages
import { data as mainData } from './mock/main.mock.js'; //certain page data (main)

// to send mock data to page, use this structure
const pageData = {
  '/index.html': {
    data: mainData,
    commonData: commonData
  },
  '/projects.html': {
    data: mainData,
    commonData: commonData
  },
  '/project1.html': {
    data: mainData,
    commonData: commonData
  },
  '/project1.html': {
    data: mainData,
    commonData: commonData
  },
  '/project2.html': {
    data: mainData,
    commonData: commonData
  },
  '/project3.html': {
    data: mainData,
    commonData: commonData
  },
  '/project4.html': {
    data: mainData,
    commonData: commonData
  },
  '/project5.html': {
    data: mainData,
    commonData: commonData
  },
  '/project6.html': {
    data: mainData,
    commonData: commonData
  },
  '/project7.html': {
    data: mainData,
    commonData: commonData
  },
  '/project8.html': {
    data: mainData,
    commonData: commonData
  },
  '/project9.html': {
    data: mainData,
    commonData: commonData
  },
  '/contacts.html': {
    data: mainData,
    commonData: commonData
  },
};

// ----------------------------------------------------------------
const pageDataKeys = Object.keys(pageData);
const rollupInput = {};
pageDataKeys.forEach((page) => {
  const pageName = page.split("/").at(-1).split(".").at(0);
  rollupInput[pageName] = resolve(__dirname, `${pageName}.html`);
});

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'partials'),
      helpers: {
        svg: svgHelper,
        inc: function (value) {
          return parseInt(value) + 1;
        },
        compare: function (
          variableOne,
          comparator,
          variableTwo,
          type = 'number'
        ) {
          if (type === 'number') {
            return !!eval(variableOne + comparator + variableTwo);
          } else {
            return !!eval(
              '"' + variableOne + '"' + comparator + '"' + variableTwo + '"'
            );
          }
        },
        math: function (lvalue, operator, rvalue, options) {
          lvalue = parseFloat(lvalue);
          rvalue = parseFloat(rvalue);

          return {
            '+': lvalue + rvalue,
            '-': lvalue - rvalue,
            '*': lvalue * rvalue,
            '/': lvalue / rvalue,
            '%': lvalue % rvalue
          }[operator];
        },
        ifEquals: function (arg1, arg2, options) {
          return arg1 == arg2 ? options.fn(this) : options.inverse(this);
        },
        toPartialArray: (array) => JSON.parse(array)
      },
      context(pagePath) {
        return pageData[pagePath];
      }
    }),
    glsl()
  ],
  base: '/',
  build: {
    rollupOptions: {
      logLevel: 'error',
      input: rollupInput,
      output: {
        entryFileNames: `html-assets/[name].js`,
        chunkFileNames: `html-assets/[name].js`,
        // assetFileNames: `assets/[name].[ext]`,
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|ttf|tiff|bmp|ico/i.test(extType)) {
            extType = 'static';
          } else {
            return `html-assets/[name].[ext]`;
          }
          return `html-assets/${extType}/[name].[ext]`;
        },
        manualChunks: {}
      }
    }
  }
});
