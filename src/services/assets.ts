import { World, Bodies, Composite, Svg, Common } from 'matter-js';

import HeartSvg from '../../public/images/heart.svg';
import StarSvg from '../../public/images/star.svg';

interface makeBoxesProps {
  world: World;
  container: HTMLElement;
  count: number;
}

interface makeSvgBlocksProps {
  world: World;
  container: HTMLElement;
}

export const makeBoxes = ({ world, count, container }: makeBoxesProps) => {
  const boxes = new Array(count).fill(null).map(() => {
    const width = Common.random(50, 100);
    const height = Common.random(200, 400);

    const x = Common.random(20, container.offsetWidth - 20);
    const y = Common.random(-400, -200);

    const friction = Common.random(0.1, 0.2);
    const restitution = Common.random(0.6, 0.8);
    const angle = Common.random((0 * Math.PI) / 180, (90 * Math.PI) / 180);

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

const loadSvg = async (url: string) => {
  const res = await fetch(url);
  const raw = await res.text();

  const svg = new window.DOMParser().parseFromString(raw, 'image/svg+xml');

  const paths = Array.prototype.slice.call(svg.querySelectorAll('path'));

  return paths;
};

const SVG_BLOCK_ARR = [HeartSvg, StarSvg];

export const makeSvgBlocks = async ({
  world,
  container,
}: makeSvgBlocksProps) => {
  const loadSvgArr = await Promise.all(
    SVG_BLOCK_ARR.map((svg) => loadSvg(svg)),
  );

  const svgPathArr = loadSvgArr.filter((svg) => !!svg);

  const svgBlocks = svgPathArr.map((path) => {
    const vertexSets = path.map((path: SVGPathElement) =>
      Svg.pathToVertices(path, 1),
    );

    const block = Bodies.fromVertices(
      Common.random(20, container.offsetWidth - 20),
      Common.random(-400, -200),

      vertexSets,
      {
        restitution: 0.9,
        render: {
          lineWidth: 1,
        },
        label: 'block',
      },
    );

    return block;
  });

  Composite.add(world, svgBlocks);

  return {
    svgBlocks,
  };
};
