import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/pro-solid-svg-icons/faExclamationCircle';
import moment from 'moment';
import classnames from 'classnames';
import useStyles from './styles';

const GeneralNotification = ({
  timestamp,
  onClick,
  logoUrl,
  highlighted,
  i18n,
}) => {
  const classes = useStyles();
  const timeAgo = moment(timestamp).fromNow();

  return (
    <ListItem
      disableRipple
      className={classnames(
        classes.root,
        {
          [classes.highlighted]: highlighted,
        },
      )}
    >
      <div className={classes.imgAndTitleContainer}>
        <img
          src={logoUrl}
          alt="space logo"
          className={classes.logo}
        />
        <div className={classes.titleContainer}>
          <Typography className={classes.title}>{i18n.title}</Typography>
          <div className={classes.subtitleContainer}>
            {!!i18n.warning && (
              <FontAwesomeIcon
                icon={faExclamationCircle}
                className={classes.icon}
              />
            )}
            <Typography
              className={classnames({
                [classes.warningText]: !!i18n.warning,
                [classes.title]: !!i18n.subtitle,
              })}
            >
              {i18n.warning || i18n.subtitle}
            </Typography>
          </div>
        </div>
      </div>
      <div className={classes.sectionContainer}>
        <div
          className={classes.box}
        >
          <Typography className={classes.text}>
            {i18n.boxText1}
          </Typography>
          <Typography
            className={classnames(classes.text, classes.bold)}
          >
            {i18n.boxText2}
          </Typography>
        </div>
        <Typography className={classnames(classes.text, classes.description)}>
          {i18n.description}
        </Typography>
        <Typography className={classnames(classes.greyText, classes.timestamp)}>
          {timeAgo}
        </Typography>
        <div>
          <Button
            onClick={onClick}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            {i18n.buttonText}
          </Button>
        </div>
      </div>
    </ListItem>
  );
};

GeneralNotification.defaultProps = {
  highlighted: false,
};

GeneralNotification.propTypes = {
  timestamp: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  logoUrl: PropTypes.string.isRequired,
  highlighted: PropTypes.bool,
  i18n: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    warning: PropTypes.string,
    description: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    boxText1: PropTypes.string,
    boxText2: PropTypes.string,
  }).isRequired,
};

export default GeneralNotification;
