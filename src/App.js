import React, { Fragment } from "react";
import Posts from "./Posts";
import styles from "./GraphContainer.module.css";
import Counter from "./components/Counter";
import Layout from "../src/components/Layout";

const POSTS_TO_RETRIEVE = 70;

// Low values of n result in not all months being "filled"
// At 10000 records it is close to being steady state
// At 50,000 records it *is* steady state

function App() {
  return (
    <Fragment>
      <Layout>
        <div className={styles.headerSection}>
          <h1 className={styles.headerItem}>Top 3 Monthly Topics</h1>
          <div className={styles.counterItem}>
            <Counter />
          </div>
        </div>
        <div className={styles.graphContainer}>
          <Posts numberOfPosts={POSTS_TO_RETRIEVE} />
        </div>
      </Layout>
    </Fragment>
  );
}

export default App;

/*TODO
1. Remove Extra modules (graphs etc)
2. Tidy up folder structure
3. uninstall node modules that are not needed
4. Allow the n parameter to be specified via dropdown
5. Tidy up README again
6. submit!*/
