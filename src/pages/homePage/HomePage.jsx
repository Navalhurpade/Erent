import "./homePage.css";
import React, { useEffect, useState } from "react";
import postService from "../../api/posts";
import Card from "../../Components/card/Card";
import { useHistory } from "react-router-dom";

function HomePage() {
  const [posts, setposts] = useState([]);
  const history = useHistory();

  // eslint-disable-next-line
  useEffect(async () => {
    const { ok, data, problem } = await postService.getPosts();
    if (!ok) return console.log("error when fetching posts", problem);

    setposts(data);
  }, []);

  return (
    <div>
      <div className="card-container">
        {posts.map((post, i) => (
          <Card
            descreption={post.descreption}
            prize={post.prize}
            pictures={post.pictures}
            createdAt={post.createdAt}
            title={post.title}
            key={i}
            onClick={() => history.push("/post-details", { post })}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
