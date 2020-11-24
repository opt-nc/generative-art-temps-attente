function Character(x, name, time){
    this.pos = createVector(x, height/2);
    this.vel = createVector();
    this.grav = 0.1;
    this.size = 50;
    this.name = name;
    this.waitingTime = time;

    this.show = function(){
        push();
        colorMode(HSB, 255);
        color = 80 - constrain(this.waitingTime / 10000, 0, 255);
        stroke(color, 255, 180);
        fill(color, 255, 255);
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
        this.mouseOver(this.pos.x, this.pos.y);
        pop();
    }

    this.update = function(){
        this.vel.y += this.grav;
        this.pos.y += this.vel.y;
        this.pos.y = constrain(this.pos.y, -height/2 + this.size/2, height/4 - this.size/2);
    }

    this.jump = function(){
        if(this.pos.y == height/4 - this.size/2){
            this.vel.y = -5 - this.waitingTime/600000;
        }
        if(this.pos.y == -height/2 + this.size/2){
            this.vel.y = -this.vel.y;
        }
    }

    this.mouseOver = function(){
        push();
        let mx = mouseX;
        let my = mouseY - height/2;

        if(dist(mx, my, this.pos.x, my) < this.size/3){
            fill(255);
            noStroke();
            textSize(16);
            textStyle(BOLD);
            textAlign(CENTER);
            text(this.name, this.pos.x, height/3 - 60);
            text("Temps d'attente: " + this.formatTime(), this.pos.x, height/3 - 40);
        }
        pop();
    }

    this.formatTime = function(){
        return moment("2015-01-01").startOf('day')
            .seconds(this.waitingTime/1000)
            .format('HH:mm:ss');
    }
}