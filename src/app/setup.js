function addUtilityFunctions(p) {
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

  return p;
}

function addCoreFunctions(p, funcs) {
  Object.assign(p, funcs);
  return p;
}

export default { addUtilityFunctions, addCoreFunctions };
