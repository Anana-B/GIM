let balls = [];

function setup() {
    createCanvas(windowWidth, windowHeight);

    // Initialize the first ball (original ball) with red color
    balls.push(createBall(width / 2, height / 2, true));
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function createBall(x, y, isOriginal) {
    let ballColor;
    if (isOriginal) {
        ballColor = color(255, 0, 0); // Red color for original ball
    } else {
        ballColor = color(random(255), random(255), random(255)); // Random color for other balls
    }
    return {
        x: x,
        y: y,
        velX: random(-10, 10),
        velY: random(-10, 10),
        color: ballColor
    };
}

function draw() {
    background(200);

    for (let i = 0; i < balls.length; i++) {
        let ball = balls[i];
        ball.x += ball.velX;
        ball.y += ball.velY;

        // Bounce off the walls
        if (ball.x >= width || ball.x <= 0) {
            ball.velX = -ball.velX;
        }

        if (ball.y >= height || ball.y <= 0) {
            ball.velY = -ball.velY;
        }

        // Check if original ball touches the margin
        if (i === 0 && (ball.x >= width || ball.x <= 0 || ball.y >= height || ball.y <= 0)) {
            balls.push(createBall(ball.x, ball.y, false)); // Create new ball with random color
        }

        // Draw the ball
        noStroke();
        fill(ball.color);
        circle(ball.x, ball.y, 50);
    }
}