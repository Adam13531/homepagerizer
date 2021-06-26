export default function RowItem({ text, url, onAddItem }) {
  return (
    <span className="space-x-2">
      <button onClick={onAddItem}>➕</button>
      <span>{text}</span>
    </span>
  );
}
