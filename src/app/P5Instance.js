import p5 from 'p5';
import Util from 'components/utils/Utils';
import ParametricPatterns from 'components/ParametricPatterns';


const sketch = p => {
  const gridX = 1;
  const gridY = 1;
  const canvasSize = window.innerHeight;
  const cellSize = Math.ceil(canvasSize / gridX);
  const edgeLen = cellSize / 2;
  const patterns = [];
  const BG_COLOR = [4, 31, 61];
  const MULTI_COLORS = [[[41, 93, 150]], [[110, 195, 149]], [[243, 211, 76], [251, 142, 79]], [[255, 255, 255]]];
  const COLORS = [[41, 93, 150]]//, [110, 195, 149], [243, 211, 76], [251, 142, 79], [255, 255, 255]];
  const NUM_LAYERS = MULTI_COLORS.length;
  p.setup = () => {
    if(window.innerWidth < 480){
    }

    p.createCanvas(window.innerWidth, window.innerHeight);
    p.reset();
    // p.noLoop();
    p.frameRate(60);
    for (let n = 0; n < NUM_LAYERS; n++) {
      for (let i = 0; i < gridX; i++) {
        for (let j = 0; j < gridY; j++) {
          patterns.push(new ParametricPatterns({
            x: i * cellSize,
            y: j * cellSize,
            width: cellSize,
            height: cellSize,
            seed: n,
            color: MULTI_COLORS[n][0],
            color2: MULTI_COLORS[n][1],
            amp: (MULTI_COLORS.length - n) / 2,
          }));
        }
      }
    }
  };

  p.reset = () => {

    patterns.forEach((pt) => {
      pt.reset();
    })
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
  }

  p.keyPressed = () => {
    switch (p.key) {
      case 'S':
        p.saveImg()
        break;
      case 'R':
        p.reset();
    }
  };

};

// set global functions for p5
const p = new p5(sketch);
export { p };
