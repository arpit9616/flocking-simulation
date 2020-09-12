/**
 * boid.js - contains 'Boid' class definition
 */

class Boid {

    constructor() {
        this.minSpeed = 2.0;
        this.maxSpeed = 4.0;
        this.maxForce = 1.0;
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

    flock(boids) {
        const separationSteering = this._separation(boids);
        this.acceleration.add(separationSteering);
    }

    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.acceleration.mult(0);
    }

    show() {
        strokeWeight(8);
        stroke(255);
        point(this.position.x, this.position.y);
    }

    _separation(boids) {
        const perceptionRadius = 50;
        const steering = createVector(0, 0);
        let count = 0;
        for (let boid of boids) {
            const distance = dist(this.position.x, this.position.y, boid.position.x, boid.position.y);
            if (boid != this && distance < perceptionRadius) {
                let difference = p5.Vector.sub(this.position, boid.position);
                difference.div(distance * distance);
                steering.add(difference);
                count++;
            }
        }
        if (count > 0) {
            steering.div(count);
            steering.setMag(this.maxVelocity);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

}
