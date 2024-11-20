document.addEventListener('DOMContentLoaded', () => {
    const courses = JSON.parse(localStorage.getItem('courses')) || [];

    // Handle form submission for adding a new course
    const addCourseForm = document.getElementById('add-course-form');
    if (addCourseForm) {
        addCourseForm.addEventListener('submit', event => {
            event.preventDefault();
            const courseName = document.getElementById('course-name').value;
            const courseDescription = document.getElementById('course-description').value;
            const course = { id: Date.now().toString(), name: courseName, description: courseDescription };

            courses.push(course);
            localStorage.setItem('courses', JSON.stringify(courses));
            window.location.href = 'index.html';
        });
    }

    // Display courses list on the homepage
    const coursesList = document.getElementById('courses-list');
    if (coursesList) {
        coursesList.innerHTML = courses.map(course => `<p><a href="course.html?id=${course.id}">${course.name}</a></p>`).join('');
    }

    // Display individual course details
    const courseDetails = document.getElementById('course-details');
    if (courseDetails) {
        const urlParams = new URLSearchParams(window.location.search);
        const courseId = urlParams.get('id');
        const course = courses.find(c => c.id === courseId);
        if (course) {
            courseDetails.innerHTML = `<h2>${course.name}</h2><p>${course.description}</p>`;
        } else {
            courseDetails.innerHTML = '<p>Course not found</p>';
        }
    }
});
