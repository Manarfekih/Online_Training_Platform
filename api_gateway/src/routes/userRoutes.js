const express = require('express');
const router = express.Router();

const userClient = require('../grpc/clients/userClient');


// CREATE USER
router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  userClient.CreateUser({ name, email, password }, (err, response) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(response);
  });
});


// GET ALL USERS
router.get('/', (req, res) => {
  userClient.GetAllUsers({}, (err, response) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(response.users);
  });
});


//search

router.get('/search', (req, res) => {
  const keyword = req.query.keyword;

  if (!keyword) {
    return res.status(400).json({ error: 'Missing query param: keyword' });
  }

  userClient.SearchUsers({ keyword }, (err, response) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(response.users);
  });
});

router.get('/search/:keyword', (req, res) => {
  const keyword = req.params.keyword;
  
  if (!keyword) {
    return res.status(400).json({ error: 'Missing keyword' });
  }

  userClient.SearchUsers({ keyword }, (err, response) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(response.users);
  });
});


// GET USER BY ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'Invalid user id' });
  }

  userClient.GetUser({ id }, (err, response) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(response);
  });
});

// UPDATE USER 
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, password } = req.body;

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'Invalid user id' });
  }

  if (!name && !email && !password) {
    return res.status(400).json({ 
      error: 'At least one field to update: name, email, or password' 
    });
  }

  userClient.UpdateUser({ id, name, email, password }, (err, response) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(response);
  });
});

// DELETE USER
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'Invalid user id' });
  }

  userClient.DeleteUser({ id }, (err, response) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(response);
  });
});

module.exports = router;
