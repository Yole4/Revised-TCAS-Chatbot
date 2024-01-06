function FormatDate(date) {
  const dateObject = new Date(date);

  const formattedTimestamp = dateObject.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'UTC' 
  });

  return formattedTimestamp;
}

export default FormatDate;