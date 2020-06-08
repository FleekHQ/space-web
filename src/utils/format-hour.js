import moment from 'moment-timezone';

const formatHour = (date) => (
  moment(date).tz(moment.tz.guess()).format('hh:mm A')
);

export default formatHour;
