import React, { useContext, useState } from "react";

import "./createPost.css";
import Button from "./../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import postService from "./../../api/posts";
import AuthContext from "../../Components/AuthContext";

function CreatPost() {
  const [postDetails, setPostDetails] = useState({
    title: "",
    prize: 0,
    descryption: "",
    pictures: "",
  });
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const handlePostPublish = async () => {
    const data = new FormData();
    postDetails.sellerId = user._id;

    for (let key in postDetails) {
      if (key !== "pictures") {
        console.log(key);
        data.append(key, postDetails[key]);
      }
    }

    for (let i = 0; i <= postDetails.pictures.length; i++) {
      data.append("pictures", postDetails.pictures[i]);
    }

    console.log(data);

    setLoading(true);
    const { ok, problem, status } = await postService.createPost(data);
    setLoading(false);

    if (!ok) return console.log(problem);

    if (status === 201) {
      alert("Post published Sucessfuly !");
    }
  };

  return (
    <>
      <div className="create-post-container">
        <span className="create-post-heading">Create New post</span>
        <form
          encType="multipart/form-data"
          onSubmit={(e) => {
            e.preventDefault();
            handlePostPublish();
          }}
        >
          <Input
            className="create-title"
            label="title"
            name="title"
            value={postDetails.title}
            onChange={(e) =>
              setPostDetails({ ...postDetails, title: e.currentTarget.value })
            }
            required
            disabled={loading}
          />
          <Input
            label="descryption"
            name="descryption"
            value={postDetails.descryption}
            onChange={(e) =>
              setPostDetails({
                ...postDetails,
                descryption: e.currentTarget.value,
              })
            }
            required
            disabled={loading}
          />
          <Input
            label="prize"
            name="prize"
            value={postDetails.prize}
            type="number"
            onChange={(e) =>
              setPostDetails({ ...postDetails, prize: e.currentTarget.value })
            }
            required
            disabled={loading}
          />
          <Input
            label="Pictures"
            name="pictures"
            type="file"
            accept="image/*"
            multiple
            isSelect
            onChange={(e) => {
              setPostDetails({
                ...postDetails,
                pictures: e.currentTarget.files,
              });
            }}
            disabled={loading}
            required
          />
          <Button
            bgColor="var(--light-blue)"
            whiteText
            title="Publish Post"
            type="submit"
            loading={loading}
          />
        </form>
      </div>
    </>
  );
}

export default CreatPost;
