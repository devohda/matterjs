import { World, Bodies, Composite } from 'matter-js';
import { Random } from '@/utils/random';

interface makeBoxesProps {
  world: World;
  container: HTMLElement;
  count: number;
}

export const makeBoxes = ({ world, count, container }: makeBoxesProps) => {
  const random = new Random();

  const boxes = new Array(count).fill(null).map(() => {
    const width = random.getRandomInt(50, 100);
    const height = random.getRandomInt(200, 400);

    const x = random.getRandomInt(20, container.offsetWidth - 20);
    const y = random.getRandomInt(-400, -200);

    const friction = random.getRandFloat(0.1, 0.2);
    const restitution = random.getRandFloat(0.6, 0.8);
    const angle = random.getRandFloat(
      (0 * Math.PI) / 180,
      (90 * Math.PI) / 180,
    );

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
