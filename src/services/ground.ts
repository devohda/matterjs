import { World, Bodies, Composite } from 'matter-js';

interface makeGroundProps {
  world: World;
  container: HTMLElement;
}

const WALL_THICKNESS = 100;

/**
 * 천장을 제외한 벽 만들기
 */
export const makeGround = ({ world, container }: makeGroundProps) => {
  const { width, height } = container.getBoundingClientRect();

  const leftWall = Bodies.rectangle(0, 0, WALL_THICKNESS, height * 2, {
    isStatic: true,
    render: { visible: true },
  });

  const rightWall = Bodies.rectangle(width, 0, WALL_THICKNESS, height * 2, {
    isStatic: true,
    render: { visible: true },
  });

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
  Composite.add(world, [leftWall, rightWall, bottomWall]);

  return {
    ground: [leftWall, rightWall, bottomWall],
  };
};

export const makeGroundDrop = ({ world, container }: makeGroundProps) => {
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

  return {
    topWall,
    leftWall,
    rightWall,
    bottomWall,
  };
};
