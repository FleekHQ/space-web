import React from 'react';
import PropTypes from 'prop-types';
import FileIcon from '@ui/FileIcon';
import classnames from 'classnames';
import Typography from '@ui/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { faCog } from '@fortawesome/pro-regular-svg-icons/faCog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useStyles from './styles';

const Header = ({
  ext,
  children,
  className,
  onClickSettings,
}) => {
  const classes = useStyles();

  return (
    <div
      className={classnames(
        classes.root,
        className,
      )}
    >
      <div className={classes.iconTitleContainer}>
        <div className={classes.icon}>
          <FileIcon ext={ext} />
        </div>
        <Typography
          variant="body1"
          className={classes.title}
        >
          {children}
        </Typography>
      </div>
      {onClickSettings && (
        <ButtonBase
          onClickSettings={onClickSettings}
          className={classes.settingsButton}
        >
          <FontAwesomeIcon
            icon={faCog}
            className={classes.settingsIcon}
          />
        </ButtonBase>
      )}
    </div>
  );
};

Header.defaultProps = {
  children: '',
  ext: 'default',
  className: null,
  onClickSettings: null,
};

Header.propTypes = {
  ext: PropTypes.string,
  children: PropTypes.string,
  className: PropTypes.string,
  onClickSettings: PropTypes.func,
};

export default Header;
