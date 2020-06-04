import moment from 'moment-timezone';

const formatMonthDayYear = (date) => (
  moment(date).tz(moment.tz.guess()).format('MMM d, YYYY')
);

export default formatMonthDayYear;
