import React from "react";
import styles from "./Support.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { SelectorType } from "../../store/reducers";
import { actions as modalActions } from "../../store/slices/modalSlice";

const Support = () => {
  const dispatch = useDispatch();
  const className = classNames.bind(styles);

  const isOpen = useSelector((state: SelectorType) => state.modal.isOpen);

  return (
    <div
      onClick={() => {
        if (isOpen) {
          dispatch(modalActions.closeModal());
          return;
        }
      }}
    >
      <div className={className("container")}>
        <div className={className("container_content")}>
          <div className={className("container_content_email")}>
            If you have any questions: <a href="#">pokemon@gmail.com</a>
          </div>
          <div className={className("container_content_number")}>
            +380210422424
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
