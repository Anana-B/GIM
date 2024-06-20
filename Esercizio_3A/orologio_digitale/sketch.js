function setup() {
    createCanvas(windowWidth, windowHeight);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    const currentHour = hour();
    const currentMinute = minute();
    const currentSecond = second();

    
    const hoursRgb = Math.floor((currentHour / 23) * 255);
    const minutesRgb = Math.floor((currentMinute / 59) * 255);
    const secondsRgb = Math.floor((currentSecond / 59) * 255);

    
    const luminance = (0.2126 * hoursRgb + 0.7152 * minutesRgb + 0.0722 * secondsRgb) / 255;

    
    let backgroundColor;
    if (luminance > 0.5) {
        backgroundColor = color(255);
    } else {
        backgroundColor = color(0);
    }

    background(backgroundColor);

    
    const strokeColor = luminance > 0.5 ? color(0) : color(255);

    noStroke();
    fill(hoursRgb, minutesRgb, secondsRgb);
    
   
    rect(0, height / 3 * 0, currentHour / 24 * width, height / 3);
    
 
    rect(0, height / 3 * 1, currentMinute / 60 * width, height / 3);
    
    
    rect(0, height / 3 * 2, currentSecond / 60 * width, height / 3);

  
}
