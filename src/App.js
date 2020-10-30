import React, { Fragment, useState } from "react";
import Posts from "./components/Posts/Posts";
import styles from "./styles/GraphContainer.module.css";
import Counter from "./components/Counter/Counter";
import Layout from "./components/Layout/Layout";

const App =() => {
  const [recordCount, setRecordCount] = useState(100);
  const [posts, setPosts] = useState(100);

  const handleRecordCount = (event) => {
    setRecordCount(event.target.value);
  };

  const handleClick = (event) =>{
      setPosts(parseInt(recordCount));
  }

  return (
    <Fragment>
      <Layout>
        <div className={styles.headerSection}>
          <div className={styles.counterItem}>
            <Counter
              enteredCount={recordCount}
              handleCount={handleRecordCount}
              handleClick={handleClick}
            />
          </div>
          <h1 className={styles.headerItem}>Top 3 Monthly Topics</h1>
        </div>
        <div className={styles.graphContainer}>
          <Posts recordCount={posts} />
        </div>
      </Layout>
    </Fragment>
  );
}

export default App;
