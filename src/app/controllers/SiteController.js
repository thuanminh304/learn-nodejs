const Course = require("../models/Course");
const { configMultiMongooseToObject } = require("../../utils/mongoose");
class SiteController {
  home(req, res, next) {
    Course.find({})
      .then((courses) => {
        res.render("home", { courses: configMultiMongooseToObject(courses) });
      })
      .catch(
        //error=>next(error)
        next
      );
  }
  contact(req, res) {
    res.render("contact");
  }
  search(req, res) {
    res.render("search");
  }
  about(req, res) {
    res.render("about");
  }
}

module.exports = new SiteController();
