// Get the canvas element
const canvas = document.getElementById('astrologyChart');

// Get the 2d context of the canvas
const context = canvas.getContext('2d');

// Function to draw a circle
function drawEmptyCircle(x, y, radius, lineWidth) {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.lineWidth = lineWidth;
    context.strokeStyle = '#6c5b7b';
    context.stroke();
}

// Calculate the center of the canvas
const cx = canvas.width / 2;
const cy = canvas.height / 2;


const radii = [100, 120, 210, 250, 290];
const lineWidths = [0.5, 0.5, 1.5, 1.5, 1];
context.strokeStyle = "#b631df";
for (let x = 0; x < 5; x++) {
    drawEmptyCircle(cx, cy, radii[x], lineWidths[x]);
}

// Calculate the current day of the year
const now = new Date();
const start = new Date(now.getFullYear(), 0, 0);
const diff = now - start;
const oneDay = 1000 * 60 * 60 * 24;
const day = Math.floor(diff / oneDay);

// Calculate the angle of Earth around the Sun for the current day of the year
const angle = (day / 365.25) * 2 * Math.PI;

// Calculate the distance from the Sun to the Earth
const r = Math.min(cx, cy) * 0.8;  // 80% of half of canvas size

// Calculate the x and y coordinates of the Earth
let x = cx + r * Math.cos(angle);
const y = cy + r * Math.sin(angle);

function getRotation(date) {
    // The starting point (0 degrees) is set as the vernal equinox, typically around March 21
    const start = new Date(date.getFullYear(), 2, 21);

    // Calculate the difference in days between the given date and the starting point
    let diff = Math.floor((date - start) / (1000 * 60 * 60 * 24));

    // If the date is before the starting point, adjust the difference
    if (diff < 0) {
        diff += Math.floor(365.25); // Add the number of days in a year
    }

    // Calculate the degree of rotation
    return diff * 0.986;
}


const prefix = "img/zodiac-signs/";
const icons = [
    "aries.png",
    "taurus.png",
    "gemini.png",
    "cancer.png",
    "leo.png",
    "virgo.png",
    "libra.png",
    "scorpio.png",
    "sagittarius.png",
    "capricorn.png",
    "aquarius.png",
    "pisces.png"
];

const radius = 230; // adjust this value
let angleStep = 30;
// convert angleStep to radians
angleStep = angleStep * Math.PI / 180;
angleStep = 30 * Math.PI / 180;

function drawImage(src, x, y) {
    const img = new Image();
    img.onload = function () {
        // reduce image size by 50%
        context.drawImage(img, x - img.width / 8, y - img.height / 8, img.width / 4, img.height / 4);
    }
    img.src = src;
}

function drawLine(context, x1, y1, x2, y2) {
    context.beginPath(); // start a new path
    context.moveTo(x1, y1); // move the "pen" to the first point
    context.lineTo(x2, y2); // draw a line to the second point
    context.stroke(); // render the line
}

context.strokeStyle = "#b631df";
for (let i = 0; i < 12; i++) {
    const nihe = 30 * Math.PI / 180;
    drawImage(prefix + icons[i], cx + radius * Math.cos(angleStep * i + nihe), cy + radius * Math.sin(angleStep * i + nihe));
    const lineDistance = 15 * Math.PI / 180;
    drawLine(context, cx + radii[2] * Math.cos(angleStep * i + lineDistance), cy + radii[2] * Math.sin(angleStep * i + lineDistance), cx + radii[3] * Math.cos(angleStep * i + lineDistance), cy + radii[3] * Math.sin(angleStep * i + lineDistance));
}

angleStep = 5;
// convert angleStep to radians
angleStep = angleStep * Math.PI / 180;

// draw a line from radius 250 to 240 at 10 degree intervals
for (let i = 0; i < 72; i++) {
    // change color of the line to #595940

    drawLine(context, cx + radii[3] * Math.cos(angleStep * i), cy + radii[3] * Math.sin(angleStep * i), cx + (radii[3] - 10) * Math.cos(angleStep * i), cy + (radii[3] - 10) * Math.sin(angleStep * i));
}

angleStep = 10;
// convert angleStep to radians
angleStep = angleStep * Math.PI / 180;

// draw a line from radius 250 to 240 at 10 degree intervals
for (let i = 0; i < 36; i++) {
    context.lineWidth = 2;
    drawLine(context, cx + radii[3] * Math.cos(angleStep * i), cy + radii[3] * Math.sin(angleStep * i), cx + (radii[3] - 10) * Math.cos(angleStep * i), cy + (radii[3] - 10) * Math.sin(angleStep * i));
}


//for i in range(0, 360, 10):

document.getElementById("submitButton").addEventListener("click", function (event) {
    let date = document.getElementById("birthdate").value; // Get the entered date
    date = new Date(date); // Convert it to a Date object
    date = getRotation(date) * Math.PI / 180; // Calculate the rotation

    const x = cx + (radii[4] - 20) * Math.cos(date);
    const y = cy + (radii[4] - 20) * Math.sin(date);
    const earth = new Image();
    earth.onload = function () {
        context.drawImage(earth, x - earth.width / 6, y - earth.height / 6, earth.width / 3, earth.height / 3);
    }
    earth.src = "img/planets/sun.png";

    event.preventDefault(); // Prevent the form from submitting normally
}, false);



