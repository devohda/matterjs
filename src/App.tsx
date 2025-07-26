import { createMatterWorld, makeGround } from '@/services/matter-module';
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
