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
var PurgeCSS = require('purgecss').PurgeCSS;
var UglifyJS = require("uglify-js");


/*=============================================================================
 Export Markdown to JSON Array 
=============================================================================*/

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


/*=============================================================================
 PurgeCSS Section 
=============================================================================*/

const stylePath = path.normalize('./dist/assets/css/style.css');

/* Make an array of html from markdown that purgeCSS needs */
htmlArray = Object.values(readmeData).map(html => {
    return {
        raw: html,
        extension: 'html'
    }
});
/* add the index */
htmlArray.push(path.normalize('./index.html'));

/* set config options */
const purgeCSSResult = new PurgeCSS().purge({
    content: htmlArray,
    css: [stylePath],
    safelist: ["sb-sidenav-toggled", "active"]
});

/* write the output to the dist css file */
(async function () {
    var x = await purgeCSSResult;
    fs.writeFileSync(stylePath, x[0].css, err => {
        if (err) {
            console.error(err)
            return
        }
    });
})();


/*=============================================================================
 UglifyJS Section 
=============================================================================*/

const jsSrcPath = path.normalize('./assets/js/script.js');
const jsDistPath = path.normalize('./dist/assets/js/script.js');

fs.writeFile(jsDistPath, UglifyJS.minify({
    "script.js": fs.readFileSync(jsSrcPath, "utf8")
}).code, (err) => {if (err) throw err;});
