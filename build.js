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
var marked = require('marked').marked;


/* Export Markdown to JSON Array */
const readmePath = './readme-text/';
const jsonPath = './dist/assets/readme-text.json'
var readmeData = {};

fs.readdirSync(readmePath).forEach(filename => {
    const filePath = path.join(__dirname, readmePath, filename);
    mdString = fs.readFileSync(filePath, 'utf8');
    htmlString = marked(mdString);
    readmeData[filename] = minifyHTML(htmlString);
});

fs.writeFileSync(jsonPath, JSON.stringify(readmeData), err => {
    if (err) {
        console.error(err)
        return
    }
});