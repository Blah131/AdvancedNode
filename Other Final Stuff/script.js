document.addEventListener('DOMContentLoaded', () => {
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    const users = JSON.parse(localStorage.getItem('users')) || [];
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Handle form submission for adding a new course
    const addCourseForm = document.getElementById('add-course-form');
    if (addCourseForm) {
        addCourseForm.addEventListener('submit', event => {
            event.preventDefault();
            if (currentUser && currentUser.role === 'teacher') {
                const courseName = document.getElementById('course-name').value;
                const courseDescription = document.getElementById('course-description').value;
                const course = { id: Date.now().toString(), name: courseName, description: courseDescription };

                courses.push(course);
                localStorage.setItem('courses', JSON.stringify(courses));
                window.location.href = 'index.html';
            } else {
                alert('Only teachers can add courses.');
            }
        });
    }

    // Handle registration form submission
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', event => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const role = document.getElementById('role').value;
            const user = { id: Date.now().toString(), username, password, role };

            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            window.location.href = 'login.html';
        });
    }

    // Handle login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', event => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const user = users.find(u => u.username === username && u.password === password);
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                window.location.href = 'index.html';
            } else {
                alert('Invalid username or password');
            }
        });
    }

    // Handle logout
    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
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

    // Update navigation based on user role
    const addCourseLink = document.getElementById('add-course-link');
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    const user = JSON.parse(localStorage.getItem('currentUser'));

    if (user) {
        loginLink.style.display = 'none';
        registerLink.style.display = 'none';

        if (user.role === 'teacher') {
            addCourseLink.style.display = 'inline';
        } else {
            addCourseLink.style.display = 'none';
        }
    } else {
        logoutLink.style.display = 'none';
        addCourseLink.style.display = 'none';
    }
});
