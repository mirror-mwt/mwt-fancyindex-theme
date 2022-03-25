#!/bin/sh

# Remove old dist folder and remake empty one
rm -r ./dist/ && mkdir ./dist/

# Make html files
awk '
/Begin header.html/,/End header.html/{print $0 > "dist/header.html"}
/Begin footer.html/,/End footer.html/{print $0 > "dist/footer.html"}' index.html

# Handle CSS
mkdir -p ./dist/assets/css
# Minify CSS and merge into a single file
npx minify ./assets/css/style.css > ./dist/assets/css/style.css
# Delete unused classes 
npx purgecss -con ./index.html -css ./dist/assets/css/style.css -s "sb-sidenav-toggled" -o ./dist/assets/css/

# UglifyJS
mkdir -p ./dist/assets/js
npx uglifyjs -c -m -- ./assets/js/script.js > ./dist/assets/js/script.js

touch ./dist/assets/index.html
touch ./dist/assets/css/index.html
touch ./dist/assets/js/index.html
