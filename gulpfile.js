//Подключаем галп
const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const plumber = require("gulp-plumber");
const less = require("gulp-less");
const browserSync = require("browser-sync").create();

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
    .src("source/img/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest("./build/img"));
});

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