import Util from 'components/utils/Utils';
export default class ParametricPatterns {
  constructor(props) {
    this.p5 = props.p5;
    this.fillOpacity = 15;
    this.props = props;
    this.padding = 100;
    this.seed = props.seed;
    this.strokeWeight = 2;
    this.strokeOpacity = 1;
    this.width = (props.width || this.p5.width) - this.padding;
    this.height = (props.height || this.p5.height) - this.padding;
    this.speed = 0.01;
    this.t = 0;
    this.numLines = props.numLines || 80;
    this.color = props.color || [100, 100, 100];
    this.color2 = props.color2 || props.color;
    this.randVar = this.p5.random(0, this.seed);
    this.spacing = 0.02;
    this.amp = props.amp || 1;
    this.dir = Math.pow(-1, props.amp * 10);
    this.colorsUpdated = false;
    this.fillColors = [];

    this.util = new Util(this.p5);

    this.reset();
  }

  genFillColors() {
    this.colorsUpdated = true;
    this.fillColors = [];
    for (let i = 0; i < this.numLines; i++) {
      const col = [
        this.p5.map(i, 0, this.numLines, this.color2[0], this.color[0]),
        this.p5.map(i, 0, this.numLines, this.color2[1], this.color[1]),
        this.p5.map(i, 0, this.numLines, this.color2[2], this.color[2]),
      ];
      this.fillColors.push(this.p5.color(...col, this.fillOpacity));
    }
  }

  reset() {
    this.t = Math.floor(this.p5.random(8)) * this.p5.PI / 2;
    this.randVar = this.p5.random(0, this.seed);
    this.x2 = this.util.generateParametricEqn(this.width / 4);
    this.y2 = this.util.generateParametricEqn(this.height / 4);

    this.genFillColors();
  }

  draw() {
    if (this.fillColors.length < 1 || !this.colorsUpdated) {
    }
    this.genFillColors();
    const debug = false;
    this.p5.push();
    this.p5.strokeWeight(this.strokeWeight);
    this.p5.curveTightness(4);
    this.p5.stroke(0, 0);

    this.p5.translate(this.props.x + this.padding / 2, this.props.y + this.padding / 2);
    this.p5.translate(this.width / 2, this.height / 2);
    const count = this.numLines * this.spacing;
    let n = 0;
    for (let i = 0; i < count; i += this.spacing) {
      const t = this.t + i;
      const color = this.fillColors[n];
      // this.p5.fill(0, 0,0,0);

      if (this.strokeOpacity > 0) {
        this.p5.stroke(color, this.p5.map(i, 0, count, 0, this.strokeOpacity));
      }
      const points = [this.cx1(t), this.cy1(t), this.x1(t), this.y1(t), this.x2(t), this.y2(t), this.cx2(t), this.cy2(t)]
        .map(pt => pt * this.amp);
      this.p5.curve(...points);
      // console.log('calc', this.x2(t), this.y2(t));

      if (debug) {
        this.p5.ellipse(this.x1(t), this.y1(t), 10, 10);
        this.p5.ellipse(this.cx1(t), this.cy1(t), 5, 5);
        this.p5.ellipse(this.x2(t), this.y2(t), 10, 10);
        this.p5.ellipse(this.cx2(t), this.cy2(t), 5, 5);
      }

      n++;
    }
    this.p5.pop();
  }

  update() {
    this.t = (this.t + this.speed);
  }

  x1(t) {
    return this.width / 2 * this.p5.sin(t / 2);
  }

  y1(t) {
    return this.height / 2 * this.p5.cos(t / 2);
  }


  // not used anymore since is generated
  // x2(t) {
  //   return this.amp * Math.pow(-1, Math.floor(this.randVar)) * this.width * this.p5.cos(t / 3);
  // }

  // y2(t) {
  //   return this.dir * this.amp * this.randVar * this.height/3 * this.p5.sin(t / 2);
  // }

  cx1(t) {
    return this.width / 2 * this.p5.cos(t);
  }

  cy1(t) {
    return this.height / 2 * this.p5.sin(t);
  }

  cx2(t) {
    return -this.width / 2 * this.p5.sin(t / 2);
  }

  cy2(t) {
    return -this.height / 2 * this.p5.cos(t);
  }
}


ParametricPatterns.X1_FREQ = 50;
ParametricPatterns.Y1_FREQ = 7;
ParametricPatterns.X2_FREQ = 90;
ParametricPatterns.Y2_FREQ = 5;
ParametricPatterns.X1_AMP = 20;
ParametricPatterns.Y1_AMP = 100;
ParametricPatterns.X2_AMP = 7;
ParametricPatterns.Y2_AMP = 300;
