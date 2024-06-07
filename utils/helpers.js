module.exports = {
  get_emoji: () => {
    const randomNum = Math.random();
    let book = "📗";

    if (randomNum > 0.7) {
      book = "📘";
    } else if (randomNum > 0.4) {
      book = "📙";
    }

    return `<span for="img" aria-label="book">${book}</span>`;
  },
  format_date: function(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDay()

    return `${month}/${day}/${year}`
  }
};
