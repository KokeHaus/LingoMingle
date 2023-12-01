const express = require('express');
const User = require('../models/user'); 
const router = express.Router();

let textqueue=[]
let audioqueue=[]
router.post('/jointextqueue', async (req, res) => {
    const username = req.body.username; 
    if (!textqueue.includes(username)) { // Prevent duplicate entries
      textqueue.push(username);
    }
    res.status(200).json({ 
        message: "Joined text chat queue", 
        queueSize: textqueue.length 
    });
  });
  
  router.post('/leavetextqueue', (req, res) => {
    const username = req.body.username; // Use username instead of userId
    textqueue = textqueue.filter(u => u !== username); // Remove user from the queue
    res.status(200).json({ message: "Left text chat queue" });
  });
  
  

  router.post('/joinaudioqueue', async (req, res) => {
    const username = req.body.username;
    if (!audioqueue.includes(username)) { // Prevent duplicate entries
      audioqueue.push(username);
    }
    res.status(200).json({ 
        message: "Joined audio chat queue", 
        queueSize: audioqueue.length 
    });
  });

  router.post('/leaveaudioqueue', (req, res) => {
    const username = req.body.username;
    audioqueue = audioqueue.filter(u => u !== username); // Remove user from the queue
    res.status(200).json({ message: "Left audio chat queue" });
  });
  
  
  router.get('/text-queue-size', async (req, res) => {
    res.status(200).json({ size: textqueue.length });
  });
  

  router.get('/audio-queue-size', async (req, res) => {
    res.status(200).json({ size: audioqueue.length });
  });
  
  
module.exports = router;
