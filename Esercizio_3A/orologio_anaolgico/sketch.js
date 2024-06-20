let bgGraphics; // Graphics object for the background
let totalHours = 12; // Total hours to simulate (12-hour clock)

function setup() {
    createCanvas(windowWidth, windowHeight);
    bgGraphics = createGraphics(windowWidth, windowHeight);
    drawSolarSystem();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    bgGraphics = createGraphics(windowWidth, windowHeight);
    drawSolarSystem();
}

function draw() {
    background(0);

    // sfondo 
    image(bgGraphics, 0, 0);

    translate(width / 2, height / 2);

    stroke(255);

    let maxOrbitRadius = min(width, height) / 2.5;

    
    let now = new Date();
    let currentHour = now.getHours() % 12; // formato di 12 ore
    let currentMinute = now.getMinutes();
    let currentSecond = now.getSeconds();

    // il sole
    fill(255, 204, 0); 
    ellipse(0, 0, maxOrbitRadius * 0.2, maxOrbitRadius * 0.2);

    // pianetta blu
    let hourAngle = map(currentHour + currentMinute / 60, 0, totalHours, -HALF_PI, TAU - HALF_PI); // angolo per ora
    push();
    rotate(hourAngle);
    translate(maxOrbitRadius * 0.4, 0);
    fill(0, 0, 255); // Blue
    ellipse(0, 0, maxOrbitRadius * 0.05, maxOrbitRadius * 0.05);
    pop();

    // pianetta dei minuti
    let minuteAngle = map(currentMinute + currentSecond / 60, 0, 60, -HALF_PI, TAU - HALF_PI); // angolo per secondo
    push();
    rotate(minuteAngle);
    translate(maxOrbitRadius * 0.6, 0);
    fill(255, 100, 100); 
    ellipse(0, 0, maxOrbitRadius * 0.04, maxOrbitRadius * 0.04);
    pop();

    // seconda luna
    let secondAngle = map(currentSecond, 0, 60, -HALF_PI, TAU - HALF_PI); // angolo per secondo
    push();
    rotate(secondAngle);
    translate(maxOrbitRadius * 0.8, 0);
    fill(150);
    ellipse(0, 0, maxOrbitRadius * 0.02, maxOrbitRadius * 0.02);
    pop();
}

function drawSolarSystem() {
    bgGraphics.clear();

    let maxOrbitRadius = min(width, height) / 2.5;

    // stelle sullo sfondo
    bgGraphics.background(0);
    for (let i = 0; i < 100; i++) {
        let x = random(width);
        let y = random(height);
        let brightness = random(150, 255);
        bgGraphics.fill(brightness);
        bgGraphics.noStroke();
        bgGraphics.ellipse(x, y, 2, 2);
    }

    // Il sole
    bgGraphics.fill(255, 204, 0); 
    bgGraphics.noStroke();
    bgGraphics.ellipse(width / 2, height / 2, maxOrbitRadius * 0.2, maxOrbitRadius * 0.2);

    
    bgGraphics.noFill();
    bgGraphics.stroke(255, 50);
    bgGraphics.ellipse(width / 2, height / 2, maxOrbitRadius * 0.8 * 2, maxOrbitRadius * 0.8 * 2);
    bgGraphics.ellipse(width / 2, height / 2, maxOrbitRadius * 0.6 * 2, maxOrbitRadius * 0.6 * 2);
    bgGraphics.ellipse(width / 2, height / 2, maxOrbitRadius * 0.4 * 2, maxOrbitRadius * 0.4 * 2);
}
