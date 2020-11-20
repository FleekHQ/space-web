import moment from 'moment-timezone';

const formatDate = (date) => (
  moment(date).tz(moment.tz.guess()).format('MMM D, YYYY')
);

export default formatDate;
