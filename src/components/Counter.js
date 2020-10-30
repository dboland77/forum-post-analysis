import React, { useState } from "react";
import Card from "./Card";
import styles from "./Counter.module.css";

const Counter = () => {
  const [enteredCount, setCount] = useState([]);

  return (
    <Card>
      <div className={styles.Counter}>
        <label htmlFor="counter">Record Count</label>
        <input
          type="number"
          id="counter"
          value={enteredCount}
          onChange={(event) => {
            setCount(event.target.value);
          }}
        />
      </div>
        <button
          onClick={(event) => {
            console.log(enteredCount);
          }}
        >
          Refresh
        </button>
    </Card>
  );
};

export default Counter;
