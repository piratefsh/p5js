import P5 from 'p5';
import ParametricPatterns from 'components/ParametricPatterns';

// constants
const rows = 50;
const cols = 80;
const rowSize = 10;
const colSize = 10;
const width = cols * colSize;
const height = rows * rowSize;

const sketch = (p) => {
  function setup() {
    p.createCanvas(width, height);
    p.background('#fefee');
    p.noLoop();
  }

  function array1(x, y) {
    const ringSize = 55;
    if (x <= width/2 && p.dist(x, y, 0, 0) % (ringSize * 2) < ringSize)
    {
      p.text('O', x, y);
    }

    if (x > width/2 && p.dist(x, y, width, height) % (ringSize * 2) > ringSize)
    {
      p.text('+', x, y);
    }
  }

  function array2(x, y) {
    if (x > p.width / 2) {
      p.text("'", x, y);
    } else {
      p.text('.', x, y);
    }
  }

  function draw() {
    p.textSize(12);
    p.textFont('Courier New');
    p.fill(0, 220);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * colSize;
        const y = j * rowSize;

        array1(x, y);
        array2(x, y);
      }
    }
  }

  p.draw = draw;
  p.setup = setup;

  p.saveImg = () => {
    p.save(`tadaaa-${Date.now()}.png`);
  };

  p.keyPressed = () => {
    switch (p.key) {
      case 'S':
        p.saveImg();
        break;
      case 'E':
        p.reset();
        break;
      default:
        return false;
    }
  };
};

// set global functions for p5
const p = new P5(sketch);
export default { p };
