import { World, Bodies, Composite } from 'matter-js';
import { getRandFloat, getRandomInt } from '@/utils/random';

interface makeBoxesProps {
  world: World;
  container: HTMLElement;
  count: number;
}

export const makeBoxes = ({ world, count, container }: makeBoxesProps) => {
  const boxes = new Array(count).fill(null).map(() => {
    const width = getRandomInt(500, 600);
    const height = getRandomInt(500, 600);

    const x = getRandomInt(800, container.offsetWidth - 800);
    const y = getRandomInt(-800, -500);

    const friction = getRandFloat(0.005, 0.02);
    const restitution = getRandFloat(0.7, 1);

    return Bodies.rectangle(x, y, width, height, {
      render: { visible: true },
      friction,
      restitution,
    });
  });

  Composite.add(world, boxes);

  return {
    boxes,
  };
};
