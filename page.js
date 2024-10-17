const { Engine, Render, World, Bodies, Runner, Body } = Matter;

const canvas = document.getElementById('canvas');
const engine = Engine.create();
const render = Render.create({
    canvas: canvas,
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'rgb(254, 238, 205)',
    }
});

Render.run(render);
const runner = Runner.create();
Runner.run(runner, engine);

// Array to store image boxes
const boxes = [];

// Function to create a box
function createBox(x, y) {
    const box = Bodies.rectangle(x, y, 112, 112, {
        restitution: 0.8,
        render: {
            sprite: {
                texture: 'happy.png', // Replace with your image URL
                xScale: 1,
                yScale: 1,
            }
        }
    });
    World.add(engine.world, box);
    boxes.push(box);
}

// Create boxes on click
canvas.addEventListener('click', (event) => {
    const x = event.clientX;
    const y = event.clientY;
    createBox(x, y);
});

// Handle device orientation
window.addEventListener('deviceorientation', (event) => {
    const gravity = event.gamma; // X-axis
    engine.world.gravity.y = gravity / 90; // Adjust gravity based on orientation
});

function resizeCanvas() {
    render.options.width = window.innerWidth;
    render.options.height = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    Render.setSize(render, window.innerWidth, window.innerHeight);

    Matter.Body.setPosition(ground, {x: canvas.width / 2, y: canvas.height + 30})
    Matter.Body.setPosition(wallRight, {x: canvas.width + 30, y: canvas.height / 2})
    Matter.Body.setPosition(wallLeft, {x: -30, y: canvas.height / 2})
    Matter.Body.setPosition(roof, {x: canvas.width / 2, y: -30})
}

// Resize the canvas on window resize
window.addEventListener('resize',resizeCanvas);


// Start the engine
Engine.run(engine);

var ground = Bodies.rectangle(canvas.width / 2, canvas.height + 30, canvas.width, 60, {
    isStatic: true, label: "Ground"
});
var wallLeft = Bodies.rectangle(-30, canvas.height / 2, 60, canvas.height, {
    isStatic: true, label: "Wall Left"
});
var wallRight = Bodies.rectangle(canvas.width + 30, canvas.height / 2, 60, canvas.height, {
    isStatic: true, label: "Wall Right"
});
var roof = Bodies.rectangle(canvas.width / 2, -30, canvas.width, 60, {
    isStatic: true, label: "Roof"
});


World.add(engine.world, [ground, roof, wallLeft, wallRight]);

resizeCanvas()