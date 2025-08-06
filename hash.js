import { LinkedList } from "./lnkedList.js";

class HashMap {
    constructor() {
        this.capacity = 16;
        this.loadFactor = 0.75;

        this.storage = new Array(this.capacity);
        this.entrys = 0;

        for (let i = 0; i < this.storage.length; i++) {
            this.storage[i] = new LinkedList();
        }
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode =
                (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    }

    set(key, value) {
        const hashCode = this.hash(key);
        const bucket = this.storage.at(hashCode);

        this.insertInBucket(bucket, key, value);

        if (this.entrys / this.capacity > this.loadFactor) this.resize();
    }

    insertInBucket(bucket, key, value) {
        const idx = bucket.find(key);
        if (idx != null) {
            const data = bucket.at(idx);
            data.value[1] = value;
        } else {
            bucket.append([key, value]);
            this.entrys++;
        }
    }

    resize() {
        this.entrys = 0;

        const temp = this.storage;
        this.capacity = this.capacity * 2;
        this.storage = new Array(this.capacity);

        for (let i = 0; i < this.capacity; i++) {
            this.storage[i] = new LinkedList();
        }

        for (let j = 0; j < temp.length; j++) {
            const head = temp[j].head;
            if (head === null) continue;

            let node = head;
            while (node !== null) {
                const [key, value] = node.value;

                const hashCode = this.hash(key);
                const bucket = this.storage.at(hashCode);

                this.insertInBucket(bucket, key, value);

                node = node.nextNode;
            }
        }
    }

    get(key) {
        const hashCode = this.hash(key);
        const bucket = this.storage.at(hashCode);

        const idx = bucket.find(key);
        if (idx === null || bucket.head === null) return null;

        const val = bucket.at(idx);
        return val.value[1];
    }

    has(key) {
        const hashCode = this.hash(key);
        const bucket = this.storage.at(hashCode);

        return bucket.contains(key);
    }

    remove(key) {
        const hashCode = this.hash(key);
        const bucket = this.storage.at(hashCode);

        if (bucket.delete(key)) {
            this.entrys--;
            return true;
        } else return false;
    }

    length() {
        return this.entrys;
    }

    clear() {
        this.entrys = 0;
        for (let i = 0; i < this.capacity; i++) {
            this.storage[i] = new LinkedList();
        }
    }

    keys() {
        const arrKeys = [];
        for (let i = 0; i < this.capacity; i++) {
            const values = this.storage[i].getValues() || [];

            for (let j = 0; j < values.length; j++) {
                const key = values[j][0];
                arrKeys.push(key);
            }
        }

        return arrKeys;
    }

    values() {
        const arrValues = [];
        for (let i = 0; i < this.capacity; i++) {
            const data = this.storage[i].getValues() || [];

            for (let j = 0; j < data.length; j++) {
                const val = data[j][1];
                arrValues.push(val);
            }
        }

        return arrValues;
    }

    entries() {
        const arrEntries = [];
        for (let i = 0; i < this.capacity; i++) {
            const data = this.storage[i].getValues() || [];

            for (let j = 0; j < data.length; j++) {
                const keyValue = data[j];
                arrEntries.push(keyValue);
            }
        }

        return arrEntries;
    }
}

export { HashMap };
