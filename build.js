/**
* bs-fancyindex
*
* @fileoverview Build the template
*
* @author Matthew W. Thomas
* @author https://mattwthomas.com
*
*/

var fs = require('fs');
var path = require('path');
var md = require('markdown-it')()
    .use(require('markdown-it-highlightjs'))
    .use(require('markdown-it-attrs'));
const minify = require('@node-minify/core');
const csso = require('@node-minify/csso');
const uglifyjs = require('@node-minify/uglify-js');
var PurgeCSS = require('purgecss').PurgeCSS;


/*=============================================================================
 UglifyJS Section 
=============================================================================*/

minify({
    compressor: uglifyjs,
    input: './assets/js/script.js',
    output: './dist/assets/js/script.js',
    callback: function (err, min) { }
});


/*=============================================================================
 CSSO Section 
=============================================================================*/

minify({
    compressor: csso,
    input: './assets/css/*.css',
    output: './dist/assets/css/style.css',
    callback: afterCSS
});

/*=============================================================================
     Export Markdown to JSON Array and PurgeCSS 
=============================================================================*/

async function afterCSS(err, min) {

    /* Export Markdown to JSON Array 
       ============================= */
    const readmePath = path.normalize('./readme-text/');
    const jsonPath = path.normalize('./dist/assets/readme-text.json');
    var readmeData = {};

    fs.readdirSync(readmePath).forEach(file => {
        const filePath = path.join(__dirname, readmePath, file);
        const fileName = file.split('.').slice(0, -1).join('.');
        const mdString = fs.readFileSync(filePath, 'utf8');
        const htmlString = md.render(mdString);
        readmeData[`/${fileName}/`] = `${htmlString}<hr>`;
    });

    fs.writeFileSync(jsonPath, JSON.stringify(readmeData), err => {
        if (err) {
            console.error(err)
            return
        }
    });

    /* PurgeCSS Section 
       ================ */
    const stylePath = './dist/assets/css/style.css';

    /* Make an array of html from markdown that purgeCSS needs */
    htmlArray = Object.values(readmeData).map(html => {
        return {
            raw: html,
            extension: 'html'
        }
    });
    /* add the index */
    htmlArray.push('./index.html');

    /* set config options */
    const purgeCSSResult = new PurgeCSS().purge({
        content: htmlArray,
        css: [stylePath],
        safelist: ["sb-sidenav-toggled", "active"]
    });

    /* write the output to the dist css file */
    var x = await purgeCSSResult;
    fs.writeFileSync(stylePath, x[0].css, err => {
        if (err) {
            console.error(err)
            return
        }
    });

};