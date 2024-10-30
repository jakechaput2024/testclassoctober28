class Circle {
    constructor(d) {
      this.place(random(width),random(height));
      this.diameter = d;
    }
    place(x,y) {
      this.x = x;
      this.y = y;
    }
    draw(){
      circle(this.x, this.y, this.diameter);
    }
  }