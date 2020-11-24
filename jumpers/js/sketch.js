let url = "http://localhost:8081/temps-attente/agences/noumea";
let data;
let chars = [];
let img;

function preload(){
    p5.disableFriendlyErrors = true;
    loadJSON(url, gotData);
    img = loadImage("img/background.jpg");
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
    image(img, 0, 0);
    translate(0, height/2);

    rectMode(CORNERS);
    fill(60, 50, 40);
    rect(0, height/4, width, height);

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