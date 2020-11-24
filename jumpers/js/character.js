function Character(x, name){
    this.pos = createVector(x, height/2);
    this.vel = createVector();
    this.grav = 0.1;
    this.size = 50;
    this.name = name;

    this.show = function(time){
        push();
        colorMode(HSB, 255);
        color = 80 - constrain(time / 10000, 0, 255);
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

    this.jump = function(time){
        if(this.pos.y == height/4 - this.size/2){
            this.vel.y = -5 - time/100000;
        }
        if(this.pos.y == -height/2 + this.size/2){
            this.vel.y = 10;
        }
    }

    this.mouseOver = function(){
        push();
        let mx = mouseX;
        let my = mouseY - height/2;

        if(dist(mx, my, this.pos.x, my) < this.size){
            fill(255);
            textSize(16);
            textAlign(CENTER);
            text(this.name, this.pos.x, height/3);
        }
        pop();
    }
}