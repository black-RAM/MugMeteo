function get24HourTime(epoch: number, timeZone: string): string {
  const epochMilliseconds = epoch * 1000;
  const date = new Date(epochMilliseconds);

  const options: Intl.DateTimeFormatOptions = { timeZone, hour: '2-digit', minute: '2-digit' };
  const formattedTime = date.toLocaleTimeString('en-US', options);

  return formattedTime;
}

function getDayName(dateString: string) {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const date = new Date(dateString);
  const dayIndex = date.getDay();
  
  return daysOfWeek[dayIndex];
}

export { get24HourTime, getDayName}