let url = "http://localhost:8081/temps-attente/agences/noumea";
let data;

let fps = 0;

let gravity;
let length;
let showNames;

let planets = [];

function preload(){
  loadJSON(url, gotData);
}

function gotData(json){
  data = json;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  for(let i = 0; i < Object.keys(data).length; i++) {
    let x = random(width);
    let y = random(height);
    let m = map(data[i].realMaxWaitingTimeMs, 0, 150000, 30, 200, true);
    planets[i] = new Planet(i, Object.keys(data).length, x, y, m, data[i].designation);
  }
  
  setInterval(refreshFPS, 1000);
  setInterval(refreshJson, 30000);

  length = createSlider(5, 200, 35, 1);
  length.position(50, height - 50);
  length.style("width", "150px");

  gravity = createSlider(0, 2, 0.3, 0.01);
  gravity.position(50, height - 100);
  gravity.style("width", "150px");

  showNames = createCheckbox("Afficher les noms", false);
  showNames.position(45, height - 150);
  showNames.style("font-family","Arial");
  showNames.style("color","white");
}

function draw() {
  clear();
  for(var i = 0; i < planets.length; i++){
    planets[i].update(length.value());
    planets[i].show(showNames.checked());
    planets[i].attract(planets, gravity.value(), map(data[i].realMaxWaitingTimeMs, 0, 150000, 30, 200, true));
  }

  showDate();

  fill(255);
  textSize(16);
  text("Taille des trainées", 50, height - 55);
  text("Force d'attraction", 50, height - 105);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  showNames.position(45, height - 150);
  length.position(50, height - 50);
  gravity.position(50, height - 100);
}

function showDate(){
  push();

  translate(width/2, height/2);

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

function refreshFPS(){
  fps = parseInt(frameRate()); 
}

function refreshJson(){
  loadJSON(url, gotData);
}