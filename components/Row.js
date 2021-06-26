export default function Row({ children, onAddItem, onDelete }) {
  return (
    <div>
      {children}
      <button onClick={onAddItem}>➕</button>
      <button onClick={onDelete}>Delete row</button>
    </div>
  );
}
