import React from "react";
import Card from "../Card/Card";
import styles from "./Counter.module.css";

const Counter = ({ enteredCount, handleCount, handleClick }) => {
  return (
    <Card>
      <div className={styles.Counter}>
        <label htmlFor="counter">Record Count</label>
        <input
          type="number"
          id="counter"
          value={enteredCount}
          onChange={handleCount}
        />
      </div>
      <button onClick={handleClick}>Refresh</button>
    </Card>
  );
};

export default Counter;
