const canvas = document.getElementById('checkerboard');
const ctx = canvas.getContext('2d');
const blockSize = 80; // size of each block on the checkerboard
const boardSize = 8; // 64x64 board

// Function to draw the checkerboard
function drawCheckerboard() {
    for (let x = 0; x < boardSize; x++) {
        for (let y = 0; y < boardSize; y++) {
            ctx.fillStyle = (x + y) % 2 === 0 ? 'green' : 'lightgreen';
            ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
        }
    }
}

// Function to calculate control points for bezier curve
function calculateControlPoints(startX, startY, endX, endY) {
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    const dx = Math.abs(endX - startX);
    const dy = Math.abs(endY - startY);
    const curveMagnitude = 20; // Adjust as needed for curve size

    // Determine the direction of the curve based on the node positions
    if (Math.abs(dx) > Math.abs(dy)) {
        // Horizontal distance is greater, curve vertically
        const controlY = startY < endY ? midY - curveMagnitude : midY + curveMagnitude;
        return { cx: midX, cy: controlY };
    } else {
        // Vertical distance is greater, curve horizontally
        const controlX = startX < endX ? midX - curveMagnitude : midX + curveMagnitude;
        return { cx: controlX, cy: midY };
    }
}

// Node class
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        // Adjust position to ensure space for 4 blocks
        this.position = {
            x: Math.floor(Math.random() * (boardSize - 4)),
            y: Math.floor(Math.random() * boardSize)
        };
    }
}
// LinkedList class
class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    add(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
        } else {
            this.tail.next = newNode;
        }
        this.tail = newNode;
        this.visualize();
    }

    insertAtStart(data) {
        const newNode = new Node(data);
        newNode.next = this.head;
        this.head = newNode;
        this.visualize();
    }

    deleteNode(key) {
        let temp = this.head, prev = null;
        if (temp !== null && temp.data === key) {
            this.head = temp.next; // The head needs to be changed
            return;
        }
        while (temp !== null && temp.data !== key) {
            prev = temp;
            temp = temp.next;
        }
        if (temp === null) return; // Key was not found
        prev.next = temp.next; // Unlink the node from the list
        this.visualize();
    }

    visualize() {
        drawCheckerboard();
        let current = this.head;
        while (current) {
            // Draw four horizontally adjacent blocks for the node
            for (let i = 0; i < 4; i++) {
                ctx.fillStyle = 'cyan'; // Color for the blocks
                ctx.fillRect((current.position.x + i) * blockSize, current.position.y * blockSize, blockSize, blockSize);
            }

            // Draw the value in the first block
            ctx.fillStyle = 'black';
            ctx.font = 'bold 16px Arial'; // Increased font size and bold weight
            ctx.fillText(current.data, current.position.x * blockSize + 5, current.position.y * blockSize + 15);

            current = current.next;
        }

        // Draw arrows after all nodes to ensure they appear on top
        current = this.head;
        while (current && current.next) {
            const startX = (current.position.x + 3) * blockSize + blockSize / 2; // Middle of the last block of current node
            const startY = current.position.y * blockSize + blockSize / 2;
            const endX = current.next.position.x * blockSize + blockSize / 2; // Middle of the first block of next node
            const endY = current.next.position.y * blockSize + blockSize / 2;

            const { cx, cy } = calculateControlPoints(startX, startY, endX, endY);

            // Arrow line
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.quadraticCurveTo(cx, cy, endX, endY);
            ctx.strokeStyle = 'magenta';
            ctx.lineWidth = 3;
            ctx.stroke();

            // Arrow head
            const headlen = 10; // Length of the head in pixels
            const angle = Math.atan2(endY - startY, endX - startX);
            ctx.beginPath();
            ctx.moveTo(endX, endY);
            ctx.lineTo(endX - headlen * Math.cos(angle - Math.PI / 6), endY - headlen * Math.sin(angle - Math.PI / 6));
            ctx.lineTo(endX - headlen * Math.cos(angle + Math.PI / 6), endY - headlen * Math.sin(angle + Math.PI / 6));
            ctx.lineTo(endX, endY);
            ctx.lineTo(endX - headlen * Math.cos(angle - Math.PI / 6), endY - headlen * Math.sin(angle - Math.PI / 6));
            ctx.strokeStyle = 'magenta';
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.fillStyle = 'magenta';
            ctx.fill();

            current = current.next;
        }
    }
}


let list = new LinkedList();

function createNode() {
    const value = parseInt(document.getElementById('nodeValue').value, 10);
    if (!isNaN(value)) {
        list.add(value);
        list.visualize();
    }
}

function insertNodeAtStart() {
    const value = parseInt(document.getElementById('nodeValue').value, 10);
    if (!isNaN(value)) {
        const newNode = new Node(value);
        newNode.next = list.head;
        list.head = newNode;
        list.visualize();
    }
}

function insertNodeAtEnd() {
    const value = parseInt(document.getElementById('nodeValue').value, 10);
    if (!isNaN(value)) {
        const newNode = new Node(value);
        newNode.next = list.head;
        list.head = newNode;
        list.visualize();
    }
}

function deleteNode() {
    const value = parseInt(document.getElementById('nodeValue').value, 10);
    if (!isNaN(value)) {
        // Assuming deleteNode function is defined in LinkedList to remove a node by value
        list.deleteNode(value);
        list.visualize();
    }
}

function resetList() {
    list = new LinkedList();
    list.visualize();
}