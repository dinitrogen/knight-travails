# Knight Travails
This program determines the shortest possible path for a knight piece to move from one space to another on the chess board.

This app uses an undirected graph data structure, built as a javascript class, to represent the chess board. Each space is represented by a node (or vertex) that stores its coordinates, and also those of its "neighbor" nodes that are one legal knight move away. Each legal move between two nodes represents an edge of the graph.

A BFS (breadth first search) algorithm is then applied to traverse the graph, determining the path with the fewest moves to reach the target coordinates. Time complexity for this type of search is O(n) where n is the number of edges in the graph (there are more edges than nodes in this case).

![chess board](./img/knight-travails.png)

## Usage

### 1. Import Graph class and create instance of chessboard/graph

```
import { Graph } from "./Graph.js";
const chessboard = new Graph();
```

By default, the graph will be created with width = 8 and height = 8 (64 spaces), but you can also create a board of custom width and height:

```
// creates a board with width = 10 and height = 8
const chessboard = new Graph(10, 8);
```

### 2. Call `findShortestKnightPath` to find the shortest path for a knight between two spaces, represented as coordinates (see image of board above):

- Example 1:
```
chessboard.findShortestKnightPath([3,3], [3,4]);
// outputs: You made it from [3,3] to [3,4] in 3 moves! Here is your path: [3,3] --> [1,4] --> [2,2] --> [3,4]
```

- Example 2:
```
chessboard.findShortestKnightPath([0,0], [7,7]);
// outputs: You made it from [0,0] to [7,7] in 6 moves! Here is your path: [0,0] --> [2,1] --> [0,2] --> [2,3] --> [4,4] --> [6,5] --> [7,7]
```

- Example 3:
```
chessboard.findShortestKnightPath([1,1], [1,1]);
// outputs: You made it from [1,1] to [1,1] in 0 moves! Here is your path: [1,1]
```

### 3. If an invalid set of coordinates is provided (i.e. outside the bounds of the board), an error will be thrown:

```
chessboard.findShortestKnightPath([5,6], [7,8]);
// outputs: Error("Start and end coordinates must be within the bounds of the graph.")
```


