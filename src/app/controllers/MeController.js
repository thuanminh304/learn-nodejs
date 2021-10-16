const Course = require("../models/Course");
const { configMultiMongooseToObject } = require("../../utils/mongoose");
class MeController {
  //GET me/stored/courses
  meCourses(req, res, next) {
    //dùng promise all để gọi tất cả các promise cùng thực hiện để cho ra kết quả cùng lúc
    Promise.all([Course.find({}), Course.countDocumentsDeleted()])
      .then(([course, deletedCount]) => {
        res.render("me/stored-courses", {
          deletedCount,

          courses: configMultiMongooseToObject(course),
        });
      })
      .catch(next);

    // Course.countDocumentsDeleted()
    //   .then((deletedCount) => {
    //     console.log(deletedCount);
    //   })
    //   .catch(() => {});

    // Course.find({})
    //   .then((course) => {
    //     res.render("me/stored-courses", {
    //       courses: configMultiMongooseToObject(course),
    //     });
    //   })
    //   .catch(next);
  }
  //GET me/trash/courses
  meTrash(req, res, next) {
    Course.findDeleted({})
      .then((course) => {
        res.render("me/trash-courses", {
          courses: configMultiMongooseToObject(course),
        });
      })
      .catch(next);
  }
}

module.exports = new MeController();
