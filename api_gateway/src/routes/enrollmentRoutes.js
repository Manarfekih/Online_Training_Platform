const express = require('express');
const router = express.Router();

const enrollmentClient = require('../grpc/clients/enrollmentClient');


// CREATE
router.post('/', (req, res) => {

  if (!req.is('application/json')) {
    return res.status(415).json({ error: 'Content-Type must be application/json' });
  }

  const user_id = req.body.user_id ?? req.body.userId;
  const course_id = req.body.course_id ?? req.body.courseId;

  if (user_id == null || course_id == null) {
    return res.status(400).json({
      error: 'Missing required fields: user_id, course_id'
    });
  }

  enrollmentClient.EnrollUser({ user_id, course_id }, (err, response) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(response);
  });
});


// GET ALL
router.get('/', (req, res) => {
  enrollmentClient.GetAllEnrollments({}, (err, response) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(response.enrollments);
  });
});


// GET BY ID
router.get('/:id', (req, res) => {
  enrollmentClient.GetEnrollment(
    { id: parseInt(req.params.id) },
    (err, response) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(response);
    }
  );
});


// DELETE
router.delete('/:id', (req, res) => {
  enrollmentClient.DeleteEnrollment(
    { id: parseInt(req.params.id) },
    (err, response) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(response);
    }
  );
});



module.exports = router;