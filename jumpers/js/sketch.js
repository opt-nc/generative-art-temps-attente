let url = "http://localhost:8081/agences?commune="; // API URL
let data = [];
let communes = []; // DATA ARRAY
let communeId = 0;
let jumpers = []; // JUMPERS ARRAY

let bg; // BACKGROUND IMAGE
let logo; // OPT LOGO

var fps = 0; // FPS COUNT

function preload(){
    p5.disableFriendlyErrors = true;
    communes = loadJSON("http://127.0.0.1:8081/communes");
    bg = loadImage("img/space.jpg"); // Retrieve background picture
    logo = loadImage("img/logo_opt.png"); // Retrieve logo picture
}

function gotData(json){
    for(var i = 0; i < json.length; i++){
        data.push(json[i]);
        jumpers.push(new Jumper(json[i].designation, communeId));
    }
    communeId++;
}

function updateData(json){
    for(var i = 0; i < json.length; i++){
        data[i] = json[i];
    }
}

function setup(){
    createCanvas(windowWidth, windowHeight);
    frameRate(144);

    for(var key in communes){
        loadJSON(url + communes[key], gotData); 
    }
    
    setInterval(updateJson, 60000); // Refresh the json by calling the API every minutes
    setInterval(refreshFPS, 1000);  // Refresh the FPS count every seconds
}

function draw(){
    clear();
    
    image(bg, 0, 0); // Show background picture
    translate(0, height/2); // Center the origin (0,0) in the middle left side of the screen

    showDate();
    showLogo();

    showTip();

    // Update jumpers
    for(var i = 0; i < jumpers.length; i++){
        jumpers[i].show(jumpers[i].fixedSize/2+i*width/jumpers.length, width/jumpers.length, data[i].realMaxWaitingTimeMs);
        jumpers[i].update();
        jumpers[i].jump(data[i].realMaxWaitingTimeMs);
    }
}

function windowResized(){ // If window is resized
    resizeCanvas(windowWidth, windowHeight);
}

function updateJson(){
    communeId = 1;
    for(var key in communes){
        loadJSON(url + communes[key], updateData);
        communeId++;
    }
}

function showLogo(){
    push();
    rectMode(CORNER)
    fill(255);
    rect(width - logo.width/4 - 30, height/2-logo.height/4 - 30, logo.width/3, logo.height/3)
    image(logo, width - logo.width/4 - 15, height/2-logo.height/4-15, logo.width/4, logo.height/4)
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
    textSize(32);
    text(date, -width/2.25+5, -height/3-80);

    textSize(64);
    let time = moment().format("HH:mm:ss");
    text(time, -width/2.25, -height/3);
    textSize(24);
    text("FPS: " + fps, -width/2.25+5, -height/3+50);
    pop();
}

function showTip(){
    push();
    fill(255);
    textStyle(BOLD);
    textSize(32);
    textAlign(CENTER);
    text("Passez votre souris sur les agences!", width/2-width/10, height/4+height/8+20);
    pop();
}

function refreshFPS(){
    fps = parseInt(frameRate());
}