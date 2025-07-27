import { makeBoxes } from '@/services/assets';
import { makeGround } from '@/services/ground';
import createMatterWorld from '@/services/create-matter';
import { useEffect, useRef } from 'react';
import { Body, World } from 'matter-js';

const BOX_COUNT = 10;

const App = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalTimerRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutTimerRef = useRef<NodeJS.Timeout | null>(null);
  const groundRef = useRef<Body[]>([]);
  const boxesRef = useRef<Body[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const { clearWorld, engine } = createMatterWorld(containerRef.current);

    const { ground } = makeGround({
      world: engine.world,
      container: containerRef.current,
    });

    // 최초 한 번 box render
    const { boxes } = makeBoxes({
      world: engine.world,
      container: containerRef.current,
      count: BOX_COUNT,
    });

    groundRef.current = ground;
    boxesRef.current = boxes;

    // 3초 뒤에 box 제거하고 다시 20개의 box 추가 (반복)
    const timer = setInterval(() => {
      const container = containerRef.current;

      if (!container) return;

      if (timeoutTimerRef.current) {
        clearTimeout(timeoutTimerRef.current);
      }

      timeoutTimerRef.current = setTimeout(() => {
        World.remove(engine.world, boxesRef.current);

        const { ground } = makeGround({
          world: engine.world,
          container,
        });

        groundRef.current = ground;

        const { boxes } = makeBoxes({
          world: engine.world,
          container,
          count: BOX_COUNT,
        });

        boxesRef.current = boxes;
      }, 5000);

      World.remove(engine.world, groundRef.current);
    }, 10000);

    intervalTimerRef.current = timer;

    return () => {
      if (intervalTimerRef.current) {
        clearInterval(intervalTimerRef.current);
      }

      if (timeoutTimerRef.current) {
        clearTimeout(timeoutTimerRef.current);
      }

      clearWorld();
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        style={{ width: '100%', height: '100vh', backgroundColor: 'red' }}
      />
      <div
        style={{
          width: '100%',
          height: '100vh',
          backgroundColor: 'blue',
        }}
      />
      <div
        style={{
          width: '100%',
          height: '100vh',
          backgroundColor: 'green',
        }}
      />
    </>
  );
};

export default App;
