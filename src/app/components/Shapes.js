// draw equilateral triangle centered on pos with given side length
function triangle(p5, pos = { x: 0, y: 0 }, sideLen = 5, rotation = 0) {
  p5.push();
  p5.translate(pos.x, pos.y);
  p5.rotate(rotation);
  const height = Math.sqrt(sideLen * sideLen - (sideLen / 2) * (sideLen / 2));
  p5.triangle(
    -sideLen / 2, sideLen / 2,
    0, -height / 2,
    +sideLen / 2, sideLen / 2,
  );
  p5.pop();
}
export default { triangle };
