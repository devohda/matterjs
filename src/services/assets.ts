import { World, Bodies, Composite } from 'matter-js';
import { getRandomInt } from '@/utils/random';

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

    return Bodies.rectangle(x, y, width, height, {
      render: { visible: true },
    });
  });

  Composite.add(world, boxes);
};
