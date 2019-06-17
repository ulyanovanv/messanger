const supportEvent = (event, func, ...args) => {
  if (event.keyCode === 13) {
    func(args[0]);
  }
};

export default supportEvent;
