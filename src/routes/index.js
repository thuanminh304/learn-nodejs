const newsRouter = require("./news");
const siteRouter = require("./site");
const coursesRouter = require("./courses");
const meRouter = require("./me");

function route(app) {
  // trang news
  app.use("/news", newsRouter);
  //
  app.use("/courses", coursesRouter);

  //
  app.use("/me", meRouter);
  // các trang k dẫn tới trang con
  app.use("/", siteRouter);

  //
}

module.exports = route;
