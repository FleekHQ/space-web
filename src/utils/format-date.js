import moment from 'moment-timezone';

const formatDate = (date) => (
  moment(date).tz(moment.tz.guess()).format('MMM d, YYYY')
);

export default formatDate;
