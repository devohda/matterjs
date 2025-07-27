import { World, Bodies, Composite } from 'matter-js';
import { getRandFloat, getRandomInt } from '@/utils/random';

interface makeBoxesProps {
  world: World;
  container: HTMLElement;
  count: number;
}

export const makeBoxes = ({ world, count, container }: makeBoxesProps) => {
  const boxes = new Array(count).fill(null).map(() => {
    const width = getRandomInt(300, 600);
    const height = getRandomInt(300, 600);

    const x = getRandomInt(800, container.offsetWidth - 800);
    const y = getRandomInt(-800, -500);

    const friction = getRandFloat(0.05, 0.1);
    const restitution = getRandFloat(0.7, 0.8);
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
