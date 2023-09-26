const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const replace = require('gulp-replace'); // Add the gulp-replace plugin
const cleanCSS = require('gulp-clean-css'); // Add the gulp-clean-css plugin

const fs = require('fs-extra');

const jsonEditor = require('gulp-json-editor'); 
const injectString = require('gulp-inject-string');
const insert = require('gulp-insert');
const argv = require('yargs').argv;
const path = require('path');


const randomNumber = Math.floor(Math.random() * 10000); // Generate a random number
const version = `?v=${randomNumber}`;
const  dynamicJsFile = `js/main.min.js`;
const  dynamicCssFile = `css/style.min.css`;

// Read the prefix from the config.json file
let BASE_URL = '';
let API_BASE_URL = '';

let BUILD_VERSION = randomNumber;
function readConfig() {

  return gulp.src('config.json')
    .pipe(jsonEditor((json) => {
     
      const envArgIndex = process.argv.findIndex(arg => arg.startsWith('--env='));
     
      if (envArgIndex !== -1) {
        const argumentValue = process.argv[envArgIndex].split('=')[1];
       
        if (argumentValue == 'prod') {
          BASE_URL = json.prod.BASE_URL;
          API_BASE_URL = json.prod.API_BASE_URL;

        } else if (argumentValue == 'stage') {
          BASE_URL = json.stage.BASE_URL;
          API_BASE_URL = json.stage.API_BASE_URL;

        } else if (argumentValue == 'local' || argumentValue == '' || argumentValue == undefined) {
          BASE_URL = json.local.BASE_URL;
          API_BASE_URL = json.local.API_BASE_URL;
        }
      } else {
        
        BASE_URL = json.local.BASE_URL;
        API_BASE_URL = json.local.API_BASE_URL;
      }

     
      console.log("BASE_URL", BASE_URL)
      return json;
    }));
}


// Task to clean the dist folder (delete old files)
async function cleanDist() {
  try {
    await fs.emptyDir('dist'); // Empty the dist folder
  } catch (err) {
    console.error('Error cleaning dist folder:', err);
  }
}

// Task for compiling and minifying JS files
function scripts() {
  
  return gulp.src(['src/util/js/*.js', 'src/js/*.js', 'src/js/*/*.js', 'src/util/cache-cleanerr/*.js'])
    .pipe(concat(dynamicJsFile))
    .pipe(injectString.prepend(`const API_BASE_URL = '${API_BASE_URL}';\n const BASE_URL = '${BASE_URL}';\n const BUILD_VERSION = '${BUILD_VERSION}';\n`))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
}

// Task for copying the index.html file to the dist folder and updating the script tag
function copyHtml() {

  return gulp.src('src/*.html')
    .pipe(replace('main.min.js', BASE_URL + dynamicJsFile + version)) // Replace 'main.min.js' with the dynamic filename
    .pipe(replace('style.min.css', BASE_URL + dynamicCssFile + version)) // Replace 'main.min.js' with the dynamic filename
    .pipe(replace('favicon.ico', BASE_URL + 'images/favicon.ico')) // Replace 'main.min.js' with the dynamic filename
    // .pipe(rename((path) => {
    //   // Update the filename in the script tag to the dynamic filename
    //   path.basename = 'index';
    //   path.extname = '.html';
    // }))
    .pipe(gulp.dest('dist'));
}

// Task for minifying CSS files and combining them into a single file
function minifyCss() {
  // Create the dist/css folder if it doesn't exist
  if (!fs.existsSync('dist/css')) {
    fs.mkdirSync('dist/css', { recursive: true });
  }

  return gulp.src([
    'src/css/*.css'
    // Add more JS files here as needed
  ])
    .pipe(concat(dynamicCssFile)) // Combine all CSS files into a single file
    .pipe(cleanCSS()) // Minify CSS
    .pipe(gulp.dest('dist'));
}

// Task for copying components to the dist folder
function copyComponents() {
  return gulp.src('src/components/**/*')
    .pipe(gulp.dest('dist/components'));
}

// Task for copying images to the dist folder
function copyImages() {
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest('dist/images'));
}

function generateHtaccess(done) {
  const routingData = fs.readFileSync('src/routing.json', 'utf8');
  const routingRules = JSON.parse(routingData);

  let htaccessContent = `
    RewriteEngine On
    RewriteBase /
  `;

  routingRules.forEach((rule) => {
    htaccessContent += `
    # Redirect requests matching ${rule.path} to ${rule.redirect}
    RewriteRule ${rule.path} ${rule.redirect} [L]
    `;
  });

  htaccessContent += `
    # Redirect all requests to non-existing files or directories to 404.html
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^(.*)$ 404.html [L]
  `;

  fs.writeFile('./dist/.htaccess', htaccessContent, (err) => {
    if (err) {
      console.error('Error generating .htaccess file:', err);
    } else {
      console.log('Successfully generated .htaccess file');
    }
    done();
  });
}


// Default task to run both commands one by one
gulp.task('default', gulp.series( cleanDist,generateHtaccess, readConfig, scripts, minifyCss, copyHtml, copyComponents, copyImages));


// Task to create the folder and files
gulp.task('component', function (done) {
  // Get the folder name from the command line arguments
  const folderName = 'src/components/' +  argv.name;
  const fileName = argv.name;
  // Create the folder if it doesn't exist
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }

  // Create the files inside the folder
  fs.writeFileSync(path.join(folderName, `${fileName}.html`), '');
  fs.writeFileSync(path.join(folderName, `${fileName}.css`), '');
  fs.writeFileSync(path.join(folderName, `${fileName}.js`), '');

  done();
});


