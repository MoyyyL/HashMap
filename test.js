import { HashMap } from "./hash.js";

const test = new HashMap(); // or HashMap() if using a factory

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

test.set("moon", "silver");

const one = test.get("moon");
console.log(one);

const two = test.has("moon");
console.log(two);

const three = test.remove("kite");
console.log(three);

const four = test.length();
console.log(four);
