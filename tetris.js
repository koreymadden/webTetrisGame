// Getting HTML elements
const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
// Make game more viewable and match canvas.height & width
context.scale(20, 20);
// Players game piece
const matrix = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
];

function collide(arena, player) {
    const [m, o] = [player.matrix, player.pos];
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 && (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}
// Creates dimensions of game in zeros (Going to be 20 Arrays with 12 zeros in each array)
function createMatrix (w, h) {
    const matrix = [];
    while (h--)  {
        matrix.push(new Array(w).fill(0))
    }
    return matrix;
}
// Drawing background and updating player & existing blocks
function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawMatrix(arena, {x: 0, y: 0});
    drawMatrix(player.matrix, player.pos);
}
// Drawing player blocks based on matrix shape and location
function drawMatrix(matrix, offset) {
    matrix.forEach(function (row, y) {
        row.forEach(function (value, x) {
            if (value !== 0) {
                context.fillStyle = 'red';
                context.fillRect(x + offset.x, y + offset.y, 1, 1)
            }
        });
    });
}
// Taking the player's game piece and copying it onto the arena's matrix
function merge(arena, player) {
    player.matrix.forEach(function (row, y) {
        row.forEach(function (value, x) {
            if (value !== 0) {
                arena[player.pos.y + y][player.pos.x + x] = value;
            }
        });
    });
}
// Updating players location downwards and resetting drop timer
function playerDrop() {
    player.pos.y++;
    if (collide(arena, player)) {
        player.pos.y--;
        merge(arena, player);
        player.pos.y = 0;
    }
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
// Creating space so that blocks do not go out of viewable area
const arena = createMatrix(12, 20);
// Player starting location
const player = {
    pos: {x: 0, y: 0},
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


// Testing...
let x = 5;
while (x--) {
    console.log(x);
}