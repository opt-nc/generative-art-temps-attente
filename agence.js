function Agence(pos, id, name, waitingTime, maxWaitingTime, sliderValue){
    this.pos = pos;
    this.id = id;
    this.name = name;
    this.waitingTime = waitingTime;
    this.maxWaitingTime = maxWaitingTime;

    this.size = 25;
    this.angle = 0;
    this.speed = 0.01+random(0.01, 0.015);
    this.savedSpeed = this.speed;
    this.radius = pos*this.size;
    this.random = random(-10,-5);

    this.history = [];

    this.render = function(sliderValue){
        push();
        translate(width/2, height/2);

        noStroke();
        let color = map(this.waitingTime, 0, this.maxWaitingTime+10, 150, 255)+this.random;
        fill(color, 0, 255);
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
        for(let i = this.history.length-1; i >= 0; i--){
            fill(color, 0, 255, 100);
            circle(this.history[i][0], this.history[i][1], map(i, length, 0, size, 0));
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
        var sec_num = parseInt(this.waitingTime, 10); // don't forget the second param
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        return hours+'h'+minutes+'m'+seconds+'s';
    }
}