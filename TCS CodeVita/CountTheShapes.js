const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

const n = parseInt(input[0]);
const segments = input.slice(1, n + 1).map(line => {
    const [x1, y1, x2, y2] = line.split(' ').map(Number);
    return [[x1, y1], [x2, y2]];
});

const graph = new Map();

function addEdge(p1, p2) {
    const key1 = p1.join(',');
    const key2 = p2.join(',');

    if (!graph.has(key1)) graph.set(key1, []);
    if (!graph.has(key2)) graph.set(key2, []);

    graph.get(key1).push(key2);
    graph.get(key2).push(key1);
}

for (const [p1, p2] of segments) {
    addEdge(p1, p2);
}

const visited = new Set();

function dfs(node) {
    const stack = [node];
    const nodes = new Set();
    let edgeCount = 0;

    while (stack.length) {
        const curr = stack.pop();
        if (visited.has(curr)) continue;
        visited.add(curr);
        nodes.add(curr);

        for (const neighbor of graph.get(curr)) {
            edgeCount++;
            if (!visited.has(neighbor)) {
                stack.push(neighbor);
            }
        }
    }

    return { nodes: nodes.size, edges: edgeCount / 2 }; // Each edge counted twice
}

let closedFigures = 0;

for (const node of graph.keys()) {
    if (!visited.has(node)) {
        const { nodes, edges } = dfs(node);
        if (nodes === edges) closedFigures++;
    }
}

process.stdout.write(String(closedFigures));
