/**
* bs-fancyindex
*
* @fileoverview Build the template
*
* @author Matthew W. Thomas
* @author https://matthewthom.as
*
*/


/*=============================================================================
 Start a Timer for the Build
=============================================================================*/

console.time('buildTime');


/*=============================================================================
 Load the Necessary Libraries
=============================================================================*/

const fs = require('fs');
const path = require('path');
const md = require('markdown-it')()
    .use(require('markdown-it-highlightjs'))
    .use(require('markdown-it-attrs'));
const minify = require('@node-minify/core');
const csso = require('@node-minify/csso');
const terser = require('@node-minify/terser');
const PurgeCSS = require('purgecss').PurgeCSS;


/*=============================================================================
 Delete and Remake dist folder (block everything while we do this)
=============================================================================*/

const distPath = path.normalize('./dist/');
const assetPath = path.normalize('./dist/assets/');
fs.rmSync(distPath, { recursive: true, force: true });
fs.mkdirSync(assetPath, { recursive: true });


/*=============================================================================
 Make header.html and footer.html Files (plus blank assets/index.html)
=============================================================================*/

/* nothing depends on this */
(async () => {
    const indexPath = path.normalize('./index.html');
    const headerPath = path.join(distPath, "header.html");
    const footerPath = path.join(distPath, "footer.html");

    /* write blank html file to assets dir */
    fs.writeFile(path.join(assetPath, "index.html"), "", (err) => { if (err) throw err; });

    /* read the index.html file to split it into header and footer */
    fs.readFile(indexPath, 'utf8', (err, data) => {
        /* use regex with named groups to extract the header and footer from index.html */
        const headerRegex = "<!--Begin header\.html-->\n(?<header>[^]+?)<!--End header\.html-->";
        const middleRegex = "(?<middle>[^]+?)";
        const footerRegex = "<!--Begin footer\.html-->\n(?<footer>[^]+?)<!--End footer\.html-->";
        const re = new RegExp(headerRegex + middleRegex + footerRegex);
        const matchedText = data.match(re);

        /* write header.html (async) */
        fs.writeFile(headerPath, matchedText.groups.header, (err) => { if (err) throw err; });

        /* write footer.html (async) */
        fs.writeFile(footerPath, matchedText.groups.footer, (err) => { if (err) throw err; });
    });
})();


/*=============================================================================
     Export Markdown to JSON Array
=============================================================================*/

/* we use this output later */
markdownArrayHTML = (async () => {
    const readmePath = path.normalize('./readme-text/');
    const jsonPath = path.join(assetPath, 'readme-text.json');
    var readmeData = {};

    fs.readdirSync(readmePath).forEach(file => {
        const filePath = path.join(readmePath, file);
        const fileName = file.split('.').slice(0, -1).join('.');
        const mdString = fs.readFileSync(filePath, 'utf8');
        const htmlString = md.render(mdString);
        readmeData[`/${fileName}/`] = htmlString;
    });

    /* no need to block with this */
    fs.writeFile(jsonPath, JSON.stringify(readmeData), (err) => { if (err) throw err; });

    return readmeData;
})();


/*=============================================================================
 TerserJS Section
=============================================================================*/

/* nothing depends on this */
minify({
    compressor: terser,
    input: './assets/js/script.js',
    output: './dist/assets/script.js',
    options: {
        mangle: {toplevel: true},
        compress: {unsafe: true}
    },
    callback: function (err, min) { }
});


/*=============================================================================
 CSSO Section
=============================================================================*/

/* we make a promise because we need it in the next section */
var cssoPromise = minify({
    compressor: csso,
    input: './assets/css/*.css',
    output: './dist/assets/style.css',
});


/*=============================================================================
 PurgeCSS Section
=============================================================================*/

/* make the raw html array that purgecss needs */
make_htmlArray = (async () => {
    readmeData = await markdownArrayHTML;
    /* Make an array of html from markdown that purgeCSS needs */
    htmlArray = Object.values(readmeData).map(html => {
        return {
            raw: html,
            extension: 'html'
        };
    });
    /* add the index */
    htmlArray.push('./index.html');

    return htmlArray;
})();

/* this depends on both the htmlArray and the csso operation */
Promise.all([cssoPromise, make_htmlArray]).then(out => {
    const minCSS = out[0];
    const htmlArray = out[1];

    /* set config options */
    const purgeCSSResult = new PurgeCSS().purge({
        output: './dist/assets/style.css',
        content: htmlArray,
        css: [{ raw: minCSS, extension: 'css' }],
        safelist: ["sb-sidenav-toggled", "active", "hr", "load"]
    });

    /* write the output to the dist css file */
    const stylePath = './dist/assets/style.css';
    purgeCSSResult.then(x => {
        fs.writeFile(stylePath, x[0].css, err => { if (err) throw err; });
    });
});


/*=============================================================================
 End a Timer for the Build
=============================================================================*/

console.timeEnd('buildTime');

