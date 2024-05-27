let balls = [];

function setup() {
    createCanvas(windowWidth, windowHeight);

    // Initialize the first ball
    balls.push(createBall(width / 2, height / 2));
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function createBall(x, y) {
    return {
        x: x,
        y: y,
        velX: random(-10, 10),
        velY: random(-10, 10),
        r: random(255),
        g: random(255),
        b: random(255),
    };
}

function draw() {
    background(200);

    for (let i = 0; i < balls.length; i++) {
        let ball = balls[i];
        ball.x += ball.velX;
        ball.y += ball.velY;

        if (ball.x >= width || ball.x <= 0) {
            ball.velX = -ball.velX;
            balls.push(createBall(ball.x + (ball.x >= width ? -50 : 50), ball.y));
        }

        if (ball.y >= height || ball.y <= 0) {
            ball.velY = -ball.velY;
            balls.push(createBall(ball.x, ball.y + (ball.y >= height ? -50 : 50)));
        }

        noStroke();
        fill(ball.r, ball.g, ball.b);
        circle(ball.x, ball.y, 40); 
    }
}