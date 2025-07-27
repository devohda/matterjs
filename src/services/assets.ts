import { World, Bodies, Composite } from 'matter-js';
import { getRandFloat, getRandomInt } from '@/utils/random';

interface makeBoxesProps {
  world: World;
  container: HTMLElement;
  count: number;
}

export const makeBoxes = ({ world, count, container }: makeBoxesProps) => {
  const boxes = new Array(count).fill(null).map(() => {
    const width = getRandomInt(300, 500);
    const height = getRandomInt(300, 500);

    const x = getRandomInt(600, container.offsetWidth - 600);
    const y = getRandomInt(-600, -300);

    const friction = getRandFloat(0.005, 0.02);
    const restitution = getRandFloat(1, 1.4);

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
