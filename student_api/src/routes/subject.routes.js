const express = require("express");
const router = express.Router();

const subjectController = require("../controllers/subject.controllers");

// GET
router.get("/", subjectController.getAllSubjects);
router.get("/:id", subjectController.getSubjectById);

// POST
router.post("/", subjectController.createSubject);

// PUT
router.put("/:id", subjectController.updateSubject);

// DELETE
router.delete("/:id", subjectController.deleteSubject);

module.exports = router;