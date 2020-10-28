import React from "react";
import { gql, useQuery } from "@apollo/client";
import * as Util from "./Utilities";
import BarStack from "./BarStack";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import styles from "./GraphContainer.module.css";


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

const Posts = (props, { onPostSelected }) => {
  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: { count: props.numberOfPosts },
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

  //Just choosing the most likely topic
  let myTopics = addMonthName.map((item) => {
    return {
      month: `${item.month}_${item.year}`,
      Topic: item.likelyTopics[0].label,
    };
  });

  // console.log(Util.sortLikelihood(myTopics))

  function groupArrayOfObjects(list, key) {
    return list.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

  // console.log("topics", myTopics);

  let groupedTopics = groupArrayOfObjects(myTopics, "month");

  // Once we have the groupedTopics we can iterate through and GradientPinkBlue
  // the top 3 topics by frequency each month

  //   // convert object to key's array
const keys = Object.keys(groupedTopics);

//Define an empty dataset
let dataset = [];
let thisMonth={};


//   // iterate over object
keys.forEach((currentMonth) => {
   
  function occurences(dataArray) {
    return dataArray.reduce(function (r, row) {
      r[row.Topic] = ++r[row.Topic] || 1;
      return r;
    }, {});
  }

  let occuring = occurences(groupedTopics[currentMonth]);

  const topThree = Object.fromEntries(
    Object.entries(occuring)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
  );
  
  thisMonth = {
    month: currentMonth,
    ...topThree,
  };
  
  dataset.push(thisMonth);

});

console.log("sorted", dataset);


  return (
    <ParentSize className={styles.graphContainer}>
      {({ width, height }) => <BarStack width={width} height={height} data={dataset} />}
    </ParentSize>
  );
};

export default Posts;
