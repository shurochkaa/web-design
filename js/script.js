document.addEventListener("DOMContentLoaded", function () {
    const galleryImages = document.querySelectorAll(".gallery-image");
    const popupOverlay = document.getElementById("popupOverlay");
    const popupImage = document.getElementById("popupImage");
    let currentIndex = 0;
    galleryImages.forEach((image, index) => {
        image.addEventListener("click", function (event) {
            event.preventDefault();
            currentIndex = index;
            displayImage();
            popupOverlay.style.display = "flex";
        });
    });

    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const closeBtn = document.querySelector(".close-btn");

    prevBtn.addEventListener("click", function () {
        changeImage(-1);
    });

    nextBtn.addEventListener("click", function () {
        changeImage(1);
    });

    closeBtn.addEventListener("click", function () {
        closePopup();
    });


    const buttons = document.querySelectorAll(".prev-btn, .next-btn, .close-btn");

    function fadeInButtons() {
        buttons.forEach(button => {
            button.style.opacity = 1;
        });
    }
    function displayImage() {
        const imageURL = galleryImages[currentIndex].getAttribute("href");

        popupImage.style.opacity = 0;
        setTimeout(function () {
            popupImage.src = imageURL;
            popupImage.style.opacity = 1;
        }, 250);
    }


    function closePopup() {
        popupOverlay.style.display = "none";
    }

    function changeImage(direction) {
        currentIndex += direction;

        if (currentIndex < 0) {
            currentIndex = galleryImages.length - 1;
        } else if (currentIndex >= galleryImages.length) {
            currentIndex = 0;
        }

        displayImage();
    }

    document.addEventListener("keydown", function (event) {
        if (popupOverlay.style.display === "flex") {
            if (event.key === "ArrowLeft" || event.key === "Left") {
                changeImage(-1);
            } else if (event.key === "ArrowRight" || event.key === "Right") {
                changeImage(1);
            } else if (event.key === "Escape") {
                closePopup();
            }
        }
    });

    popupOverlay.addEventListener("click", function (event) {
        if (event.target === popupOverlay) {
            closePopup();
        }
    });

    popupImage.addEventListener("click", function (event) {
        const clickX = event.clientX - this.getBoundingClientRect().left;
        const imageWidth = this.width;

        if (clickX < imageWidth / 3) {
            changeImage(-1);
        } else {
            changeImage(1);
        }
    });
});
