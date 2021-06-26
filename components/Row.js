export default function Row({ children, onAddItem, onDelete }) {
  return (
    <div className="space-x-2">
      {children}
      <button onClick={onAddItem}>➕</button>
      <button onClick={onDelete}>Delete row</button>
    </div>
  );
}
