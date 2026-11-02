

// Wait for the HTML page to finish loading before running any scripts
document.addEventListener("DOMContentLoaded", function () {

    //   SECTION 1: CLIENT-SIDE FORM VALIDATION 

    // Find the enquiry and contact forms on the page
    const enquiryForm = document.querySelector("form");

    // Only run form validation code if a form actually exists on the page
    if (enquiryForm) {
        
        // Listen for when the user clicks the submit button on the form
        enquiryForm.addEventListener("submit", function (event) {
            
            // Get the value typed into the full name input field
            const nameInput = document.getElementById("name") ? document.getElementById("name").value.trim() : "";
            
            // Get the value typed into the email input field
            const emailInput = document.getElementById("email") ? document.getElementById("email").value.trim() : "";
            
            // Get the value typed into the phone input field
            const phoneInput = document.getElementById("phone") ? document.getElementById("phone").value.trim() : "";

            // Check if the user left the name field empty
            if (nameInput === "") {
                alert("Please enter your full name before submitting."); // Display an error pop-up message
                event.preventDefault(); // Stop the form from submitting
                return; // Exit the function
            }

            // Check if the email field is empty or missing an '@' symbol
            if (emailInput === "" || !emailInput.includes("@") || !emailInput.includes(".")) {
                alert("Please enter a valid email address (e.g., name@example.com)."); // Display error message
                event.preventDefault(); // Stop the form from submitting
                return; // Exit the function
            }

            // Check if the phone number has at least 10 digits
            if (phoneInput === "" || phoneInput.length < 10) {
                alert("Please enter a valid phone number with at least 10 digits."); // Display error message
                event.preventDefault(); // Stop the form from submitting
                return; // Exit the function
            }

            // If all input fields pass validation, show a confirmation success message
            alert("Thank you! Your submission has been validated and sent successfully.");
        });
    }

    // --- SECTION 2: INTERACTIVE PRODUCT IMAGE LIGHTBOX / GALLERY ---

    // Find all images inside product and workshop grid cards
    const galleryImages = document.querySelectorAll(".grid-item img, section img");

    // Loop through each image found on the page
    galleryImages.forEach(function (img) {
        
        // Add a pointer cursor to indicate images are clickable
        img.style.cursor = "pointer";

        // Listen for a click event on each image
        img.addEventListener("click", function () {
            
            // Open a pop-up window showing the clicked image in high definition
            const overlay = document.createElement("div"); // Create background overlay container
            overlay.style.position = "fixed"; // Keep overlay fixed over screen
            overlay.style.top = "0"; // Align to top
            overlay.style.left = "0"; // Align to left
            overlay.style.width = "100%"; // Fill full width
            overlay.style.height = "100%"; // Fill full height
            overlay.style.backgroundColor = "rgba(0, 0, 0, 0.85)"; // Semi-transparent dark background
            overlay.style.display = "flex"; // Center image using flexbox
            overlay.style.justifyContent = "center"; // Horizontally center image
            overlay.style.alignItems = "center"; // Vertically center image
            overlay.style.zIndex = "2000"; // Keep overlay above header navigation

            const fullImg = document.createElement("img"); // Create full-sized image element
            fullImg.src = this.src; // Copy source path from clicked thumbnail image
            fullImg.alt = this.alt; // Copy alt text for accessibility
            fullImg.style.maxWidth = "90%"; // Prevent image from overflowing width
            fullImg.style.maxHeight = "90%"; // Prevent image from overflowing height
            fullImg.style.borderRadius = "8px"; // Add slight border rounding

            overlay.appendChild(fullImg); // Attach full image inside overlay container
            document.body.appendChild(overlay); // Add overlay to the main web page body

            // Close lightbox overlay when user clicks anywhere on it
            overlay.addEventListener("click", function () {
                overlay.remove(); // Remove overlay element from page
            });
        });
    });

    // --- SECTION 3: INTERACTIVE LEAFLET MAP ---

    // Find the map container element on the page
    const mapContainer = document.getElementById("map");

    // Only run map initialization if the map container exists
    if (mapContainer) {
        // Initialize the Leaflet map with coordinates (e.g., Johannesburg area) and zoom level
        const map = L.map('map').setView([-26.2041, 28.0473], 13);

        // Add OpenStreetMap tile layer styling
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Add a custom marker with a popup for Brother K's Furniture Store
        L.marker([-26.2041, 28.0473]).addTo(map)
            .bindPopup("Brother K's Furniture Store")
            .openPopup();
    }

    // Output status log to browser developer console
    console.log("Brother K's Furniture Store - Part 3 JavaScript features loaded successfully.");
});
