import { Render, Runner, Engine } from 'matter-js';

const createMatterWorld = (elem: HTMLDivElement) => {
  // create an engine
  const engine = Engine.create({
    gravity: { y: 2 },
  });

  // create a renderer
  const render = Render.create({
    element: elem,
    engine: engine,
    options: {
      width: elem.offsetWidth,
      height: elem.offsetHeight,
      wireframes: false,
      background: 'transparent',
    },
  });

  // run the renderer
  Render.run(render);

  //
  window.addEventListener('resize', () => {
    const newWidth = elem.clientWidth;
    const newHeight = elem.clientHeight;

    // Update canvas element dimensions
    render.canvas.width = newWidth;
    render.canvas.height = newHeight;
  });

  // create runner
  const runner = Runner.create();

  // run the engine
  Runner.run(runner, engine);

  const clearWorld = () => {
    Runner.stop(runner);
    Render.stop(render);
    Engine.clear(engine);

    /*
     * 완전히 render canvas 를 삭제하려면 canvas 를 제거해야 함.
     * @link https://github.com/liabru/matter-js/issues/564
     */
    render.canvas.remove();
    render.textures = {};
  };

  return {
    render,
    runner,
    engine,
    clearWorld,
  };
};

export default createMatterWorld;
