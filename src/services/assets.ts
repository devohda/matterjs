import { World, Bodies, Composite } from 'matter-js';

interface makeBoxesProps {
  world: World;
  container: HTMLElement;
  count: number;
}

export const makeBoxes = ({ world, container, count }: makeBoxesProps) => {
  const boxes = new Array(count).fill(null).map(() => {
    return Bodies.rectangle(100, 100, 100, 100, {
      render: { visible: true },
    });
  });

  Composite.add(world, boxes);
};
