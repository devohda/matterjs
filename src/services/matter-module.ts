import Matter, { World } from 'matter-js';

interface makeGroundProps {
  world: World;
  container: HTMLElement;
}

const WALL_THICKNESS = 100;

export const makeGround = ({ world, container }: makeGroundProps) => {
  const Bodies = Matter.Bodies;
  const Composite = Matter.Composite;

  const { width, height } = container.getBoundingClientRect();

  // 벽 생성
  const topWall = Bodies.rectangle(width / 2, 0, width, WALL_THICKNESS, {
    isStatic: true,
    render: { visible: false },
  });

  const leftWall = Bodies.rectangle(0, height / 2, WALL_THICKNESS, height, {
    isStatic: true,
    render: { visible: true },
  });

  const rightWall = Bodies.rectangle(
    width,
    height / 2,
    WALL_THICKNESS,
    height,
    {
      isStatic: true,
      render: { visible: true },
    },
  );

  const bottomWall = Bodies.rectangle(
    width / 2,
    height,
    width,
    WALL_THICKNESS,
    {
      isStatic: true,
      render: { visible: true },
    },
  );

  // add all of the bodies to the world
  Composite.add(world, [topWall, leftWall, rightWall, bottomWall]);
};

export const createMatterWorld = (elem: HTMLDivElement) => {
  // module aliases
  const Engine = Matter.Engine;
  const Render = Matter.Render;
  const Runner = Matter.Runner;

  // create an engine
  const engine = Engine.create();

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
