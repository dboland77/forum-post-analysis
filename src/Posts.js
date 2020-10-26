import React, { Fragment } from "react";

import { gql, useQuery } from "@apollo/client";

const GET_POSTS = gql`
query getPosts($count:Int!){
  allPosts(count: $count) {
    id
    title
    body
    published
    createdAt
    author{
      id
      firstName
      lastName
      email
      avatar
    }
    likelyTopics{
      label
      likelihood
    }
   }
}
`;

const Posts = ({onPostSelected})=> {
  const { loading, error, data } = useQuery(GET_POSTS,{variables:{count:8}});

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  console.log(data);

  return (
    <Fragment>
    <select name="posts" onChange={onPostSelected}>
      {data.allPosts.map((post) => (
        <option key={post.id} value={post.title}>
          {post.title}
        </option>
      ))}
    </select>
    </Fragment>
  );
}

export default Posts;