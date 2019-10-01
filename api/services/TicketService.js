module.exports = {
  generate: (event) => {
    try {
      const date = `${new Date().getTime()}`;
      return `${event.substring(event.length - 3)}${date.substring(date.length - 9)}`;
    } catch (error) {
      console.log(error);
    }
  },
};
