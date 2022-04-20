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

const readmePath = './readme-text/';
const jsonPath = './dist/assets/readme-text.json';
const stylePath = './dist/assets/css/style.css';
var readmeData = {};

/*=============================================================================
 Export Markdown to JSON Array 
=============================================================================*/
fs.readdirSync(readmePath).forEach(file => {
    const filePath = path.join(__dirname, readmePath, file);
    const fileName = file.split('.').slice(0, -1).join('.');
    const mdString = fs.readFileSync(filePath, 'utf8');
    const htmlString = md.render(mdString);
    readmeData[`/${fileName}/`] = htmlString;
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

/* Make an array of html from markdown that purgeCSS needs */
htmlArray = Object.values(readmeData).map(html => {
    return {
        raw: html,
        extension: 'html'
    }
});
/* add the index */
htmlArray.push('./index.html')

/* set config options */
const purgeCSSResult = new PurgeCSS().purge({
    content: htmlArray,
    css: [stylePath],
    safelist: ["sb-sidenav-toggled", "active", "mb-4"]
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