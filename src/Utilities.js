// Utility function to format the date
// By default GraphQL stores dates as a milliseconds epoch time string

export function getDateFromEpoch(dt) {
  let d = new Date(0); //Create a new Epoch Date @ 01/01/1970
  d.setUTCMilliseconds(dt); // Add the number of milliseconds returned to get the date
  return d;
}

// export function aggregateByMonth(data) {
//   return 1;
// }

// export function aggregateByAuthor(data) {
//   return 1;
// }


export const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

//Sorts the likelihoods from most to least likely
export function sortLikelihood(topics){
   return  topics.sort(
       function(a,b)
       {
        if(a.likelihood < b.likelihood)
            return -1;
        if(a.likelihood > b.likelihood)
            return 1;
        return 0
    })
}


