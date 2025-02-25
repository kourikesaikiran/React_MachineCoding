import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function App() {
  const [clickedPost, setClickedPost] = useState(null);
  const [clickedComment, setClickedComment] = useState(null);
  const [data, setData] = useState([]); 
  const [addedText, setAddedText] = useState("");
  const [newPostText, setNewPostText] = useState("");

  const handleInputChange = (e) => {
    setAddedText(e.target.value);
  };

  const handleNewPostChange = (e) => {
    setNewPostText(e.target.value);
  };

  const addNewPost = () => {
    if (newPostText.trim() === "") return;
    setData([
      ...data,
      {
        id: uuidv4(),
        postData: newPostText,
        comments: [],
      },
    ]);
    setNewPostText("");
  };

  const clickPostComment = (post) => {
    setClickedPost(post);
    setClickedComment(null);
  };

  const clickReplyComment = (comment) => {
    setClickedComment(comment);
    setClickedPost(null);
  };

  const addPostComment = (post) => {
    if (addedText.trim() === "") return;

    setData((prevData) =>
      prevData.map((item) =>
        item.id === post.id
          ? {
              ...item,
              comments: [
                ...item.comments,
                {
                  id: uuidv4(),
                  commentData: addedText,
                  comments: [],
                },
              ],
            }
          : item
      )
    );

    setAddedText("");
    setClickedPost(null);
  };

  const addNestedComment = (parentComment, postId) => {
    if (addedText.trim() === "") return;

    const updateComments = (comments) =>
      comments.map((comment) =>
        comment.id === parentComment.id
          ? {
              ...comment,
              comments: [
                ...comment.comments,
                { id: uuidv4(), commentData: addedText, comments: [] },
              ],
            }
          : { ...comment, comments: updateComments(comment.comments) }
      );

    setData((prevData) =>
      prevData.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: updateComments(post.comments),
            }
          : post
      )
    );

    setAddedText("");
    setClickedComment(null);
  };

  const renderAllComments = (postId, comments) => {
    return comments.map((comment) => (
      <div key={comment.id} className="single-comment">
        <div className="comment-header">
          {comment.commentData}
          {clickedComment?.id !== comment.id ? (
            <button className="reply-btn" onClick={() => clickReplyComment(comment)}>
              Reply
            </button>
          ) : (
            <>
              <input type="text" onChange={handleInputChange} placeholder="Reply here..." />
              <button className="add-btn" onClick={() => addNestedComment(comment, postId)}>
                Add
              </button>
              <button className="cancel-btn" onClick={() => setClickedComment(null)}>
                Cancel
              </button>
            </>
          )}
        </div>
        <div className="nested-comments">{renderAllComments(postId, comment.comments)}</div>
      </div>
    ));
  };

  return (
    <div className="App">
      <h2>Posts & Comments</h2>

      {/* New Post Input */}
      <div className="new-post-container">
        <input
          type="text"
          placeholder="Enter a new post..."
          value={newPostText}
          onChange={handleNewPostChange}
        />
        <button className="add-btn" onClick={addNewPost}>Add Post</button>
      </div>

      {/* If No Posts */}
      {data.length === 0 ? (
        <p className="no-posts">No posts available. Create a new post!</p>
      ) : (
        data.map((post) => (
          <div key={post.id} className="single-post">
            <div className="single-post-header">
              {post.postData}
              {clickedPost?.id !== post.id ? (
                <button className="comment-btn" onClick={() => clickPostComment(post)}>
                  Add Comment
                </button>
              ) : (
                <>
                  <input type="text" onChange={handleInputChange} placeholder="Enter comment..." />
                  <button className="add-btn" onClick={() => addPostComment(post)}>
                    Add
                  </button>
                  <button className="cancel-btn" onClick={() => setClickedPost(null)}>
                    Close
                  </button>
                </>
              )}
            </div>
            <div className="comment-box">{renderAllComments(post.id, post.comments)}</div>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
