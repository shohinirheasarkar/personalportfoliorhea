export function GridBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      <div className="fx-aurora" />
      <div className="fx-radial-bg fx-radial-bg--page fx-radial-bg--futuristic" />
      <div className="fx-grid-futuristic" />
      <div className="fx-particles" />
    </div>
  );
}
