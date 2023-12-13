// script.js
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    insertAtStart(data) {
        const newNode = new Node(data);
        newNode.next = this.head;
        this.head = newNode;
        this.updateVisualization();
    }

    insertAtEnd(data) {
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
        this.updateVisualization();
    }

    deleteNode(data) {
        let current = this.head;
        let prev = null;

        while (current && current.data !== data) {
            prev = current;
            current = current.next;
        }

        if (!current) return;

        if (!prev) {
            this.head = current.next;
        } else {
            prev.next = current.next;
        }
        this.updateVisualization();
    }

    updateVisualization() {
        // Data preparation
        let data = [];
        let current = this.head;
        while (current != null) {
            data.push(current.data);
            current = current.next;
        }

        // Select the SVG container
        const svg = d3.select("#linked-list svg");
        const nodeRadius = 20;
        const nodeSpacing = 50;

        // Bind data to circles
        const nodes = svg.selectAll("circle").data(data);
        
        // Enter new nodes
        nodes.enter().append("circle")
            .attr("r", nodeRadius)
            .attr("cx", (d, i) => i * nodeSpacing + nodeRadius)
            .attr("cy", nodeRadius)
            .style("fill", "lightblue")
            .style("stroke", "black");

        // Update existing nodes
        nodes.attr("cx", (d, i) => i * nodeSpacing + nodeRadius);

        // Remove old nodes
        nodes.exit().remove();

        // Bind data to lines (for next pointers)
        const links = svg.selectAll("line").data(data.slice(0, -1));
        
        // Enter new lines
        links.enter().append("line")
            .attr("x1", (d, i) => i * nodeSpacing + nodeRadius * 2)
            .attr("y1", nodeRadius)
            .attr("x2", (d, i) => (i + 1) * nodeSpacing)
            .attr("y2", nodeRadius)
            .style("stroke", "black");

        // Update existing lines
        links.attr("x2", (d, i) => (i + 1) * nodeSpacing);

        // Remove old lines
        links.exit().remove();
    }
}

// Instantiate the linked list
const list = new LinkedList();

// Event listeners for buttons
document.getElementById('insert-start').addEventListener('click', () => openModal('insertAtStart'));
document.getElementById('insert-end').addEventListener('click', () => openModal('insertAtEnd'));
document.getElementById('delete-node').addEventListener('click', () => openModal('deleteNode'));

// Handle modal interactions
function openModal(action) {
    const modal = document.getElementById('data-input-modal');
    modal.style.display = 'block';

    document.getElementById('submit-data').onclick = function() {
        const data = parseInt(document.getElementById('node-data').value);
        if (!isNaN(data)) {
            list[action](data);
        }
        modal.style.display = 'none';
    };
}

// Close modal on click outside
window.onclick = function(event) {
    const modal = document.getElementById('data-input-modal');
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// Close modal on close button click
document.getElementsByClassName("close-button")[0].onclick = function() {
    document.getElementById('data-input-modal').style.display = "none";
}