export default function promise() {
  let prom = new Promise((resolve, reject) => {
    if (allContacts.length > 0){
      resolve(allContacts);
    } else {
      reject("No data available");
    }
  });

  prom
    .then(data => {
      store.setContacts(data);
    })
    .catch(error =>
      console.log(error)
    );
}

