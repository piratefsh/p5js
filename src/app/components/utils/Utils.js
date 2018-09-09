export default class Util {
  constructor(p) {
    this.p5 = p;
    this.x = 0;
    this.y = 0;
  }

  randomPoint() {
    const w = Math.trunc(this.p5.random(this.p5.width));
    const h = Math.trunc(this.p5.random(this.p5.height));
    return this.p5.createVector(w, h);
  }

  // is point x, y on canvas?
  inCanvas(x, y) {
    return x < this.p5.width && x > 0
      && y < this.p5.height && y > 0;
  }

  trigHeight(width, hypotenuse) {
    return Math.sqrt((hypotenuse * hypotenuse) - (width * width));
  }

  randomise(opacity) {
    return this.p5.random(0, 2) < 0.4;
  }

  // given len of edge, what radius to rotate at to draw shape?
  rotationRadius(edgeLen, sides) {
    const angle = Math.PI * 2 / sides;
    return edgeLen / Math.sin(angle) * Math.sin((this.p5.TWO_PI - angle) / 2);
  }

  distort(v) {
    v.x += this.p5.map(this.p5.noise(v.x + this.x++), 0, 1, -2, 2);
    v.y += this.p5.map(this.p5.noise(v.y + this.x++), 0, 1, -2, 2);
    return v;
  }

  midpoint(a, b) {
    return this.p5.createVector((a.x + b.x) / 2, (a.y + b.y) / 2);
  }

  generateParametricEqn(amp = 1, maxFreqDenom = 3) {
    const trigFuncs = ['Math.sin', 'Math.cos'];
    const numTerms = 1 + Math.floor(Math.random() * 2);
    const expressions = [];
    for (let i = 0; i < numTerms; i++) {
      const trig = this.p5.random(trigFuncs);
      const freq = 1 + Math.random() * (maxFreqDenom - 1);
      const expr = `${amp} * ${trig}(t/${freq})`;
      expressions.push(expr);
    }
    const params = ['t'];
    const body = `return (${expressions.join('+')});`;
    return new Function(...params, body);
  }
}
