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
        separationSteering.mult(separationSlider.value());
        this.acceleration.add(separationSteering);
        
        const alignmentSteering = this._alignment(boids);
        alignmentSteering.mult(alignmentSlider.value());
        this.acceleration.add(alignmentSteering);

        const cohesionSteering = this._cohesion(boids);
        cohesionSteering.mult(cohesionSlider.value());
        this.acceleration.add(cohesionSteering);
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

    _alignment(boids) {
        const perceptionRadius = 50;
        const steering = createVector(0, 0);
        let count = 0;
        for (let boid of boids) {
            const distance = dist(this.position.x, this.position.y, boid.position.x, boid.position.y);
            if (boid != this && distance < perceptionRadius) {
                steering.add(boid.velocity);
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

    _cohesion(boids) {
        const perceptionRadius = 50;
        const steering = createVector(0, 0);
        let count = 0;
        for (let boid of boids) {
            const distance = dist(this.position.x, this.position.y, boid.position.x, boid.position.y);
            if (boid != this && distance < perceptionRadius) {
                steering.add(boid.position);
                count++;
            }
        }
        if (count > 0) {
            steering.div(count);
            steering.sub(this.position);
            steering.setMag(this.maxVelocity);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

}
