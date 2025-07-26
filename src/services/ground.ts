import { World, Bodies, Composite } from 'matter-js';

interface makeGroundProps {
  world: World;
  container: HTMLElement;
}

const WALL_THICKNESS = 100;

export const makeGround = ({ world, container }: makeGroundProps) => {
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
