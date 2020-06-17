const express = require("express");
const uuid = require("uuid");
const router = express.Router();
const students = require("../../students");

//It givs All students data
router.get("/", (req, res) => {
  res.json(students);
});

//It gives selected student data through id
router.get("/:id", (req, res) => {
  const found = students.some(
    student => student.id === parseInt(req.params.id)
  );

  if (found) {
    res.json(
      students.filter(student => student.id === parseInt(req.params.id))
    );
  } else {
    res.status(404).json({ msg: `No id is found with ${req.params.id}` });
  }
});

//It Creates student data
router.post("/", (req, res) => {
  const newStudent = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active"
  };
  if (!newStudent.name || !newStudent.email) {
    return res.status(404).json({ msg: "Please enter name and email" });
  }

  students.push(newStudent);
  res.json(students);
});

//Update student
router.put("/:id", (req, res) => {
  const found = students.some(
    student => student.id === parseInt(req.params.id)
  );
  if (found) {
    const updateStudent = req.body;
    students.forEach(student => {
      student.name = updateStudent.name ? updateStudent.name : student.name;
      student.email = updateStudent.email ? updateStudent.email : student.email;

      res.json({ msg: "Student updated", students });
    });
  } else {
    res.status(400).json({ msg: `No id is found with ${req.params.id}` });
  }
});

//It delete selected student
router.delete("/:id", (req, res) => {
  const found = students.some(
    student => student.id === parseInt(req.params.id)
  );
  if (found) {
    res.json({
      msg: "Student deleted",
      students: students.filter(
        student => student.id !== parseInt(req.params.id)
      )
    });
  } else {
    res.status(400).json({ msg: `No id is found with ${req.params.id}` });
  }
});

module.exports = router;
