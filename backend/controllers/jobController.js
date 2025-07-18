const Job = require('../models/Job');


exports.createJob = async (req, res) => {
    try {
        const job = await Job.create({ ...req.body, user: req.user.id });
        res.status(201).json(job);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//  Get all jobs (with optional filtering by status)
exports.getJobs = async (req, res) => {
    try {
        const query = { user: req.user.id };
        if (req.query.status) {
            query.status = req.query.status;
        }
        const jobs = await Job.find(query).sort({ createdAt: -1 });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//  Get single job by ID
exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findOne({ _id: req.params.id, user: req.user.id });
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//  Update job
exports.updateJob = async (req, res) => {
    try {
        const job = await Job.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.status(200).json(job);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//  Delete job
exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.status(200).json({ message: 'Job deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
