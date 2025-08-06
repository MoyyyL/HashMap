class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    append(value) {
        if (this.head === null) {
            this.head = new Node();
            this.head.value = value;
            this.tail = this.head;
        } else {
            const newNode = new Node();
            newNode.value = value;

            this.tail.nextNode = newNode;
            this.tail = this.tail.nextNode;
        }
    }

    prepend(value) {
        if (this.head === null) {
            this.head = new Node();
            this.head.value = value;
            this.tail = this.head;
        } else {
            const temp = this.head;
            this.head = new Node();
            this.head.value = value;
            this.head.nextNode = temp;
        }
    }

    size() {
        if (this.head === null) return 0;
        else {
            const explorer = function (node) {
                if (node.nextNode === null) return 1;
                else {
                    node = node.nextNode;
                    return 1 + explorer(node);
                }
            };

            return explorer(this.head);
        }
    }

    getHead() {
        return this.head;
    }

    getTail() {
        return this.tail;
    }

    at(index) {
        if (index < 0) return null;
        else if (this.head === null) return null;
        let pointer = this.head;

        for (let counter = 0; counter < index; counter++) {
            pointer = pointer.nextNode;
            if (pointer === null) return null;
        }

        return pointer;
    }

    pop() {
        if (this.head === null) return null;
        else if (this.head.nextNode === null) {
            const temp = this.tail;
            this.head = null;
            this.tail = null;
            return temp;
        } else {
            let current = this.head;
            while (true) {
                if (current.nextNode === this.tail) {
                    const temp = this.tail;
                    current.nextNode = null;
                    this.tail = current;

                    return temp;
                } else {
                    current = current.nextNode;
                }
            }
        }
    }

    contains(value) {
        if (this.head === null) return false;
        else {
            let current = this.head;
            let counter = 0;

            while (true) {
                if (current.value[0] === value) return true;
                else if (current.nextNode === null) return false;
                else {
                    current = current.nextNode;
                    counter++;
                }
            }
        }
    }

    find(value) {
        if (this.head === null) return null;
        else {
            let current = this.head;
            let counter = 0;

            while (true) {
                if (current.value[0] === value) return counter; //! ----
                else if (current.nextNode === null) return null;
                else {
                    current = current.nextNode;
                    counter++;
                }
            }
        }
    }

    toString() {
        if (this.head === null) console.log("null");
        else {
            let current = this.head;
            let message = ``;

            while (true) {
                let valueMessage = `(${current.value}) -> `;
                message += valueMessage;

                if (current.nextNode === null) {
                    message += `null`;
                    break;
                } else {
                    current = current.nextNode;
                }
            }

            return message;
        }
    }

    getValues() {
        if (this.head === null) return null;
        else {
            const arr = [];
            let current = this.head;

            while (true) {
                arr.push(current.value);

                if (current.nextNode === null) {
                    break;
                } else {
                    current = current.nextNode;
                }
            }

            return arr;
        }
    }

    delete(value) {
        if (this.head === null) return false;
        else if (this.head.nextNode === null) {
            this.pop();
            return true;
        } else if (this.tail.value[0] === value) {
            this.pop();
            return true;
        } else if (this.head.value[0] === value) {
            this.head = this.head.nextNode;
            return true;
        } else {
            let before, after;
            let current = this.head;

            while (true) {
                if (current.value[0] === value) {
                    before.nextNode = after;
                    return true;
                }

                before = current;
                current = current.nextNode;
                after = current.nextNode;
            }
        }
    }
}

class Node {
    constructor() {
        this.value = null;
        this.nextNode = null;
    }
}

export { LinkedList };
