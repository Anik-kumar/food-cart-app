import {Fragment} from 'react';
import ReactDOM from 'react-dom';

import cls from "./Modal.module.css";


const Backdrop = (props) => {

  return (
    <div className={cls.backdrop} onClick={props.onClose}></div>
  );
};

const ModalOverlay = (props) => {
  return (
    <div className={cls.modal}>
      <div className={cls.content}>{props.children}</div>
    </div>
  );
};

const element = document.getElementById("overlay");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, element)}
      {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, element)}
      
    </Fragment>
  );
};
export default Modal;