import React from "react";
import Styles from "./styles.css";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { rerender } from "../../actions";
import darkcomment from "../../icons/darkcomment.svg";
import lightcomment from "../../icons/lightcomment.svg";
import Comment from "../Comment";
// import ModalOptions from "../ModalOptions";
const CommentSection = ({ postId, posterId }) => {
  const rend = useSelector((state) => state.render.render);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [reRender, setReRender] = useState(false);
  const [fade, setFade] = useState({ fade: "fade-out" });
  const [comments, setComments] = useState([]);
  const currentuser = useSelector((state) => state.login.userId);
  const clicked = () => {
    setOpen(!open);
  };
  useEffect(() => {
    if (open) {
      console.log(postId);
      axios.post("/api/comments/view/postcomments", { postId }).then((res) => {
        setComments(res.data);
      });
    }
  }, [open, reRender]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(event.target.content.value);
    const senderId = currentuser;
    const comment = event.target.content.value;

    axios
      .post("/api/comments/create", { senderId, comment, postId })
      .then((res) => {
        console.log(res);
        setReRender(!reRender);

        const type = "comment";
        const post = postId;

        const recieverId = posterId;
        const content = comment;
        axios.post("/api/activity/addnotif", {
          recieverId,
          senderId,
          type,
          content,
          post,
        });
      });
  };

  const CommentWindow = () => {
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
            <div onClick={() => setOpen(false)} className="screen-darken">
              <div
                onClick={(e) => e.stopPropagation()}
                className="modal-window"
              >
                <div className="comment-box-positioning">
                  <form onSubmit={handleSubmit}>
                    <textarea
                      className="comment-box resize inline"
                      type="text"
                      name="content"
                      placeholder="write something..."
                    />
                    <button className="post-comment-button inline">
                      post
                      <input type="submit" className="file-upload" />
                    </button>
                  </form>
                </div>
                <div className="scroll">
                  {comments.map((singularComment) => {
                    return (
                      <Comment comment={JSON.stringify(singularComment)} />
                    );
                  })}
                  {/* <input className="comment-box" type="text"></input> */}
                </div>
                {/* <button className="exit" onClick={clicked}>
                  x
                </button> */}

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
      <img
        onClick={() => setOpen(!open)}
        className="post-comment-icon"
        src={lightcomment}
      />

      <CommentWindow className="front" props={(open, setOpen, fade, setFade)} />
    </div>
  );
};
export default CommentSection;
