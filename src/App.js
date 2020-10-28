import React from "react";
import Posts from "./Posts";
// import Author from "./Author";

const POSTS_TO_RETRIEVE = 100;

function App() {
  return (
    
    <div>
      <h2>
      Welcome to the App
      </h2>
      <Posts numberOfPosts={POSTS_TO_RETRIEVE}/>

      {/* <Author/> */}
    </div>
  );
}

export default App;
