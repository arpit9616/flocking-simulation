/**
 * sketch.js - containing 'setup' and 'draw' funtions for
 *              p2.js along with other bootstraping variables
 */

const boids = [];
const numberOfBoids = 100;

let separationSlider, alignmentSlider, cohesionSlider;

function setup() {
    createCanvas(640, 360);
    separationSlider = createSlider(0, 4, 1, 0.1);
    alignmentSlider = createSlider(0, 4, 1, 0.1);
    cohesionSlider = createSlider(0, 4, 1, 0.1);
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
