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
      likelyTopics {
        label
        likelihood
      }
    }
  }
`;

const Posts = ({ onPostSelected }) => {
  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: { count: 10},
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  // The code below creates month groups with 3 most likely topics
  let addMonthName = data.allPosts.map((item) => {
    return {
      ...item,
      month: Util.monthNames[Util.getDateFromEpoch(item.createdAt).getMonth()],
      year: Util.getDateFromEpoch(item.createdAt).getFullYear(),
    };
  });

  let myTopics = addMonthName.map((item) => {
    return {
      month: `${item.month}_${item.year}`,
      likelyTopics: item.likelyTopics.slice(0, 3),
    };
  });

  //console.log(Util.sortLikelihood(myTopics))

  let monthGroups = myTopics.reduce((monthGroups, currentValue) => {
    monthGroups[currentValue.month] = [
      ...(monthGroups[currentValue.month] || []),
      currentValue,
    ];
    return monthGroups;
  }, {});

  console.log("group", monthGroups);

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

export default Posts;
