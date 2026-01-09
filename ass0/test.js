const fs = require("fs");
const vm = require("vm");

const code = fs.readFileSync("./lib/cuon-matrix-cse160.js", "utf8");
vm.runInThisContext(code);


const vec1 = new Vector3([3,4,0])
const vec2 = new Vector3([1,2,0])

const dotVec = Vector3.dot(vec1,vec2);

console.log(dotVec)