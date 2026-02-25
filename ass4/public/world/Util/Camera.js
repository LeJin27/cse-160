class Camera {
  constructor() {
    // our current eye direction
    this.eye = new Vector([0, 0, 3]);

    // Direction we want to go
    this.at = new Vector([0, 0, -100]);
    // used for corss product to get left and right
    this.up = new Vector([0, 1, 0]);

    this.currentX = 0;
    this.currentY = 0;
  }

  ascend = (speed) => {
    let f = new Vector([0, 1, 0]);
    f = f.div(f.magnitude());
    f = f.mul(speed);
    this.currentY += speed;
    console.log(this.currentY);
    this.at = this.at.add(f);
    this.eye = this.eye.add(f);
  };
  descend = (speed) => {
    let f = new Vector([0, 1, 0]);
    f = f.div(f.magnitude());
    f = f.mul(speed);
    this.currentY -= speed;
    console.log(this.currentY);
    this.at = this.at.sub(f);
    this.eye = this.eye.sub(f);
  };

  forward = (speed) => {
    let f = this.at.sub(this.eye);
    f = f.div(f.magnitude());
    f = f.mul(speed);
    this.at = this.at.add(f);
    this.eye = this.eye.add(f);
  };

  backward = (speed) => {
    let f = this.eye.sub(this.at);
    f = f.div(f.magnitude());
    f = f.mul(speed);
    this.at = this.at.add(f);
    this.eye = this.eye.add(f);
  };

  left = (speed) => {
    let f = this.eye.sub(this.at);
    f = f.div(f.magnitude());
    let s = Vector.cross(f, this.up);
    s = s.div(s.magnitude());
    s = s.mul(speed);
    this.at = this.at.add(s);
    this.eye = this.eye.add(s);
  };

  right = (speed) => {
    console.log("Going Right");
    let f = this.at.sub(this.eye);
    f = f.div(f.magnitude());
    let s = Vector.cross(f, this.up);
    s = s.div(s.magnitude());
    s = s.mul(speed);
    this.at = this.at.add(s);
    this.eye = this.eye.add(s);
  };

  rotate = (degrees) => {
    const radians = (degrees * Math.PI) / 180;
    // get direction looking at
    let f = this.at.sub(this.eye);

    const x = f.elements[0];
    const y = f.elements[1];
    const z = f.elements[2];

    const cos = Math.cos(radians);
    const sin = Math.sin(radians);

    const rotateX = x * cos + z * sin;
    const rotateY = y;
    const rotateZ = -x * sin + z * cos;

    const rotatedDirection = new Vector([rotateX, rotateY, rotateZ]);

    this.at = this.eye.add(rotatedDirection);
  };
  rotateY = (degrees) => {
    const radians = (degrees * Math.PI) / 180;
    // get direction looking at
    let f = this.at.sub(this.eye);

    const x = f.elements[0];
    const y = f.elements[1];
    const z = f.elements[2];

    const cos = Math.cos(radians);
    const sin = Math.sin(radians);

    const rotateX = x;
    const rotateY = y * cos - z * sin;
    const rotateZ = y * sin + z * cos;

    const rotatedDirection = new Vector([rotateX, rotateY, rotateZ]);

    this.at = this.eye.add(rotatedDirection);
  };

  pitch = (degrees) => {
    const radians = (degrees * Math.PI) / 180;
    // forward direction
    let f = this.at.sub(this.eye);
    f = f.div(f.magnitude());

    // camera local right axis
    let right = Vector.cross(f, this.up);
    right = right.div(right.magnitude());

    const cos = Math.cos(radians);
    const sin = Math.sin(radians);

    // Rodrigues' rotation: v' = v*cos + (k×v)*sin + k*(k·v)*(1-cos)
    const v = f;
    const k = right;

    const kCrossV = Vector.cross(k, v);
    const kDotV = Vector.dot(k, v);

    const term1 = v.mul(cos);
    const term2 = kCrossV.mul(sin);
    const term3 = k.mul(kDotV * (1 - cos));

    const rotated = term1.add(term2).add(term3);

    this.at = this.eye.add(rotated);
  };
}
