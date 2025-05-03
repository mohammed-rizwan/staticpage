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
    document.getElementById("Home").style.display = "block"; // Show Home tab content
    var firstTabButton = document.getElementsByClassName("tab-button")[0]; // Get the first tab button
    firstTabButton.classList.add("active"); // Add active class to the first tab button
});
