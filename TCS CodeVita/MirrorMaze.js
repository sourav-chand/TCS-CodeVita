const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

const [M, N] = input[0].split(' ').map(Number);
const grid = input.slice(1, M + 1).map(line => line.split(' '));

// Directions: 0=up, 1=right, 2=down, 3=left
const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];

// Mirror reflection rules
const mirrorReflect = {
    '/': [1, 0, 3, 2],
    '\\': [3, 2, 1, 0]
};

const visited = Array.from({ length: M }, () =>
    Array.from({ length: N }, () => Array(4).fill(false))
);

let maxLoop = 0;

function isValid(x, y) {
    return x >= 0 && x < M && y >= 0 && y < N;
}

for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
        for (let dir = 0; dir < 4; dir++) {
            if (visited[i][j][dir]) continue;

            let x = i, y = j, d = dir;
            let path = [];

            while (true) {
                if (!isValid(x, y) || visited[x][y][d]) break;

                path.push([x, y, d]);
                visited[x][y][d] = true;

                const cell = grid[x][y];
                if (cell === '/') d = mirrorReflect['/'][d];
                else if (cell === '\\') d = mirrorReflect['\\'][d];

                x += dx[d];
                y += dy[d];

                if (x === i && y === j && d === dir) {
                    maxLoop = Math.max(maxLoop, path.length);
                    break;
                }
            }
        }
    }
}
process.stdout.write(String(maxLoop));
