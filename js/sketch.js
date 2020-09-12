/**
 * sketch.js - containing 'setup' and 'draw' funtions for
 *              p2.js along with other bootstraping variables
 */

const boids = [];
const numberOfBoids = 100;

function setup() {
    createCanvas(640, 360);
    for (let i = 0; i < numberOfBoids; i++) { boids.push(new Boid()); }
}

function draw() {
    background(64);
    for (let boid of boids) {
        boid.edges();
        boid.flock(boids);
        boid.update();
        boid.show();
    }
}
