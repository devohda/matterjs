import {
  World,
  Bodies,
  Composite,
  IChamferableBodyDefinition,
  IBodyRenderOptions,
} from 'matter-js';

interface makeGroundProps {
  world: World;
  container: HTMLElement;
}

const WALL_THICKNESS = 20;
const WALL_OPTIONS: IChamferableBodyDefinition & IBodyRenderOptions = {
  isStatic: true,
  render: { visible: true, fillStyle: 'transparent' },
};

/**
 * 천장을 제외한 벽 만들기
 */
export const makeGround = ({ world, container }: makeGroundProps) => {
  const { width, height } = container.getBoundingClientRect();

  const leftWall = Bodies.rectangle(
    0,
    0,
    WALL_THICKNESS,
    height * 2,
    WALL_OPTIONS,
  );

  const rightWall = Bodies.rectangle(
    width,
    0,
    WALL_THICKNESS,
    height * 2,
    WALL_OPTIONS,
  );

  const bottomWall = Bodies.rectangle(
    width / 2,
    height,
    width,
    WALL_THICKNESS,
    WALL_OPTIONS,
  );

  // add all of the bodies to the world
  Composite.add(world, [leftWall, rightWall, bottomWall]);

  return {
    ground: [leftWall, rightWall, bottomWall],
  };
};
