class Vector {
    constructor(opt_src) {
        var v = new Float32Array(3);
        if (opt_src && typeof opt_src === 'object') {
          v[0] = opt_src[0];
          v[1] = opt_src[1];
          v[2] = opt_src[2];
        }
        this.elements = v;
    }

    /**
     * Copy vector.
     * @param src source vector
     * @return this
     */
    set(src) {
        var i, s, d;

        s = src.elements;
        d = this.elements;

        if (s === d) {
          return;
        }

        for (i = 0; i < 3; ++i) {
          d[i] = s[i];
        }

        return this;
    }

    /**
      * Add other to this vector.
      * @return this
      */
    add(other) {
        // Insert your code here.
        // This function should change this vector (this.elements) and not create a new vector.
        // Don't delete the return statement.
        const otherElements = other.elements
        const output = new Vector(this.elements.map((value, index) => value + otherElements[index]))
        return output;
    };

    /**
      * Subtract other from this vector.
      * @return this
      */
    sub(other) {
        // Insert your code here.
        // This function should change this vector (this.elements) and not create a new vector.

        // Don't delete the return statement.
        const otherElements = other.elements
        const output = new Vector(this.elements.map((value, index) => value - otherElements[index]))
        return output;
    };

    /**
      * Divide this vector by a scalar.
      * @return this
      */
    div(scalar) {
        // Insert your code here.
        // This function should change this vector (this.elements) and not create a new vector.

        // Don't delete the return statement.
        const output = new Vector(this.elements = this.elements.map((value) => value / scalar))
        return output;
    };

    /**
      * Multiply this vector by a scalar.
      * @return this
      */
    mul(scalar) {
        // Insert your code here.
        // This function should change this vector (this.elements) and not create a new vector.

        // Don't delete the return statement.
        const output = new Vector(this.elements.map((value) => value * scalar))
        return output;
    };

    /**
      * Calcualte the dop product between this vector and other.
      * @return scalar
      */
    static dot(other1, other2) {
        // Insert your code here.
        let d = 0; // Modify this line to calculate this vector's magnitude.
        const other1Elements = other1.elements;
        const other2Elements = other2.elements;

        const multipliedVector = other1Elements.map((value, index) => value * other2Elements[index])
        const dotSum = multipliedVector.reduce((total, current) => total + current, 0)

        // Don't delete the return statement.
        return dotSum;
    }

    /**
      * Calcualte the cross product between this vector and other.
      * @return new vector
      */
    static cross(other1, other2) {
        // Insert your code here.
        // This function should create and return a new vector.

        // [0, 1, 2]
        const v1 = other1.elements
        
        // [0, 1, 2]
        const v2 = other2.elements

        const i = (v1[1] * v2[2]) - (v2[1] * v1[2])
        const j = (v1[0] * v2[2]) - (v2[0] * v1[2])
        const k = (v1[0] * v2[1]) - (v2[0] * v1[1])
        const v3 = new Vector([i, -j, k])
        // Don't delete the return statement.
        return v3;
    }

    /**
      * Calculate the magnitude (or length) of this vector.
      * @return scalar
      */
    magnitude() {
        // Insert your code here.
        let m = 0; // Modify this line to calculate this vector's magnitude.
        const elements = this.elements

        const sumSquare =  elements.reduce((total, current) => total + Math.pow(current, 2), 0)
        const magnitude = Math.sqrt(sumSquare)

        // Don't delete the return statement.
        return magnitude;
    };

    /**
      * Normalize this vector.
      * @return this
      */
    normalize() {
        // Insert your code here.
        // This function should change this vector (this.elements) and not create a new vector.

        const magnitude = this.magnitude();
        this.elements = this.elements.map((value) => value / magnitude)
        // Don't delete the return statement.
        return this;
    };
}

/*
const test1 = new Vector3([1, 2, 3]);
const test2 = new Vector3([1, 4, 3]);

const test3 = test1.add(test2);
console.log(test1.elements)
console.log(test2.elements)
console.log(test3.length())

*/
//const test1 = new Vector([1, 2, 3]);
//test1.elements[0] = 4;
//console.log(test1)
