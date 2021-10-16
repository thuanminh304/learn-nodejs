const express = require("express");
const router = express.Router();

const meController = require("../app/controllers/MeController");


router.get("/stored/courses", meController.meCourses);
router.get("/trash/courses", meController.meTrash);

module.exports = router;
