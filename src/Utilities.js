// Utility function to format the date
// By default GraphQL stores dates as a milliseconds epoch time string

export function getDateFromEpoch(dt) {
  let d = new Date(0); //Create a new Epoch Date @ 01/01/1970
  d.setUTCMilliseconds(dt); // Add the number of milliseconds returned to get the date
  return d;
}
