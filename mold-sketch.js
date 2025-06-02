let tendrils = [];
let codeChars = '01{}[]()<>+-*/=.,:;|&^%!$#@ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
let numTendrils = 60;
let spacing = 14;

function setup() {
    let cnv = createCanvas(1200, 400);
    cnv.parent("mossfade-canvas");
    background(0);
    textFont('Courier New');
    textSize(14);
    colorMode(HSB, 360, 255, 255, 255);

    for (let i = 0; i < numTendrils; i++) {
        tendrils.push(new Tendril(random(width), random(50)));
    }
}

function draw() {
    fill(0, 0, 0, 20);
    rect(0, 0, width, height);

    for (let t of tendrils) {
        t.update();
        t.display();
    }
}

class Tendril {
    constructor(x, offset) {
        this.x = x;
        this.offset = offset;
        this.length = floor(random(10, 25));
        this.chars = Array(this.length).fill().map(() => random(codeChars));
        this.yOffsets = Array(this.length).fill().map((_, i) => -i * spacing);
        this.hue = random(180, 300);
        this.speed = random(0.5, 1.2);
        this.time = random(1000);
    }

    update() {
        this.time += 0.01;
        this.x += sin(this.time + this.offset) * 0.5;

        for (let i = 0; i < this.yOffsets.length; i++) {
            this.yOffsets[i] += this.speed;

            if (this.yOffsets[i] > height + spacing) {
                this.yOffsets[i] = random(-400, -50);
                this.chars[i] = random(codeChars);
            }
        }
    }

    display() {
        for (let i = 0; i < this.length; i++) {
            let alpha = map(i, 0, this.length, 255, 50);
            fill((this.hue + i * 4) % 360, 180, 255, alpha);
            text(this.chars[i], this.x, this.yOffsets[i]);
        }
    }
}
