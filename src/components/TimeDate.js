class TimeDate {
  time = (time) => {
    let x = new Date(time).toLocaleTimeString("en", {
      timeStyle: "short",
      hour12: true,
      timeZone: "Africa/Nairobi",
    });
    return x;
  };
  date = (date) => {
    let x = new Date(date).toLocaleDateString("en", {
      timeZone: "Africa/Nairobi",
    });
    return x;
  };
}

export default TimeDate;
