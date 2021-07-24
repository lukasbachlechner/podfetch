export default function (_, inject) {
  class Formatter {
    /**
     * format a number
     * @param numberToFormat
     * @returns {string}
     */
    number(numberToFormat) {
      return new Intl.NumberFormat('en-US').format(numberToFormat);
    }

    /**
     * format a unix timestamp to a short date, e. g. Jul 8
     * @param timestamp
     * @returns {string}
     */
    shortDate(timestamp) {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
      }).format(timestamp);
    }

    date(timestamp) {
      return new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      }).format(timestamp);
    }

    /**
     * format a timestring (in seconds) to mm:ss (with minutes possibly > 60)
     * @param timeInSeconds
     * @returns {string}
     */
    time(timeInSeconds) {
      const [hours, minutes, seconds] = new Date(timeInSeconds * 1000)
        .toISOString()
        .substr(11, 8)
        .split(':');
      const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
      const formattedMinutes =
        totalMinutes < 10 ? `0${totalMinutes}` : totalMinutes;
      return `${formattedMinutes}:${seconds}`;
    }

    /**
     * format a timeInSeconds to a (rounded) number of minutes
     * doesn't recognize the edge case of an exact minute (e. g. 60), but that's fine
     * @param timeInSeconds
     * @returns {string}
     */
    minutes(timeInSeconds) {
      const time = this.time(timeInSeconds);
      const [minutes] = time.split(':').map((part) => parseInt(part));
      return `${minutes + 1} min`;
    }

    megaBytes(bytes, digits = 2) {
      return !isNaN(bytes)
        ? parseFloat((bytes / (1024 * 1024)).toFixed(digits))
        : 0;
    }
  }
  const formatter = new Formatter();
  inject('formatter', formatter);
}
