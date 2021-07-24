import FontSpacingPicker from "./FontSpacingPicker";

export default function FontSpacings({}) {
  return (
    <>
      <FontSpacingPicker isHorizontal />
      <FontSpacingPicker isHorizontal={false} />
    </>
  );
}
