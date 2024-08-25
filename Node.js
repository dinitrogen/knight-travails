export class Node {
    constructor(coords) {
        this.coords = coords; // eg. [0, 1]
        this.precedingNode = null; // previously visited node
        this.distance = null; // number of moves away from the starting point
        this.neighbors = []; // list of neighbors' coordinates eg. [[1, 3], [2, 2]]
    }
}