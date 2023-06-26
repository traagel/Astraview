export class BirthChart {
    constructor(context, canvas) {
        this.context = context;
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.radius = Math.min(this.width, this.height) / 2 - 30;
        this.cx = this.width / 2;
        this.cy = this.height / 2;

        this.radii = [100, 120, 210, 250, 290];
        this.lineWidths = [0.5, 0.5, 1.5, 1.5, 1];

        this.icons = this.loadIcons();
        // Call draw method in constructor
        this.animate();

    }

    loadIcons() {

        return [
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
        ].map(icon => {
            const prefix = "img/zodiac-signs/";
            const img = new Image();
            img.src = prefix + icon;
            return img;
        });
    }

    drawCircle(radius, lineWidth) {
        this.context.beginPath();
        this.context.arc(this.cx, this.cy, radius, 0, 2 * Math.PI, false);
        this.context.lineWidth = lineWidth;
        this.context.strokeStyle = '#6c5b7b';
        this.context.stroke();
    }

    drawImage(image, x, y) {
        this.context.drawImage(image, x - image.width / 8, y - image.height / 8, image.width / 4, image.height / 4);
    }

    drawLine(x1, y1, x2, y2) {
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
    }

    drawCircles() {
        this.context.strokeStyle = "#b631df";
        for (let x = 0; x < 5; x++) {
            this.drawCircle(this.radii[x], this.lineWidths[x]);
        }
    }


    drawSigns(nihe) {
        this.context.clearRect(0, 0, this.width, this.height);
        this.drawCircles();
        nihe = nihe * Math.PI / 180;

        for (let i = 0; i < 12; i++) {
            let radius = 230;
            let angleStep = 30 * Math.PI / 180;
            this.drawImage(this.icons[i], this.cx + radius * Math.cos(angleStep * i + nihe), this.cy + radius * Math.sin(angleStep * i + nihe));
            const lineDistance = 15 * Math.PI / 180;
            this.drawLine(this.context, this.cx + this.radii[2] * Math.cos(angleStep * i + lineDistance), this.cy + this.radii[2] * Math.sin(angleStep * i + lineDistance), this.cx + this.radii[3] * Math.cos(angleStep * i + lineDistance), this.cy + this.radii[3] * Math.sin(angleStep * i + lineDistance));
        }
    }


    eraseImages() {
        this.context.globalCompositeOperation = "destination-over";
        this.context.clearRect(0, 0, this.width, this.height);
    }

    animate() {
        let nihe = 0;

        const drawFrame = () => {
            this.eraseImages();
            this.drawSigns(nihe);
            nihe += 0.5;
            window.requestAnimationFrame(drawFrame);
        }

        drawFrame();
    }

}

export default BirthChart;