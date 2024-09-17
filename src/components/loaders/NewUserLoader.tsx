export default function NewUserLoader() {
  return (
    <div className="placeholder-glow">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <span
          key={item}
          className="placeholder bg-secondary-200 w-100 mb-1 fs-3"
        />
      ))}
    </div>
  );
}
