function Agence(pos, id, name, waitingTime, maxWaitingTime, sliderValue){
    this.pos = pos;
    this.id = id;
    this.name = name;
    this.waitingTime = waitingTime;
    this.maxWaitingTime = maxWaitingTime;

    this.size = 25;
    this.fixedSize = this.size;
    this.dir = 0.2;

    this.angle = 0;
    this.speed = 0.01+random(0.01, 0.015);
    this.savedSpeed = this.speed;
    this.radius = pos*this.size;

    this.random = random(-10,-5);
    this.color = map(this.waitingTime, 0, this.maxWaitingTime+10, 150, 255, true)+this.random

    this.history = [];

    this.renderDay = function(sliderValue){
        push();
        this.size = this.fixedSize;
        translate(width/2, height/2);

        noStroke();
        fill(this.color, 0, 255);
        let y = this.radius * sin(this.angle);
        let x = this.radius * cos(this.angle);

        if(this.pos === 0) {
            x = 0;
            y = 0;
        }
        this.mouseOver(x, y);

        // TRAILS
        this.history.push([x,y]);
        this.showTrails(color, this.size, sliderValue);

        circle(x, y, this.size);

        this.angle = this.angle + this.speed;
        pop();
    }

    this.renderNight = function(sliderValue){
        push();
        translate(width/2, height/2);
        noStroke();
        fill(this.color, 0, 255);
        let y = this.radius * sin(this.angle);
        let x = this.radius * cos(this.angle);

        this.showTrails(color, this.size, sliderValue);
        this.history.splice(0,2);
        this.mouseOver(x, y);

        text(this.history,0,this.y+100);

        circle(x, y, this.size);
        this.size += this.dir;
        if(this.size >= this.fixedSize){
            this.dir = -0.2;
        } else if(this.size <= 0){
            this.dir = 0.2;
        }
        pop();
    }

    this.updateDatas = function(newWaitingTime, newMaxWaitingTime) {
        this.waitingTime = newWaitingTime;
        this.maxWaitingTime = newMaxWaitingTime;
    }

    this.showTrails = function(color, size, sliderValue){
        let length = sliderValue;
        if(this.history.length > length){
            this.history.splice(0,abs(this.history.length-length));
        }

        push();
        fill(color, 0, 255, 100);
        for(let i = this.history.length-1; i >= 0; i--){
            circle(this.history[i][0], this.history[i][1], map(i, length, 0, size, 0, true));
        }
        pop();
    }

    this.mouseOver = function(x, y){
        push();
        let mx = mouseX - width/2;
        let my = mouseY - height/2;
        this.speed = this.savedSpeed;
        if(dist(x, y, mx, my) < this.size/2){
            this.speed = 0;
            fill(255);
            textAlign(CENTER);
            textSize(18);
            text(this.name, width/2-200, -10);
            textSize(16);
            text("Temps d'attente: " + this.formatTime(), width/2-200, 10)
        }
        pop();
    }

    this.formatTime = function(){
        return moment("2015-01-01").startOf('day')
            .seconds(this.waitingTime/1000)
            .format('HH:mm:ss');
    }
}