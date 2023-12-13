class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.memoryCells = [];
        this.arrowX = 50;
        this.cellWidth = 60;
        this.cellHeight = 40;
        this.arrowSpacing = 20;
    }

    append(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.visualize();
    }

    visualize() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let current = this.head;
        let cellX = this.arrowX;
        while (current) {
            // Draw memory cell
            this.ctx.fillStyle = "#3498db";
            this.ctx.fillRect(cellX, 50, this.cellWidth, this.cellHeight);
            this.memoryCells.push({ x: cellX, y: 50 });

            // Draw arrow
            if (current.next) {
                this.drawArrow(cellX + this.cellWidth + this.arrowSpacing, 70, this.arrowSpacing - 10);
            }

            // Draw data inside cell
            this.ctx.fillStyle = "white";
            this.ctx.font = "16px Arial";
            this.ctx.fillText(current.data, cellX + 20, 75);

            cellX += this.cellWidth + this.arrowSpacing;
            current = current.next;
        }
    }

    drawArrow(x, y, length) {
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + length, y - 10);
        this.ctx.lineTo(x + length, y + 10);
        this.ctx.closePath();
        this.ctx.fillStyle = "#3498db";
        this.ctx.fill();
    }
}

const linkedList = new LinkedList();
linkedList.append(10);
linkedList.append(20);
linkedList.append(30);
linkedList.append(40);