class Line {
    constructor(startX,startY,endX,endY) {
      this.startX = startX;
      this.startY = startY;
      this.endX = endX;
      this.endY = endY;
    }
    draw() {
      line(this.startX,this.startY,this.endX,this.endY)
    }
  }