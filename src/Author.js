import React, { Fragment } from "react";

import { gql, useQuery } from "@apollo/client";
import * as Util from "./Utilities";

//Posts by creation month
const GET_POSTS = gql`
query getPosts($count: Int!) {
  allPosts(count: $count) {
    id
    title
    published
    createdAt
    author{
      id
      firstName
      lastName
      email
      avatar
    }
    likelyTopics {
      label
      likelihood
    }
  }
}
`;

const Author = ({ onPostSelected }) => {
  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: { count: 400},
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;


  // The code below creates month groups with 3 most likely topics 
  let addMonthName = data.allPosts.map(item => {
    return{
      ...item,
      month: Util.monthNames[Util.getDateFromEpoch(item.createdAt).getMonth()],
      year: Util.getDateFromEpoch(item.createdAt).getFullYear()
    };
  })


  let authorTopics = addMonthName.map(item => {
    return{
      month: `${item.month}_${item.year}`,
      ...item.author,
      topic: item.likelyTopics.slice(0,1)[0].label
      //Just choose the most likely topic for each post
    };
  })


  let authorGroups = authorTopics.reduce((authorGroups,currentValue)=>{
    authorGroups[currentValue.id] = [...authorGroups[currentValue.id] || [], currentValue];
    return authorGroups;
  },{});

  console.log("group",authorGroups)


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
};

export default Author;
