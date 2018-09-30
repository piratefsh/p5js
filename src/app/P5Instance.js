import P5 from 'p5';
import Lissajous from 'components/Lissajous';
import setup from './setup';

const { addUtilityFunctions, addCoreFunctions } = setup;
// constants
const rows = 50;
const cols = 50;
const rowSize = 10;
const colSize = 10;
const width = cols * colSize;
const height = rows * rowSize;

let lis;

const sketch = (p) => {
  function setup() {
    p.createCanvas(width, height);
    p.background('#fefee');
    // p.noLoop();

    lis = new Lissajous({
      p5: p,
      width: p.width,
      height: p.height,
    });
  }

  function draw() {
    lis.draw();
  }

  addCoreFunctions(p, { draw, setup });
  addUtilityFunctions(p);
};

// set global functions for p5
const p = new P5(sketch);
export default { p };
