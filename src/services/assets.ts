import { World, Bodies, Composite } from 'matter-js';
import { getRandFloat, getRandomInt } from '@/utils/random';

interface makeBoxesProps {
  world: World;
  container: HTMLElement;
  count: number;
}

export const makeBoxes = ({ world, count, container }: makeBoxesProps) => {
  const boxes = new Array(count).fill(null).map(() => {
    const width = getRandomInt(50, 100);
    const height = getRandomInt(200, 400);

    const x = getRandomInt(800, container.offsetWidth - 800);
    const y = getRandomInt(-800, -500);

    const friction = getRandFloat(0.2, 0.3);
    const restitution = getRandFloat(0.4, 0.5);
    const angle = getRandFloat((0 * Math.PI) / 180, (90 * Math.PI) / 180);

    return Bodies.rectangle(x, y, width, height, {
      render: { visible: true },
      friction,
      restitution,
      angle,
    });
  });

  Composite.add(world, boxes);

  return {
    boxes,
  };
};
