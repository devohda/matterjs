import { makeBoxes, makeSvgBlocks } from '@/services/assets';
import { makeGround } from '@/services/ground';
import createMatterWorld from '@/services/create-matter';
import { useEffect, useRef, useState } from 'react';
import { Body, World } from 'matter-js';

const BOX_COUNT = 10;

const App = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const clearBoxTimerRef = useRef<NodeJS.Timeout | null>(null);
  const clearGroundTimerRef = useRef<NodeJS.Timeout | null>(null);
  const loopTimerRef = useRef<NodeJS.Timeout | null>(null);
  const groundRef = useRef<Body[]>([]);
  const boxesRef = useRef<Body[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const { clearWorld, engine } = createMatterWorld(container);

    const startLoop = () => {
      const runLoop = async () => {
        // 1. 기존 벽/박스 제거
        if (groundRef.current.length > 0) {
          World.remove(engine.world, groundRef.current);
          groundRef.current = [];
        }

        if (boxesRef.current.length > 0) {
          World.remove(engine.world, boxesRef.current);
          boxesRef.current = [];
        }

        // 2. 새 ground 생성
        const { ground } = makeGround({
          world: engine.world,
          container,
        });

        groundRef.current = ground;

        // 3. 새 박스 생성
        const { svgBlocks } = await makeSvgBlocks({
          world: engine.world,
          container,
        });

        const { boxes } = makeBoxes({
          world: engine.world,
          container,
          count: BOX_COUNT,
        });

        const blocks = [...boxes, ...svgBlocks];
        boxesRef.current = blocks;

        // 4. 5초 후 벽 제거
        // dev 모드에서 두 번 실행되는 것을 방지하기 위해 조건 추가
        if (clearGroundTimerRef.current) {
          clearTimeout(clearGroundTimerRef.current);
          clearGroundTimerRef.current = null;
        }

        clearGroundTimerRef.current = setTimeout(() => {
          World.remove(engine.world, groundRef.current);
          clearGroundTimerRef.current = null;
        }, 7000);

        // 4. 10초 후 박스 제거 (벽 제거 후 5초 뒤 박스 제거)
        // dev 모드에서 두 번 실행되는 것을 방지하기 위해 조건 추가
        if (clearBoxTimerRef.current) {
          clearTimeout(clearBoxTimerRef.current);
          clearBoxTimerRef.current = null;
        }

        clearBoxTimerRef.current = setTimeout(() => {
          World.remove(engine.world, blocks);
          clearBoxTimerRef.current = null;
        }, 10000);

        // 5. 다음 루프 예약 (10초마다 반복)
        // dev 모드에서 두 번 실행되는 것을 방지하기 위해 조건 추가
        if (loopTimerRef.current) {
          clearTimeout(loopTimerRef.current);
          loopTimerRef.current = null;
        }

        loopTimerRef.current = setTimeout(runLoop, 10000);
      };

      runLoop();
    };

    startLoop();

    return () => {
      if (groundRef.current.length > 0) {
        World.remove(engine.world, groundRef.current);
      }

      if (boxesRef.current.length > 0) {
        World.remove(engine.world, boxesRef.current);
      }

      if (clearGroundTimerRef.current) {
        clearTimeout(clearGroundTimerRef.current);
      }

      if (clearBoxTimerRef.current) {
        clearTimeout(clearBoxTimerRef.current);
      }

      if (loopTimerRef.current) {
        clearTimeout(loopTimerRef.current);
      }

      clearWorld();
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100vh',
          backgroundColor: '#00CFFF',
          overflow: 'hidden',
        }}
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
