// just for testing if my functions without running the html

const fs = require("fs");
const vm = require("vm");

const code = fs.readFileSync("./lib/cuon-matrix-cse160.js", "utf8");
vm.runInThisContext(code);



const vect1 = new Vector3([1000, 432, -56.3])
const vect2 = new Vector3([-999, 23, 0])
vect1.add(vect2)
let v = vect1.elements
console.log(v)


///Vector3.cross(vector1, vector2)

