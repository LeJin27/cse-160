
class Camera {
  constructor( ) {
    // our current eye direction
    this.eye = new Vector([0, 0, 3])

    // Direction we want to go
    this.at = new Vector([0, 0, -100])
    // used for corss product to get left and right
    this.up = new Vector([0, 1, 0])
  }

  forward = (speed) => {
    let f = this.at.sub(this.eye);
    f = f.div(f.magnitude());
    f = f.mul(speed)
    this.at = this.at.add(f);
    this.eye = this.eye.add(f);
  }

  backward = (speed) => {
    let f = this.eye.sub(this.at);
    f = f.div(f.magnitude());
    f = f.mul(speed)
    this.at = this.at.add(f);
    this.eye = this.eye.add(f);
  }

  left = (speed) => {
    let f = this.eye.sub(this.at);
    f = f.div(f.magnitude());
    let s = Vector.cross(f, this.up);
    s = s.div(s.magnitude());
    s = s.mul(speed)
    this.at = this.at.add(s);
    this.eye = this.eye.add(s);
  }

  right = (speed) => {
    console.log("Going Right")
    let f = this.at.sub(this.eye);
    f = f.div(f.magnitude());
    let s = Vector.cross(f, this.up);
    s = s.div(s.magnitude());
    s = s.mul(speed)
    this.at = this.at.add(s);
    this.eye = this.eye.add(s);
  }

  rotate = (degrees ) => {
    const radians = degrees * Math.PI / 180;
    // get direction looking at
    let f = this.at.sub(this.eye);

    const x = f.elements[0];
    const y = f.elements[1];
    const z = f.elements[2];

    const cos = Math.cos(radians);
    const sin = Math.sin(radians);

    const rotateX = (x * cos) + (z * sin)
    const rotateY = y;
    const rotateZ = (-x * sin) + (z * cos)

    const rotatedDirection = new Vector([rotateX, rotateY, rotateZ]);

    this.at = this.eye.add(rotatedDirection);

  }
}
