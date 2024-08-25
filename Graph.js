import { Node } from "./Node.js";

// Graph takes a given width and height to construct an array of nodes. By default, a chess board is represented as an 8 x 8 array
export class Graph {
    constructor(width = 8, height = 8) {
        this.width = width;
        this.height = height;
        this.nodesArr = this.buildGraph(this.width, this.height);
    }

    // build the graph, in this case it represents an 8x8 chess board
    buildGraph(width, height) {
        let nodesArr = [];
        for (let i = 0; i < width; i++) {
            nodesArr[i] = [];
            for (let j = 0; j < height; j++) {
                let newNode = new Node([i, j]);
                newNode.neighbors = this.getNeighborsCoords(newNode);
                nodesArr[i][j] = newNode;
            }
        }
        return nodesArr;
    }

    // determine legal moves for a knight starting from a provided node and return an array of those "neighbors"
    getNeighborsCoords(node) {
        let x = node.coords[0];
        let y = node.coords[1];
        let neighbors = [];

        if (this.isInbound(x + 1, y + 2)) {
            neighbors.push([x + 1, y + 2]);
        }
        if (this.isInbound(x + 1, y - 2)) {
            neighbors.push([x + 1, y - 2]);
        }
        if (this.isInbound(x - 1, y + 2)) {
            neighbors.push([x - 1, y + 2]);
        }
        if (this.isInbound(x - 1, y - 2)) {
            neighbors.push([x - 1, y - 2]);
        }
        if (this.isInbound(x + 2, y + 1)) {
            neighbors.push([x + 2, y + 1]);
        }
        if (this.isInbound(x + 2, y - 1)) {
            neighbors.push([x + 2, y - 1]);
        }
        if (this.isInbound(x - 2, y + 1)) {
            neighbors.push([x - 2, y + 1]);
        }
        if (this.isInbound(x - 2, y - 1)) {
            neighbors.push([x - 2, y - 1]);
        }
        return neighbors;
    }

    // helper method to allow only spaces within the chess board
    isInbound(x, y) {
        if (x > -1 && x < this.width && y > -1 && y < this.height) {
            return true;
        } else {
            return false;
        }
    }

    // use a BFS algorithm to determine the shortest possible path for a knight between two spaces of the chess board
    // returns the ending node which contains references to all the preceding nodes along the solution path
    findShortestKnightPath(startCoords, endCoords) {
        if (!this.isInbound(startCoords[0], startCoords[1]) || !this.isInbound(endCoords[0],endCoords[1])) {
            throw new Error("Start and end coordinates must be within the bounds of the graph.")
        }
        this.resetNodes();
        let startNode = this.nodesArr[startCoords[0]][startCoords[1]];
        let q = [startNode]; // initialize a FIFO queue to help process each node in the correct order

        while (q.length > 0) {
            let currentNode = q[0];
    
            if (currentNode.coords[0] === endCoords[0] && currentNode.coords[1] === endCoords[1]) {
                if (currentNode.precedingNode) {
                    currentNode.distance = currentNode.precedingNode.distance + 1;
                } else {
                    currentNode.distance = 0;
                }
                console.log(`You made it from [${startCoords}] to [${endCoords}] in ${currentNode.distance} moves! Here is your path:`)
                console.log(this.pathToString(currentNode));
                return currentNode;
            } else {
                if (currentNode.precedingNode) {
                    currentNode.distance = currentNode.precedingNode.distance + 1;
                } else {
                    currentNode.distance = 0;
                }
            }
            currentNode.neighbors.forEach((neighborCoords) => {
                let neighborNode = this.nodesArr[neighborCoords[0]][neighborCoords[1]]
                if (neighborNode.distance === null) {
                    neighborNode.precedingNode = currentNode;
                    q.push(neighborNode);
                }
            });
            q.shift();
        }
    }

    // helper util to generate a string that describes the path
    pathToString(node) {
        if (node.precedingNode === null) {
            return `[${node.coords}]`;
        } else {
            return this.pathToString(node.precedingNode) + ' --> ' + `[${node.coords}]`;
        }
    }

    // util to reset all nodes distance and preceding nodes to null. useful for running multiple queries on the same graph instance.
    resetNodes() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this.nodesArr[i][j].distance = null;
                this.nodesArr[i][j].precedingNode = null;
            }
        }
    }
}