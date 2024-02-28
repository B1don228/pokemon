import { ChangeEvent } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Header.module.scss";
import { actions as searchActions } from "../../store/slices/searchSlice";
import Modal from "./Modal/Modal";
import { SelectorType } from "../../store/reducers";
import logo from "../../images/Logo.png";
import { actions as modalActions } from "../../store/slices/modalSlice";

const Header = () => {
  const className = classNames.bind(styles);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputValue = useSelector(
    (state: SelectorType) => state.search.searchField
  );
  const isOpen = useSelector((state: SelectorType) => state.modal.isOpen);

  return (
    <div className={className("container")}>
      <div className={className("container_support")}>
        <Link to="/support">Support</Link>
      </div>
      <div className={className("container_content")}>
        <div onClick={() => dispatch(modalActions.closeModal())}>
          <div
            className={className("container_content_logo", {
              disabled: isOpen,
            })}
            onClick={() => {
              dispatch(searchActions.search(""));
              dispatch(searchActions.nullPage());
              navigate("/");
            }}
          >
            <img src={logo} alt="" />
          </div>
        </div>
        <div className={className("container_content_menu")}>
          <label>Which one?</label>
          <input
            placeholder="Write the name"
            value={inputValue!}
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatch(searchActions.search(e.target.value))
            }
          />
        </div>
        <div className={className("container_content_menu_phone")}>
          <GiHamburgerMenu
            onClick={() => dispatch(modalActions.openCloseModal())}
          />
          {/* Menu */}
          <div
            className={className("container_content_menu_phone_info", {
              open: isOpen,
            })}
          >
            <Modal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
