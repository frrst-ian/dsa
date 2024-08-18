// linkedList.js

class Node {
    constructor(value = null) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    append(value) {
        let newNode = new Node(value);
        if (this.head == null) {
            this.head = newNode;
        } else {
            let currentNode = this.head;
            while (currentNode.next != null) {
                currentNode = currentNode.next;
            }
            currentNode.next = newNode;
        }
    }

    toString() {
        let returnString = '';
        let currentNode = this.head;
        while (currentNode != null) {
            returnString += `(${currentNode.value}) -> `;
            currentNode = currentNode.next;
        }
        return `${returnString}null`;
    }
}

module.exports = { LinkedList };
