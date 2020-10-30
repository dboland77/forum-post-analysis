import React, { Fragment } from "react";
import { gql, useQuery } from "@apollo/client";
import * as Util from "../../Utils/Utilities";
import StackedBarChart from "../BarStack/BarStack";

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

const Posts = ({recordCount}) => {

  const WIDTH = 150;
  const HEIGHT = 300;

  //Run the query
  let { loading, error, data } = useQuery(GET_POSTS, {
    variables: { count: recordCount },
  });

  //Check result
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  // Pre-process the data 
  // First convert the date and pull out the month and year
  let convertDate = data.allPosts.map((item) => {
    return {
      ...item,
      month: Util.getDateFromEpoch(item.createdAt).getMonth(),
      year: Util.getDateFromEpoch(item.createdAt).getFullYear(),
    };
  });

  // Then choose the most likely topic for each post and remove 
  // fields we are not going to use
  let Topics = convertDate.map((item) => {
    return {
      month: item.month,
      year: item.year,
      Topic: item.likelyTopics[0].label,
    };
  });

  // Group the topics by month
  let groupedTopics = Util.groupArrayOfObjects(Topics, "month");


  // Once we have the groupedTopics we can iterate through each one
  // and get the top 3 topics by frequency each month

  // Grab the keys (i.e. months)
  const keys = Object.keys(groupedTopics);

  let dataset = [];
  let thisMonth = {};

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

  return (
    <Fragment>
      {dataset.map((dataline, index) => (
        <div key={index}>
          <StackedBarChart width={WIDTH} height={HEIGHT} dataline={dataline} />
        </div>
      ))}
    </Fragment>    
  );
};

export default Posts;
