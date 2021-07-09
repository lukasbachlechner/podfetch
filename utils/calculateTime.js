/**
 * calculates a formatted time string (mm:ss) from a given amount of seconds
 * @param {float} timeInSeconds
 */
const calculateTime = (timeInSeconds) => {
  const [hours, minutes, seconds] = new Date(timeInSeconds * 1000)
    .toISOString()
    .substr(11, 8)
    .split(':');
  const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
  const formattedMinutes =
    totalMinutes < 10 ? `0${totalMinutes}` : totalMinutes;
  return `${formattedMinutes}:${seconds}`;
};

export default calculateTime;
