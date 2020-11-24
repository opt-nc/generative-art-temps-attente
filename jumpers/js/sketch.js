let url = "http://localhost:8081/temps-attente/agences/noumea";
let data;
let chars = [];
let bg;
let logo;

function preload(){
    p5.disableFriendlyErrors = true;
    loadJSON(url, gotData);
    bg = loadImage("img/background.jpg");
    logo = loadImage("img/logo_opt.png");
}

function gotData(json){
    data = json;
}

function setup(){
    createCanvas(windowWidth, windowHeight);
    
    var step = width / data.length;
    x = step/2;

    for(var i = 0; i < data.length; i++){
        chars.push(new Character(x, data[i].designation));
        x += step;
    }

    setInterval(updateJson, 30000)
}

function draw(){
    clear();
    image(bg, 0, 0);
    translate(0, height/2);

    rectMode(CORNERS);
    fill(255);
    rect(0, height/4, width, height);
    image(logo, width - logo.width/3 - 10, height/3, logo.width/3, logo.height/3)

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