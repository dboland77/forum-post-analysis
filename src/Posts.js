import React, { Fragment } from "react";
import { gql, useQuery } from "@apollo/client";
import * as Util from "./Utilities";
import StackedBarChart from "./BarStack";
// import { group } from "d3-array";
// import { idText } from "typescript";

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

const Posts = (props) => {
  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: { count: props.numberOfPosts },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  // The code below creates month groups with 3 most likely topics
  let addMonthName = data.allPosts.map((item) => {
    return {
      ...item,
      month: Util.getDateFromEpoch(item.createdAt).getMonth(),
      year: Util.getDateFromEpoch(item.createdAt).getFullYear(),
    };
  });

  //Just choosing the most likely topic
  let myTopics = addMonthName.map((item) => {
    return {
      month: item.month,
      year: item.year,
      Topic: item.likelyTopics[0].label,
    };
  });

  //console.log("Topics",myTopics)

  function groupArrayOfObjects(list, key) {
    return list.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

  let groupedTopics = groupArrayOfObjects(myTopics, "month");

  //console.log("groups", groupedTopics)

  // Once we have the groupedTopics we can iterate through and get
  // the top 3 topics by frequency each month

  // convert object to key's array
  const keys = Object.keys(groupedTopics);

  //Define an empty dataset
  let dataset = [];
  let thisMonth = {};

  // LOOP OVER DATASET AND ADD TOP 3 BY MONTH

  keys.forEach((currentMonth) => {
    let occuring = Util.occurences(groupedTopics[currentMonth]);

    const topThree = Object.fromEntries(
      Object.entries(occuring)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
    );

    thisMonth = {
      month: `${Util.monthNames[currentMonth]}_${groupedTopics[currentMonth][0].year}`,
      ...topThree,
    };

    let bShow = Object.keys(topThree).length < 3 ? false : true;

    if (bShow) {
      dataset.push(thisMonth);
    }
  });

  // END LOOP
  // console.log("unsorted", dataset);

  //This is where the bar chart elements get rendered
  return (
    <Fragment>
      {dataset.map((dataline, index) => (
        <div key={index}>
          <StackedBarChart width={150} height={300} dataline={dataline} />
        </div>
      ))}
    </Fragment>

         // <StackedBarChart width={100} height={220} dataline={dataset} />
  
    
  );
};

export default Posts;
