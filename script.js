document.querySelector('.toggle-button').addEventListener('click', function() {
    document.querySelector('.navbar-links').classList.toggle('active');
    document.querySelector('.toggle-button').classList.toggle('active');
});

document.getElementById('feedback-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const rating = document.getElementById('rating').value;
    const promotion = document.getElementById('promotion').value;

    const feedbackData = {
        name,
        email,
        rating,
        promotion
    };

    console.log('Feedback submitted:', feedbackData);

    // Optionally, send the data to a server or save it
    alert('Thank you for your feedback!');
    event.target.reset();
});
