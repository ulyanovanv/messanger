function handlePromise(incomingData) {
  return new Promise((resolve, reject) => {
    if (incomingData.length > 0){ //когда 0, когда не 0, когда undefined
      resolve(incomingData);
    } else {
      reject("No data available");
    }
  })
}

function returnData(incomingPromise, func) {
  return incomingPromise.then(data => {
      func(data);
    })
    .catch(error => {
      throw new Error('no data available');
      alert('no data available');
      console.log(error)
    });
}

export {handlePromise, returnData};