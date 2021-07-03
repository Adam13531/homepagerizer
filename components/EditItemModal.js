import Modal from "react-modal";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { setEditingItem } from "../state/editingSlice";
import { selectEditingItem } from "../state/editingSlice";
import { updateItem } from "../state/contentSlice";
import { deleteItem } from "../state/actions";
import KeyboardShortcutButton from "./KeyboardShortcutButton";
import Checkbox from "rc-checkbox";
import { selectRows } from "../state/contentSlice";

export default function EditItemModal() {
  const dispatch = useDispatch();

  const { rowNum, itemNum } = useSelector(selectEditingItem);
  const rows = useSelector(selectRows);
  const isEditingAnItem = !_.isNil(rowNum) && !_.isNil(itemNum);
  if (!isEditingAnItem) {
    return null;
  }

  const item = rows[rowNum][itemNum];
  const { text, url, id, isSmallText } = item;

  const closeModal = () => {
    dispatch(setEditingItem(null, null));
  };

  return (
    <Modal
      isOpen={isEditingAnItem}
      onRequestClose={closeModal}
      contentLabel="Edit link properties"
      overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-80 flex justify-center items-center"
      className="bg-white rounded-lg shadow-xl transform transition-all my-8 align-middle max-w-lg w-full "
    >
      <div className="flex flex-col text-indigo-900 gap-y-2 px-6 py-8">
        <span className="mb-1">Link Text</span>
        <div>
          <input
            type="text"
            className="border rounded border-indigo-300 py-3 px-4 w-full"
            placeholder="Link text"
            value={text}
            onChange={(e) => {
              dispatch(
                updateItem(rowNum, itemNum, {
                  text: e.target.value,
                })
              );
            }}
          />
        </div>
        <span className="mb-1">URL</span>
        <div className="flex">
          <input
            type="url"
            className="border rounded border-indigo-300 py-3 px-2 w-full"
            placeholder="Link address"
            value={url}
            onChange={(e) => {
              dispatch(
                updateItem(rowNum, itemNum, {
                  url: e.target.value,
                })
              );
            }}
          />
        </div>
        <div className="grid grid-rows-auto1f grid-cols-2 gap-y-3">
          <span>Keyboard Shortcut</span>
          <span>Small text</span>
          <div>
            <KeyboardShortcutButton
              item={item}
              rowNum={rowNum}
              itemNum={itemNum}
            />
          </div>
          <div>
            <label>
              <Checkbox
                checked={isSmallText}
                onChange={() => {
                  dispatch(
                    updateItem(rowNum, itemNum, {
                      isSmallText: !isSmallText,
                    })
                  );
                }}
              />
            </label>
          </div>
          <div className="self-center">
            <button
              className="text-red-600 font-semibold"
              onClick={() => dispatch(deleteItem(rowNum, itemNum, id))}
            >
              <i className="las la-trash"></i> Delete Link
            </button>
          </div>
          <div className="flex space-x-4">
            <div>
              <button
                className="border border-indigo-300 rounded bg-indigo-50 py-3 px-4"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
            <button
              className="border border-indigo-700 text-white rounded bg-indigo-700 py-3 px-4"
              onClick={closeModal}
            >
              Save Link
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
