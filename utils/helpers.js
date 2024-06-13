module.exports = {
  format_date: function(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDay()

    return `${month}/${day}/${year}`
  }
};
