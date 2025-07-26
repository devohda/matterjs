import { makeBoxes } from '@/services/assets';
import { makeGround } from '@/services/ground';
import createMatterWorld from '@/services/create-matter';
import { useEffect, useRef } from 'react';

const App = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const { clearWorld, engine } = createMatterWorld(containerRef.current);

    makeGround({
      world: engine.world,
      container: containerRef.current,
    });

    makeBoxes({
      world: engine.world,
      container: containerRef.current,
      count: 10,
    });

    return () => {
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
