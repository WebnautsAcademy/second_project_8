//Подключаем галп
const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const plumber = require("gulp-plumber");
const less = require("gulp-less");
const browserSync = require("browser-sync").create();
const svgSprite = require('gulp-svg-sprite');
const svgstore = require('gulp-svgstore');
const rename = require("gulp-rename");
// const ttf2woff = require('gulp-ttf2woff');
// const ttf2woff2 = require('gulp-ttf2woff2');

gulp.task("html", () => {
  return gulp.src("source/*.html").pipe(gulp.dest("./build"));
});

gulp.task("css", function () {
  return (
    gulp
      .src("source/less/style.less")
      // обработчик ошибок
      .pipe(plumber())
      .pipe(less())
      .pipe(gulp.dest("build/css"))
  );
});

gulp.task("imagemin", function () {
  return gulp
    .src("source/img/*.{jpg,png}")
    .pipe(imagemin())
    .pipe(gulp.dest("./build/img"));
});

gulp.task("sprite", function () { 
  return gulp.src("source/img/*.svg") 
    .pipe(imagemin([imagemin.svgo()])) 
    .pipe(svgstore({ 
      inlineSvg: true 
    })) 
    .pipe(rename("sprite.svg")) 
    .pipe(gulp.dest("build/img")); 
});

gulp.task('svgstore', () => {
    return gulp
        .src('source/img/*.svg')
        .pipe(svgmin((file) => {
            const prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest('build/img'));
});

// gulp.task('ttf2woff', function(){
//   gulp.src(['source/fonts/*.ttf'])
//     .pipe(ttf2woff())
//     .pipe(gulp.dest('./build/fonts'));
// });

// gulp.task('ttf2woff2', function(){
//    gulp.src(['fonts/*.ttf'])
//     .pipe(ttf2woff())
//     .pipe(gulp.dest('fonts/'));
// });


gulp.task("watch", () => {
  browserSync.init({
    server: {
      baseDir: "./build",
    },
  });

  gulp.watch("./source/less/**/*.less", gulp.series("css"));
  gulp.watch("./source/img/**", gulp.series("imagemin"));
  gulp.watch("./source/*.html", gulp.series("html"));
  gulp.watch("./source/less/**/*.less").on("change", browserSync.reload);
  gulp.watch("./source/*.html").on("change", browserSync.reload);
});

//Таск по умолчанию, Запускает del, styles, scripts и watch
gulp.task(
  "start",
  gulp.series(gulp.parallel("imagemin", "html", "css"), "watch")
);