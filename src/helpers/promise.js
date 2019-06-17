function handlePromise(incomingData) {
  return new Promise((resolve, reject) => {
    if (incomingData.length > 0) {
      resolve(incomingData);
    } else {
      reject(new Error('No data available'));
    }
  });
}

function returnData(incomingPromise, func) {
  return incomingPromise.then((data) => {
    func(data);
  })
    .catch((error) => {
      alert(error);
    });
}

export { handlePromise, returnData };
