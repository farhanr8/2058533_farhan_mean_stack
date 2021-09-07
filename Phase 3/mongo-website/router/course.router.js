const express = require("express");
const router = express.Router();  
const controller = require("../controller/course.controller");

router.post("/addCourse", controller.addCourse);
router.get("/listCourses", controller.listCourses);
router.delete("/deleteCourse/:cid", controller.deleteCourse);
router.put("/updateCourse", controller.updateCourse);

module.exports = router;