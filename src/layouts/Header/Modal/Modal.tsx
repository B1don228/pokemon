import { ChangeEvent } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import styles from "./Modal.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { actions as searchActions } from "../../../store/slices/searchSlice";
import { SelectorType } from "../../../store/reducers";

const Modal = () => {
  const className = classNames.bind(styles);
  const dispatch = useDispatch();
  const inputValue = useSelector(
    (state: SelectorType) => state.search.searchField
  );
  const isOpen = useSelector((state: SelectorType) => state.modal.isOpen);

  return (
    <div className={className("container")}>
      {isOpen &&
        createPortal(
          <div className={className("modal", { open: isOpen })}>
            <div className={className("modal_text")}>
              <div className={className("modal_text_input")}>
                <input
                  value={inputValue!}
                  type="text"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    dispatch(searchActions.search(e.target.value))
                  }
                />
              </div>
              <div>
                <Link to="/support">Support</Link>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Modal;
