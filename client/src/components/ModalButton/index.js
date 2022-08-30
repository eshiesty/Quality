import React from "react";
import Styles from "./styles.css";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { rerender } from "../../actions";
// import ModalOptions from "../ModalOptions";
const ModalButton = ({ ownPost, postId }) => {
  const rend = useSelector((state) => state.render.render);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [fade, setFade] = useState({ fade: "fade-out" });
  const clicked = () => {
    setOpen(!open);
  };
  // useEffect(() => {
  //   const timeout = setInterval(() => {
  //     if (fade === "fade-out") {
  //       setFade("fade-in");
  //     } else {
  //       setFade("fade-out");
  //     }
  //   }, 1000);
  // }, [open]);

  const DeleteOwnPost = () => {
    if (ownPost) {
      return (
        <button className="delete" onClick={DeletePost}>
          Delete post
        </button>
      );
    }
    return <></>;
  };
  const DeletePost = () => {
    axios.put("/api/posts/delete", { postId }).then(() => {
      setOpen(false);
      dispatch(rerender());
    });
  };
  const ModalOptions = () => {
    return (
      <AnimatePresence>
        {open && (
          <motion.div
            key="window"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, zIndex: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="front"
          >
            <div className={`screen-darken `}>
              <div className="modal-window">
                {/* <div className="modal-content"> */}
                <h1>Options</h1>
                <button className="exit" onClick={clicked}>
                  x
                </button>
                <DeleteOwnPost />
                {/* </div> */}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div>
      <button className="option-button" onClick={clicked}>
        ⋮
      </button>

      <ModalOptions className="front" props={(open, setOpen, fade, setFade)} />
    </div>
  );
};
export default ModalButton;
