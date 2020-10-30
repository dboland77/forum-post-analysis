// Utility function to format the date
// By default GraphQL stores dates as a milliseconds epoch time string
const getDateFromEpoch = (dt) => {
  let d = new Date(0); //Create a new Epoch Date @ 01/01/1970
  d.setUTCMilliseconds(dt); // Add the number of milliseconds returned to get the date
  return d;
};

const occurences = (dataArray) => {
  return dataArray.reduce(function (r, row) {
    r[row.Topic] = ++r[row.Topic] || 1;
    return r;
  }, {});
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//Sorts the likelihoods from most to least likely
const sortLikelihood = (topics) => {
  return topics.sort(function (a, b) {
    if (a.likelihood < b.likelihood) return -1;
    if (a.likelihood > b.likelihood) return 1;
    return 0;
  });
};

const groupArrayOfObjects = (list, key) => {
  return list.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export {
  getDateFromEpoch,
  occurences,
  monthNames,
  sortLikelihood,
  groupArrayOfObjects,
};
