const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let courses = [];
let users = [];

// Add a new course
app.post('/courses', (req, res) => {
    const course = req.body;
    courses.push(course);
    res.status(201).send(course);
});

// Get all courses
app.get('/courses', (req, res) => {
    res.send(courses);
});

// Update a course
app.put('/courses/:id', (req, res) => {
    const { id } = req.params;
    const courseIndex = courses.findIndex(c => c.id === id);
    if (courseIndex !== -1) {
        courses[courseIndex] = req.body;
        res.send(courses[courseIndex]);
    } else {
        res.status(404).send({ error: 'Course not found' });
    }
});

// Delete a course
app.delete('/courses/:id', (req, res) => {
    const { id } = req.params;
    const courseIndex = courses.findIndex(c => c.id === id);
    if (courseIndex !== -1) {
        courses.splice(courseIndex, 1);
        res.sendStatus(204);
    } else {
        res.status(404).send({ error: 'Course not found' });
    }
});

module.exports = app;
