function getDayTimestamp(date: Date | undefined) {
  return new Date(
    date ? date.toDateString() : new Date().toDateString()
  ).getTime();
}

export default getDayTimestamp;
