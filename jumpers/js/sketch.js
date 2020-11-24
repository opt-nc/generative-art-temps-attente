let url = "http://localhost:8081/temps-attente/agences/noumea";
let data;

let chars = [];

let bg;
let logo;

var fps = 0;

function preload(){
    p5.disableFriendlyErrors = true;
    loadJSON(url, gotData);
    bg = loadImage("img/space.jpg");
    logo = loadImage("img/logo_opt.png");
}

function gotData(json){
    data = json;
}

function setup(){
    createCanvas(windowWidth, windowHeight);
    frameRate(144);

    var step = width / data.length;
    x = step/2;

    for(var i = 0; i < data.length; i++){
        chars.push(new Character(x, data[i].designation));
        x += step;
    }

    setInterval(updateJson, 30000);
    setInterval(refreshFPS, 1000);
}

function draw(){
    clear();
    
    image(bg, 0, 0);
    translate(0, height/2);

    showDate();
    showLogo();
    showGroung();

    for(var i = 0; i < chars.length; i++){
        chars[i].show(data[i].realMaxWaitingTimeMs);
        chars[i].update();
        chars[i].jump(data[i].realMaxWaitingTimeMs);
    }
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}

function updateJson(){
    loadJSON(url, gotData);
}

function showLogo(){
    push();
    rectMode(CORNER)
    fill(255);
    rect(width - logo.width/3 - 30, height/3 - 30, logo.width/2, logo.height/2)
    image(logo, width - logo.width/3 - 10, height/3, logo.width/3, logo.height/3)
    pop();
}

function showGroung(){
    push();
    rectMode(CORNERS);
    noFill();
    strokeWeight(2)
    rect(0, height/4, width, height);
    pop();
}

function showDate(){
    push();
    translate(width/2, 0);
    fill(255);
    stroke(255);
    moment.locale("fr");

    let date = moment().format("dddd").charAt(0).toUpperCase() + moment().format("dddd").slice(1);
    date += " " + moment().format("Do") + " " + moment().format("MMMM");
    //date += moment().format("MMMM").charAt(0).toUpperCase() + moment().format("MMMM").slice(1);
    textSize(32);
    text(date, -width/2.25+5, -height/3-80);

    textSize(64);
    let time = moment().format("HH:mm:ss");
    text(time, -width/2.25, -height/3);
    textSize(24);
    text("FPS: " + fps, -width/2.25+5, -height/3+50);
    pop();
}

function refreshFPS(){
    fps = parseInt(frameRate());
}