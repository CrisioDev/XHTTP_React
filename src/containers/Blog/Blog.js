import React, { Component } from "react";
import axios from "axios";

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";

class Blog extends Component {
  state = {
    posts: [],
    selectedPost: null
  };

  componentDidMount() {
    //Sends Get and gets data asynchronusly
    axios.get("https://jsonplaceholder.typicode.com/posts").then(response => {
      const posts = response.data.slice(0, 6);
      const updatedPosts = posts.map(post => {
        return {
          ...post,
          author: "Crisio"
        };
      });
      this.setState({
        posts: updatedPosts
      });
      //console.log(response["data"]);
    });
  }

  postSelectHandler = (post) => {
    this.setState({
      selectedPost: post
    });
  };

  render() {
    const posts = this.state.posts.map(post => {
      return (
        <Post
          title={post.title}
          key={post.id}
          author={post.author}
          clicked={() => this.postSelectHandler(post)}
        />
      );
    });

    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost 
          selectedPost={this.state.selectedPost}
          />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
