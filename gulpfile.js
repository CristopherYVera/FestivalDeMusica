const{src,dest,watch,parallel}= require ("gulp");
//CSS 
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
//Imagenes 
const cache = require('gulp-cache');
const imageMin = require('gulp-imagemin');
const webp = require("gulp-webp");
const avif = require('gulp-avif');
//JavaScript
const tester = require('gulp-terser');

function css(done){ // compilar archivo de sass
    src('src/scss/**/*.scss') //indentificar archivo de SASS
        .pipe(sourcemaps.init()) //mapea en que archivo sass esta el estilo css
        .pipe(plumber()) // no finaliza la ejecucion cuando encuentra errores
        .pipe(sass()) //compilarlo
        .pipe(postcss([ autoprefixer(), cssnano()] ))
        .pipe(sourcemaps.write('.'))
        .pipe(dest("build/css")); //Almacenarlo en el disco duro
    done() // es un callback que avisa a gulp cuando llegamos al final de la ejecucion de la función
};

function dev(done){
    watch('src/scss/**/*.scss',css)
    watch('src/JS/**/*.js',JavaScript)
    done();
}


function imagenes (done){
    const opciones = {
        optimizationLevel:3
    };
    src('src/img/**/*.{jpg,png}')
        .pipe(cache(imageMin(opciones)))
        .pipe(dest('build/img'))
    done()
}

function versionWebp(done){
    const opciones = {
        quality:50
    };
    src('src/img/**/*.{jpg,png}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))
    done();
}

function versionAvif (done){
    const opciones = {
        quality:50
    };
    src('src/img/**/*.{jpg,png}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))
    done();
}
function JavaScript(done){
    src('src/JS/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(tester())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/JS'))
    done();
}

exports.js = JavaScript;
exports.css = css;
exports.dev = parallel(dev,JavaScript);
exports.tranformarImagenes = parallel(versionAvif,imagenes,versionWebp)