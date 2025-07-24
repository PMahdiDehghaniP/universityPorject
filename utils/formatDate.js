const convertTimeStampToDate = (timestamp) =>
  new Date(Number(timestamp) * 1000);

module.exports = { convertTimeStampToDate };
