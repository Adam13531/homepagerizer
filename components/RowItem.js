export default function RowItem({ text, url, onAddItem }) {
  return (
    <span>
      <button onClick={onAddItem}>➕</button>
      <span>{text}</span>
    </span>
  );
}
