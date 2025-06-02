let molds = [];
let num = 4000;
let d;
let globalHue = 0;

function setup() {
    let cnv = createCanvas(1200, 400);
    cnv.parent("mossfade-canvas");
    angleMode(DEGREES);
    colorMode(HSB, 360, 255, 255, 255);
    background(0);
    d = pixelDensity();

    for (let i = 0; i < num; i++) {
        molds[i] = new Mold();
    }
}

function draw() {
    noStroke();
    fill(0, 0, 0, 90);
    rect(0, 0, width, height);

    loadPixels();

    for (let i = 0; i < num; i++) {
        if (key === "s") {
            molds[i].stop = true;
            updatePixels();
            noLoop();
        } else {
            molds[i].stop = false;
        }

        molds[i].update();
        molds[i].display();
    }

    updatePixels();
    globalHue = (globalHue + 0.1) % 360;
}

class Mold {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = random(width);
        this.y = random(height);
        this.angle = random(360);
        this.hue = random(360);
        this.alpha = 255;
        this.stop = false;
        this.life = floor(random(500, 100));
    }

    update() {
        if (this.stop) return;

        this.life--;
        if (this.life <= 0) {
            if (random() < 0.01) {
                this.reset();
            } else {
                return;
            }
        }

        if (random() < 0.002) {
            this.angle += random(-180, 180);
        }

        this.x += cos(this.angle) * 1.5;
        this.y += sin(this.angle) * 1.5;

        if (this.x < 0) this.x += width;
        if (this.y < 0) this.y += height;
        if (this.x >= width) this.x -= width;
        if (this.y >= height) this.y -= height;

        this.angle += random(-5, 5);
    }

    display() {
        let ix = floor(this.x);
        let iy = floor(this.y);
        let idx = 4 * ((iy * width + ix) * d);

        let r = globalHue % 360;
        let c = color(r, 200, 255, 100);

        pixels[idx + 0] = red(c);
        pixels[idx + 1] = green(c);
        pixels[idx + 2] = blue(c);
        pixels[idx + 3] = 255;
    }
}
