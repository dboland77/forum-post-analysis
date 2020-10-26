import React from "react";

import { gql, useQuery } from "@apollo/client";

const GET_DOGS = gql`
  query GetDogs {
    allProducts {
      id
      name
      price
    }
  }
`;

function Dogs({ onDogSelected }) {
  const { loading, error, data } = useQuery(GET_DOGS);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  console.log(data);

  return (
    // <select name="dog" onChange={onDogSelected}>
    //   {data.dogs.map((dog) => (
    //     <option key={dog.id} value={dog.breed}>
    //       {dog.breed}
    //     </option>
    //   ))}
    // </select>
    <h1>Hello</h1>
  );
}

export default Dogs;