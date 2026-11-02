document.addEventListener("DOMContentLoaded", function () {

    // Find the product search box
    const searchInput = document.getElementById("productSearch");

    // Find all the product cards
    const productCards = document.querySelectorAll(".product-card");

    // Check that the search box exists
    if (searchInput) {

        // Run whenever the customer types
        searchInput.addEventListener("input", function () {

            // Get the search text
            const searchText = searchInput.value.trim().toLowerCase();

            // Check each product card
            productCards.forEach(function (card) {

                // Get the product information
                const productInformation = card.textContent.toLowerCase();

                // Show matching products and hide others
                if (productInformation.includes(searchText)) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }

            });

        });

    }

});


// ENQUIRY FORM VALIDATION

const enquiryForm = document.getElementById("enquiryForm");

if (enquiryForm) {
    enquiryForm.addEventListener("submit", function (event) {

        // Prevent the browser from opening another page
        event.preventDefault();

        // Get the message area
        const formMessage = document.getElementById("formMessage");

        // Check whether the form information is valid
        if (enquiryForm.checkValidity()) {

            // Display a confirmation message
            formMessage.textContent =
                "Thank you! Your enquiry has been completed successfully.";

            // Clear the form
            enquiryForm.reset();

        } else {

            // Ask the customer to complete the required fields
            enquiryForm.reportValidity();

        }

    });

}


// REQUEST A QUOTE FORM

const quoteForm = document.getElementById("quoteForm");

if (quoteForm) {
    quoteForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const quoteMessage = document.getElementById("quoteMessage");

        if (quoteForm.checkValidity()) {

            quoteMessage.textContent =
                "Thank you! Your quote request has been submitted successfully.";

            quoteForm.reset();

        } else {

            quoteForm.reportValidity();

        }

    });
}


// CONTACT FORM FUNCTIONALITY - AJAX

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const contactMessage = document.getElementById("contactMessage");

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        contactMessage.textContent = "Sending your message...";

        // Collect the customer's information
        const formData = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            messageType: document.getElementById("messageType").value,
            message: document.getElementById("message").value.trim(),
            _subject: "New Customer Message - Laptop Hub Pretoria",
            _replyto: document.getElementById("email").value.trim()
        };

        try {

            // Send the information using AJAX
            const response = await fetch(
                "https://formsubmit.co/ajax/vhutshilosihongo@gmail.com",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if (!response.ok || String(data.success) !== "true") {
                throw new Error("Message could not be sent.");
            }

            // Display a success message
            contactMessage.textContent =
                "Thank you! Your message has been sent successfully.";

            // Clear the form
            contactForm.reset();

        } catch (error) {

            // Display an error message
            contactMessage.textContent =
                "Sorry, your message could not be sent. Please try again.";

            console.error(error);

        }

    });
}

// IMAGE GALLERY LIGHTBOX


const galleryImages = document.querySelectorAll(".gallery-image");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");

if (galleryImages.length > 0 && lightbox && lightboxImage && closeLightbox) {

    galleryImages.forEach(function (image) {

        image.addEventListener("click", function () {
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
            lightbox.classList.add("active");
        });

    });

    closeLightbox.addEventListener("click", function () {
        lightbox.classList.remove("active");
    });

    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            lightbox.classList.remove("active");
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            lightbox.classList.remove("active");
        }
    });

}