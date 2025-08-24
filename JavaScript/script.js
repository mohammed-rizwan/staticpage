// Function to open a specific tab
function openTab(evt, tabName) {
    // Hide all tab content
    var tabContents = document.getElementsByClassName("tab-content");
    for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none"; // Hide each tab content
    }

    // Remove the "active" class from all tab buttons
    var tabButtons = document.getElementsByClassName("tab-button");
    for (var i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("active"); // Remove active class
    }

    // Show the current tab and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block"; // Show the selected tab content
    evt.currentTarget.classList.add("active"); // Add active class to the clicked button
}

// Optionally, open the first tab by default
document.addEventListener("DOMContentLoaded", function() {
    // Open the Home tab by default when the page loads
    if (document.getElementById("Home")) {
        document.getElementById("Home").style.display = "block"; // Show Home tab content
        var firstTabButton = document.getElementsByClassName("tab-button")[0]; // Get the first tab button
        if (firstTabButton) {
            firstTabButton.classList.add("active"); // Add active class to the first tab button
        }
    }
    
    // Initialize contact form if it exists
    initializeContactForm();
});

// Contact Form Handling
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        console.log('Contact form found, initializing...');
        contactForm.addEventListener('submit', handleFormSubmit);
    } else {
        console.log('Contact form not found');
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();
    console.log('Form submission started');
    
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    
    // Hide any existing messages
    hideMessages();
    
    // Disable submit button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    try {
        // Get form data
        const formData = new FormData(form);
        
        // Log form data for debugging
        console.log('Form data:', {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            access_key: formData.get('access_key')
        });
        
        console.log('Submitting to Web3Forms...');
        
        // Submit to Web3Forms
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData
        });
        
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        
        const result = await response.json();
        console.log('Response data:', result);
        
        if (response.ok && result.success) {
            // Success
            console.log('Form submitted successfully');
            showMessage(successMessage, 'Your message has been sent successfully!');
            form.reset(); // Clear the form
        } else {
            // Error from Web3Forms
            console.log('Web3Forms error:', result);
            showMessage(errorMessage, result.message || 'There was an error sending your message. Please try again later.');
        }
    } catch (error) {
        // Network or other error
        console.error('Form submission error:', error);
        showMessage(errorMessage, 'There was an error sending your message. Please check your internet connection and try again.');
    } finally {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.textContent = 'Submit Form';
    }
}

function showMessage(messageElement, text) {
    if (messageElement) {
        messageElement.textContent = text;
        messageElement.style.display = 'block';
        console.log('Showing message:', text);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            hideMessages();
        }, 5000);
    }
}

function hideMessages() {
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    
    if (successMessage) successMessage.style.display = 'none';
    if (errorMessage) errorMessage.style.display = 'none';
}
