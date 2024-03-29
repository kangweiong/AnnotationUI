const express = require("express");
const router = express.Router();
const Annotations = require("../models/annotations");

// request: GET all annotations
router.get("/", (req, res) => {
  Annotations.find()
    .then((annotation) => res.json(annotation))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// request: POST new annotation
router.post("/add", (req, res) => {
  const newAnnotation = new Annotations({
    filename: req.body.filename,
    status: req.body.status,
  });

  newAnnotation
    .save()
    .then(() => res.json("Annotation has been updated successfully."))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// request: FIND annotation by ID
router.get("/:id", (req, res) => {
  Annotations.findById(req.params.id)
    .then((annotation) => res.json(annotation))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// request: FIND annotation by ID and update
router.put("/update/:id", (req, res) => {
  Annotations.findById(req.params.id)
    .then((annotation) => {
      annotation.filename = req.body.filename;
      annotation.status = req.body.status;

      annotation
        .save()
        .then(() => res.json("Annotation has been updated successfully."))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// request: DELETE all annotations
router.delete("/delete", (req, res) => {
  Annotations.deleteMany()
    .then(() => res.json("All annotations have been deleted successfully."))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});
module.exports = router;
