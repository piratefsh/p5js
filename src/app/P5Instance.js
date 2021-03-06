import P5 from 'p5';
import ParametricPatterns from 'components/ParametricPatterns';

const sketch = (p) => {
  const gridX = 1;
  const gridY = 1;
  const canvasSizeX = window.innerWidth;
  const canvasSizeY = window.innerHeight;
  const cellSizeX = Math.ceil(canvasSizeY / gridX);
  const cellSizeY = Math.ceil(canvasSizeY / gridY);
  const patterns = [];
  const BG_COLOR = [4, 31, 61];
  const MULTI_COLORS = [[[41, 93, 150], [110, 195, 149]]];
  const NUM_LAYERS = MULTI_COLORS.length;
  const offsetX = (canvasSizeX - canvasSizeY)/2;
  const offsetY = 0;

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.reset();
    // p.noLoop();
    p.frameRate(60);
    for (let n = 0; n < NUM_LAYERS; n++) {
      for (let i = 0; i < gridX; i++) {
        for (let j = 0; j < gridY; j++) {
          patterns.push(new ParametricPatterns({
            p5: p,
            x: i * cellSizeX + offsetX,
            y: j * cellSizeY + offsetY,
            width: cellSizeX,
            height: cellSizeY,
            // seed: n,
            color: MULTI_COLORS[n][0],
            color2: MULTI_COLORS[n][1],
            numLines: 100,
            spacing: 0.04,
            speed: 0.005,
            amp: 1.2,
          }));
        }
      }
    }
  };

  p.reset = () => {
    patterns.forEach((pt) => {
      pt.reset();
    });
  };

  p.draw = () => {
    p.background(...BG_COLOR);
    patterns.forEach((pp) => {
      pp.update();
      pp.draw();
    });
  };

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
