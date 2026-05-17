const express = require('express');
const router = express.Router();

const courseClient = require('../grpc/clients/courseClient');

// CREATE
router.post('/', (req, res) => {
  courseClient.CreateCourse(req.body, (err, response) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(response);
  });
});

// GET ALL
router.get('/', (req, res) => {
  courseClient.GetAllCourses({}, (err, response) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(response.courses);
  });
});



// SEARCH
router.get('/search/:keyword', (req, res) => {
  courseClient.SearchCourses(
    { keyword: req.params.keyword },
    (err, response) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(response.courses);
    }
  );
});  

// GET BY ID
router.get('/:id', (req, res) => {
  courseClient.GetCourse({ id: parseInt(req.params.id) }, (err, response) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(response);
  });
});



// UPDATE
router.put('/:id', (req, res) => {
  courseClient.UpdateCourse(
    { id: parseInt(req.params.id), ...req.body },
    (err, response) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(response);
    }
  );
});

// DELETE
router.delete('/:id', (req, res) => {
  courseClient.DeleteCourse(
    { id: parseInt(req.params.id) },
    (err, response) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(response);
    }
  );
});



module.exports = router;