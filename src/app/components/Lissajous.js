import shapes from './Shapes';

const { triangle } = shapes;

export default class Lissajous {
  constructor({
    p5, width, height, gutter = 20,
  }) {
    Object.assign(this,
      {
        p5,
        width,
        height,
        gutter: 20,
        t: 0,
        xRatio: 3 + 0.002,
        yRatio: 5 + 0.002,
        ampX: width / 2 - gutter,
        ampY: height / 2 - gutter,
        step: 0.008,
        bgColor: p5.color(0),
        velocity: { min: 0.012, max: 0.018 },
        pointSize: { min: 5, max: 120 },
      });
  }

  draw() {
    const { p5, pointSize } = this;
    // this.t = this.velocity.min;
    p5.translate(this.width / 2, this.height / 2);

    p5.stroke(255, 100);
    p5.fill(0, 0);

    // this.p5.blendMode(this.p5.DIFFERENCE);
    p5.background(this.bgColor);
    let velocity = 0.1;

    for (let i = 0; i < Math.PI / 2; i += velocity) {
      const dotSize = (Math.sin(i) * (pointSize.max - pointSize.min)) + pointSize.min;
      velocity = this.velocity.min;
      const x = this.ampX * Math.sin((this.t + i) * this.xRatio);
      const y = this.ampY * Math.cos((this.t + i) * this.yRatio);
      triangle(p5, { x, y }, dotSize);
    }
    this.t += this.velocity.min;
    this.p5.blendMode(this.p5.BLEND);
  }
}
