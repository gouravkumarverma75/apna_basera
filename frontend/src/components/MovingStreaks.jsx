export default function MovingStreaks({ count = 42 }) {
  const streaks = Array.from({ length: count }, (_, i) => ({
    id: i,
    angle: `${(i * 137.5) % 360}deg`,
    distance: `${250 + (i % 6) * 95}px`,
    delay: `${-(i * 0.37) % 5}s`,
    duration: `${2.2 + (i % 7) * 0.35}s`,
    width: `${35 + (i % 8) * 17}px`,
    opacity: 0.28 + (i % 5) * 0.12,
    purple: i % 3 === 0,
  }));

  return (
    <div className="moving-streaks" aria-hidden="true">
      <div className="streak-core" />
      {streaks.map((s) => (
        <span
          key={s.id}
          className={`light-streak ${s.purple ? "purple" : ""}`}
          style={{
            "--angle": s.angle,
            "--distance": s.distance,
            "--delay": s.delay,
            "--duration": s.duration,
            "--width": s.width,
            "--opacity": s.opacity,
          }}
        />
      ))}
    </div>
  );
}
