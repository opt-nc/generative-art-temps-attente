function Agence(pos, id, name, waitingTime, maxWaitingTime, sliderValue){
    this.pos = pos;
    this.id = id;
    this.name = name;
    this.waitingTime = waitingTime;
    this.maxWaitingTime = maxWaitingTime;

    this.size = 25;
    this.angle = 0;
    this.speed = 0.01+random(0.01, 0.015);
    this.radius = pos*this.size;
    this.random = random(-10,-5);

    this.history = [];

    this.render = function(sliderValue){
        push();
        translate(width/2, height/2);

        noStroke();
        let color = map(this.waitingTime, 0, this.maxWaitingTime+10, 150, 255)+this.random;
        fill(color, 0, 255);
        let x = 0;
        let y = 0;

        if(this.pos !== 0) {
            y = this.radius * sin(this.angle);
            x = this.radius * cos(this.angle);

            // TRAILS
            this.history.push([x,y]);
            this.showTrails(color, this.size, sliderValue);
        }
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
}