const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20, 20);



const matrix = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
];
// Don't understand
function createMatrix (w, h) {
    const matrix = [];
    while (h--)  {
        matrix.push(new Array(w).fill(0))
    }
    return matrix;
}
// Drawing background and updating player
function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawMatrix(player.matrix, player.pos);
}
// Drawing player part based on matrix shape and location
function drawMatrix(matrix, offset) {
    matrix.forEach(function (row, y) {
        row.forEach(function (value, x) {
            if (value !== 0) {
                context.fillStyle = 'red';
                context.fillRect(x + offset.x, y + offset.y, 1, 1)
            }
        })
    });
}

function merge(arena, player) {
    player.matrix.forEach(function (row, y) {
        row.forEach(function (value, x) {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}
// Updating players location downwards and resetting drop timer
function playerDrop() {
    player.pos.y++;
    dropCounter = 0;
}

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;
// Creating logic for when the player will drop and updating screen
function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;
    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop();
    }
    draw();
    requestAnimationFrame(update);
}

const arena = createMatrix(12, 20);
// Player starting location
const player = {
    pos: {x: 5, y: 5},
    matrix: matrix,
};
// Adding player controls
document.addEventListener('keydown', function (event) {
    console.log(event);
    if (event.keyCode === 37) {
        player.pos.x--;
    } else if (event.keyCode === 39) {
        player.pos.x++;
    } else if (event.keyCode === 40) {
        playerDrop();
    }
});
// Starting the game
update();