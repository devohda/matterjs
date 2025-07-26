import { World, Bodies, Composite } from 'matter-js';
import { getRandFloat, getRandomInt } from '@/utils/random';

interface makeBoxesProps {
  world: World;
  container: HTMLElement;
  count: number;
}

export const makeBoxes = ({ world, count, container }: makeBoxesProps) => {
  const boxes = new Array(count).fill(null).map(() => {
    const width = getRandomInt(100, 400);
    const height = getRandomInt(100, 400);

    const x = getRandomInt(500, container.offsetWidth - 500);
    const y = getRandomInt(0, 10);

    const friction = getRandFloat(0.005, 0.02);
    const restitution = getRandFloat(1, 1.4);

    return Bodies.rectangle(x, y, width, height, {
      render: { visible: true },
      friction,
      restitution,
    });
  });

  Composite.add(world, boxes);
};
