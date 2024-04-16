const fs = require('fs');

// Функція для зчитування графу з файлу
function readGraphFromFile(filename) {
    const data = fs.readFileSync(filename, 'utf8');
    const lines = data.trim().split('\n');
    const vertices = parseInt(lines[0]);
    const edges = parseInt(lines[1]);

    let adjacencyList = Array.from({ length: vertices }, () => []);
    for (let i = 2; i < edges + 2; i++) {
        const [start, end] = lines[i].trim().split(' ').map(Number);
        adjacencyList[start - 1].push(end - 1); // Виправлення налаштувань індексування
    }

    return adjacencyList;
}

// Функція для обходу графу пошуком углиб
function DFS(graph, startVertex) {
    let visited = Array(graph.length).fill(false);
    let stack = [];
    let protocol = [];

    stack.push(startVertex);

    while (stack.length) {
        let currentVertex = stack.pop();
        if (!visited[currentVertex]) {
            visited[currentVertex] = true;
            protocol.push({
                vertex: currentVertex,
                dfsNumber: protocol.length + 1,
                stackContents: [...stack]
            });
            for (let neighbor of graph[currentVertex]) {
                if (!visited[neighbor]) {
                    stack.push(neighbor);
                }
            }
        }
    }

    return protocol;
}

// Головна функція
function main() {
    const graph = readGraphFromFile('PDC.txt');
    const startVertex = 0; // Початкова вершина для обходу

    const protocol = DFS(graph, startVertex);

    console.log('Протокол обходу:');
    console.log('Вершина\tDFS-номер\tВміст стеку');
    for (let entry of protocol) {
        console.log(`${entry.vertex}\t${entry.dfsNumber}\t\t${entry.stackContents.join(', ')}`);
    }
}

// Виклик головної функції
main();
