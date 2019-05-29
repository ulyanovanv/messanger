export default function handlePromise(incomingData, func) {
  new Promise((resolve, reject) => {
    if (incomingData.length > 0){
      resolve(incomingData);
    } else {
      reject("No data available");
    }
  })
    .then(data => {
      func(data);
    })
    .catch(error =>
      console.log(error)
    );
}