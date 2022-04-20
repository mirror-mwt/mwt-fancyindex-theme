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

fs.readdirSync(readmePath).forEach(file => {
    const filePath = path.join(__dirname, readmePath, file);
    const fileName = file.split('.').slice(0, -1).join('.');
    const mdString = fs.readFileSync(filePath, 'utf8');
    const htmlString = marked(mdString);
    readmeData[`/${fileName}/`] = htmlString.replace(/\n/g, '');
});

fs.writeFileSync(jsonPath, JSON.stringify(readmeData), err => {
    if (err) {
        console.error(err)
        return
    }
});