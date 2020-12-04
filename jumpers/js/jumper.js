function Jumper(name, communeId){
    this.y = 0; // Position vector (x, y)
    this.vel = createVector(0, 0); // Velocity vector (x, y) 
    this.grav = 0.11; // Gravity setting
    this.fixedSize = 0; // Size of the ball setting
    this.width = this.fixedSize; 
    this.height = this.fixedSize;

    this.throwForce = 7; // Force of bounciness
    this.deformation = this.fixedSize/2; // Deformation when bouncing setting
    
    this.name = name; // Name of the ball
    this.communeId = communeId;

    this.show = function(x, size, time){
        push();
        this.fixedSize = size;
        this.deformation = this.fixedSize/2; 

        colorMode(HSB, 255);
        color = 80 - constrain(time / 10000, 0, 255); // Change the color depending on the waiting time (Green to Red);

        stroke(color, 255, 180);
        strokeWeight(3);
        fill(color, 255, 255);

        ellipse(x, this.y, this.width, this.height); // Show the ball

        this.width -= 1; // Cancel deformation
        this.height += 1; // Cancel deformation
        this.width = constrain(this.width, this.fixedSize, this.fixedSize + this.deformation);
        this.height = constrain(this.height, this.fixedSize - this.deformation, this.fixedSize)

        rectMode(CORNERS);
        noStroke();
        fill(map(noise(this.communeId), 0, 1, 100, 400), 255, 255, 200);
        rect(x-this.fixedSize/2, height/4-5, x+this.fixedSize/2, height/3.9);

        this.mouseOver(x, time);
        pop();
    }

    this.update = function(){
        this.vel.y += this.grav;
        this.y += this.vel.y;
        this.y = constrain(this.y, -height/2 + this.height/2, height/4 - this.height/2);
    }

    this.jump = function(time){
        if(this.y == height/4 - this.height/2){ // If the ball hits the ground

            // Deform
            this.width += this.deformation;
            this.height -= this.deformation * 1.2;

            // Bounce!
            this.vel.y = -this.throwForce - time/600000; 
        }
        if(this.y == -height/2 + this.height/2){ // If the ball hits the ceiling

            // Deform
            this.width += this.deformation;
            this.height -= this.deformation;

            // Bounce!
            this.vel.y = -this.vel.y;
        }
    }

    this.mouseOver = function(x, time){
        push();
        let mx = mouseX;
        let my = mouseY - height/2;

        rectMode(CORNERS);

        // Show the agency's name and waiting time if the mouse is located in the same column than the ball
        if(dist(mx, my, x, my) < this.height/2){ 
            noStroke();
            fill(map(noise(this.communeId), 0, 1, 100, 400), 255, 255, 50);
            rect(x-this.fixedSize/2, -height/2, x+this.fixedSize/2, height/4);

            fill(255);
            noStroke();
            textSize(16);
            textStyle(BOLD);
            textAlign(CENTER);
            text(this.name, constrain(x, 150, width-150), height/4+60);
            textStyle(NORMAL);
            text("Temps d'attente: " + this.formatTime(time), constrain(x, 150, width-150), height/4+40);
        }
        pop();
    }

    this.formatTime = function(time){
        return moment("2015-01-01").startOf('day')
            .seconds(time/1000)
            .format('HH:mm:ss');
    }
}