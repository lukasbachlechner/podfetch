export default function (_, inject) {
  class Formatter {
    number(numberToFormat) {
      return new Intl.NumberFormat('en-US').format(numberToFormat);
    }
  }
  const formatter = new Formatter();
  inject('formatter', formatter);
}
