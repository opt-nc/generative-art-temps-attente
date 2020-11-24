function Character(x, name){
    this.pos = createVector(x, height/2);
    this.vel = createVector();
    this.grav = 0.1;
    this.fixedSize = 60;
    this.deformation = 20;
    
    this.width = this.fixedSize;
    this.height = this.fixedSize;
    this.name = name;



    this.show = function(time){
        push();

        colorMode(HSB, 255);
        color = 80 - constrain(time / 10000, 0, 255);

        stroke(color, 255, 180);
        strokeWeight(3);
        fill(color, 255, 255);

        ellipse(this.pos.x, this.pos.y, this.width, this.height);
        this.width -= 3;
        this.height += 3;
        this.width = constrain(this.width, this.fixedSize, this.fixedSize + this.deformation);
        this.height = constrain(this.height, this.fixedSize - this.deformation, this.fixedSize)
        this.mouseOver(time);
        pop();
    }

    this.update = function(){
        this.vel.y += this.grav;
        this.pos.y += this.vel.y;
        this.pos.y = constrain(this.pos.y, -height/2 + this.height/2, height/4 - this.height/2);
    }

    this.jump = function(time){
        if(this.pos.y == height/4 - this.height/2){
            this.width += this.deformation;
            this.height -= this.deformation * 1.2;

            this.vel.y = -5 - time/600000;
        }
        if(this.pos.y == -height/2 + this.height/2){
            this.width += this.deformation;
            this.height -= this.deformation;

            this.vel.y = -this.vel.y;
        }
    }

    this.mouseOver = function(time){
        push();
        let mx = mouseX;
        let my = mouseY - height/2;

        if(dist(mx, my, this.pos.x, my) < this.height/3){
            fill(255);
            noStroke();
            textSize(16);
            textStyle(BOLD);
            textAlign(CENTER);
            text(this.name, this.pos.x, height/3 - 60);
            textStyle(NORMAL);
            text("Temps d'attente: " + this.formatTime(time), this.pos.x, height/3 - 40);
        }
        pop();
    }

    this.formatTime = function(time){
        return moment("2015-01-01").startOf('day')
            .seconds(time/1000)
            .format('HH:mm:ss');
    }
}