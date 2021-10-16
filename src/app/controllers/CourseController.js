const Course = require("../models/Course");
const { configMongooseToObject } = require("../../utils/mongoose");
class CourseController {
  //GET detail /courses/:slug
  showDetail(req, res, next) {
    // res.send(req.params._id)
    Course.findOne({ slug: req.params.slugger })
      .then((course) => {
        res.render("courses/showDetail", {
          course: configMongooseToObject(course),
        });
      })
      .catch(next);
  }
  create(req, res, next) {
    res.render("courses/create");
  }
  //POST
  store(req, res, next) {
    // res.json(req.body)
    const formData = { ...req.body };
    formData.image = `https://img.youtube.com/vi/${req.body.videoId}/maxresdefault.jpg`;
    const course = new Course(formData);
    course
      .save()
      .then(() => {
        res.redirect("/me/stored/courses");
      })
      .catch(next);
  }
  //GET /courses/edit/:id
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((course) =>
        res.render("courses/edit", {
          course: configMongooseToObject(course),
        })
      )
      .catch(next);
  }
  //PUT /courses/updated/:id
  updated(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        console.log("Sửa thành công !!!");
        res.redirect("/me/stored/courses");
      })
      .catch(next);
  }

  //DELETE /courses/:id => xóa vào thùng rác
  sofeDelete(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  //PATCH /course/restored/:id
  restoreCourse(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  //DELETE /courses/force/:id => xóa vĩnh viễn
  forceDelete(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  //POST /courses/handle-delete-form-course=> xóa những checkbox đc chọn
  handleDeleteFormCourse(req, res, next) {
    switch (req.body.actionDelete) {
      case "delete":
        Course.delete({ _id: { $in: req.body.coursesId } })
          .then(() => res.redirect("back"))
          .catch(next);

        break;

      default:
        res.json({ message: "Action is invalid !!!" });
    }
  }
  //POST /courses/handle-form-trash-course=> xóa những checkbox đc chọn
  handleFormTrashCourse(req, res, next) {
    switch (req.body.action) {
      case "restore":
        Course.restore({ _id: { $in: req.body.coursesId } })
          .then(() => res.redirect("back"))
          .catch(next);
        break;
      case "deleteForever":
        Course.deleteMany({ _id: { $in: req.body.coursesId } })
          .then(() => res.redirect("back"))
          .catch(next);

        break;
      default:
        res.json({ message: "Action is invalid !!!" });
    }
    // res.json(req.body)
  }
}

module.exports = new CourseController();
