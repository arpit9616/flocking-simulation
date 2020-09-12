/**
 * boid.js - contains 'Boid' class definition
 */

class Boid {

    constructor() {
        this.minSpeed = 2.0;
        this.maxSpeed = 4.0;
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(this.minSpeed, this.maxSpeed));
        this.acceleration = createVector(0, 0);
    }

    edges() {
        if (this.position.x > width) this.position.x = 0;
        else if (this.position.x < 0) this.position.x = width;
        if (this.position.y > height) this.position.y = 0;
        else if (this.position.y < 0) this.position.y = height;
    }

    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
    }

    show() {
        strokeWeight(8);
        stroke(255);
        point(this.position.x, this.position.y);
    }

}
