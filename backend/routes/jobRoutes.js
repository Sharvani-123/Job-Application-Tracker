const express = require('express');
const router = express.Router();
const {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob
} = require('../controllers/jobController.js');

const { protect } = require('../middleware/authMiddleware.js');

router.route('/')
    .post(protect, createJob)
    .get(protect, getJobs);

router.route('/:id')
    .get(protect, getJobById)
    .put(protect, updateJob)
    .delete(protect, deleteJob);

module.exports = router;
