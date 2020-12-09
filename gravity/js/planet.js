class Planet{
    constructor(i, nb, x, y, m, name){
      this.pos = createVector(x, y);
      
      this.vel = p5.Vector.random2D();
      this.vel.mult(5);
      this.acc = createVector(0, 0);
      
      this.color = map(i, 0, nb, 100, 255, true);

      this.mass = m;
      this.r = sqrt(this.mass) * 2;
      this.trail = [];

      this.name = name;
    }
    
    attract(planets, g, mass){
      this.mass = mass;
      this.r = sqrt(this.mass) * 2;

      for(let planet of planets){
        let force = p5.Vector.sub(this.pos, planet.pos);
        let distanceSq = constrain(force.magSq(), 1000, 2000);
        let strength = g * (this.mass * planet.mass) / distanceSq;
        force.setMag(strength);
        planet.applyForce(force);
      }
    }
    
    applyForce(force) {
      let f = p5.Vector.div(force, this.mass);
      this.acc.add(f);
    }
    
    show(checked) {
        push();
        strokeWeight(0.5);
        stroke(this.color, 0, 50);
        fill(this.color, 0, 100);
        this.showTrail();
        
        if(checked){
            fill(255);
            textAlign(CENTER);
            text(this.name, this.pos.x, this.pos.y - this.r - 5);
        }
        
        pop();
    }
    
    update(length) {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
    
        this.pos.x = constrain(this.pos.x, this.r, width-this.r);
        this.pos.y = constrain(this.pos.y, this.r, height-this.r);

        this.trail.push(createVector(this.pos.x + this.vel.x, this.pos.y + this.vel.y));
        if(this.trail.length > length){
            this.trail.splice(0, abs(this.trail.length - length));
        }

        if(this.pos.x <= this.r || this.pos.x >= width - this.r){
            this.vel.x = -1/2 * this.vel.x;
        }
        
        if(this.pos.y <= this.r || this.pos.y >= height - this.r){
            this.vel.y = -1/2 * this.vel.y;
        }
        
        this.acc.set(0, 0);
    }

    showTrail(){
        push();
        for(let i = this.trail.length-1; i >= 0 ; i--){
            fill(this.color, 0, 100, map(i, this.trail.length, 0, 255, 50, true));
            ellipse(this.trail[i].x, this.trail[i].y, map(i, this.trail.length, 0, this.r*2, 5, true));
        }
        pop();
    }
  }