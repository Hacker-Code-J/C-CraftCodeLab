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

    add(data) {
        let newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
    }

    delete(data) {
        let current = this.head;
        let previous = null;

        while (current != null) {
            if (current.data === data) {
                if (!previous) {
                    this.head = current.next;
                } else {
                    previous.next = current.next;
                }
                return;
            }
            previous = current;
            current = current.next;
        }
    }

    // Method to visualize the list in a green checkerboard format
    visualize() {
        let current = this.head;
        let visualizationHtml = '<div class="linked-list">';

        while (current) {
            visualizationHtml += `<div class="node">
                                      <span class="data">Data: ${current.data}</span>
                                      <span class="next">Next: ${current.next ? 'Address' : 'null'}</span>
                                   </div>`;
            current = current.next;
        }

        visualizationHtml += '</div>';
        document.getElementById('linkedListVisualization').innerHTML = visualizationHtml;
    }
}

let list = new LinkedList();

function addNode() {
    let value = parseInt(document.getElementById('nodeValue').value, 10);
    if (!isNaN(value)) {
        list.add(value);
        list.visualize();
    }
}

function deleteNode() {
    let value = parseInt(document.getElementById('nodeValue').value, 10);
    if (!isNaN(value)) {
        list.delete(value);
        list.visualize();
    }
}

// Initial visualization
list.visualize();