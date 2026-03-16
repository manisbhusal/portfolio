// Alert message
function showMessage() {
    alert("Thank you for visiting Manish Bhusal's Portfolio!");
}

// Mobile menu toggle
function toggleMenu() {
    const menu = document.getElementById("menu");
    if (menu) {
        menu.classList.toggle("active");
    }
}

// Particle background
particlesJS("particles-js", {
    particles: {
        number: { value: 80 },
        size: { value: 3 },
        move: { speed: 2 },
        line_linked: { enable: true }
    }
});

// Typing animation
const text = [
    "CS Student",
    "Web Developer",
    "YouTube Content Creator",
    "Beat Music Producer"
];

let count = 0;
let index = 0;
let currentText = "";
let letter = "";

// typing function
function type() {

    if (count === text.length) {
        count = 0;
    }

    currentText = text[count];
    letter = currentText.slice(0, ++index);

    const typingElement = document.getElementById("typing");

    if (typingElement) {
        typingElement.textContent = letter;
    }

    if (letter.length === currentText.length) {
        count++;
        index = 0;
        setTimeout(type, 1200);
    } else {
        setTimeout(type, 100);
    }
}

// start typing when page loads
window.onload = type;
