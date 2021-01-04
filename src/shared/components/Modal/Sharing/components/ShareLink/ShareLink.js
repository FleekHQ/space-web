import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@ui/Typography';
import Box from '@material-ui/core/Box';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ButtonBase from '@material-ui/core/ButtonBase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/pro-regular-svg-icons/faLink';
import { faGlobe } from '@fortawesome/pro-light-svg-icons/faGlobe';
import { faCheck } from '@fortawesome/pro-regular-svg-icons/faCheck';
import { faUserFriends } from '@fortawesome/pro-regular-svg-icons/faUserFriends';
import { faChevronDown } from '@fortawesome/pro-regular-svg-icons/faChevronDown';

import useStyles from './styles';
import { CopyLink } from './components';

const ShareLink = (props) => {
  const {
    url,
    i18n,
    icon,
    options,
    onOptionClick,
    onClickCopyLink,
  } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const classes = useStyles({ icon });

  const handleClose = () => setAnchorEl(null);
  const selectedOption = options.find((option) => option.selected) || options[0];

  const iconComponent = icon === 'public' ? faGlobe : faUserFriends;

  const handleItemClick = (item) => {
    handleClose();
    onOptionClick(item);
  };

  return (
    <div>
      <div className={classes.header}>
        <FontAwesomeIcon
          icon={faLink}
          className={classes.titleIcon}
        />
        <Typography variant="body1" weight="medium">
          {i18n.title}
        </Typography>
      </div>
      <div className={classes.content}>
        <CopyLink
          url={url}
          buttonText={i18n.copyLink}
          onClick={onClickCopyLink}
        />
      </div>
      <div className={classes.optionsContainer}>
        <div className={classes.iconContainer}>
          <FontAwesomeIcon icon={iconComponent} />
        </div>
        <ButtonBase
          className={classes.optionsButton}
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <Typography variant="body1">
            <Box fontWeight={500}>
              {selectedOption.title}
              <FontAwesomeIcon
                icon={faChevronDown}
                className={classes.arrowIcon}
              />
            </Box>
          </Typography>
          <Typography variant="body2" color="secondary">
            {selectedOption.description}
          </Typography>
        </ButtonBase>
        <Menu
          keepMounted
          anchorEl={anchorEl}
          onClose={handleClose}
          open={Boolean(anchorEl)}
          getContentAnchorEl={null}
          classes={{ paper: classes.paper }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          {options.map((option) => (
            <MenuItem
              key={option.id}
              onClick={() => handleItemClick(option)}
            >
              <div className={classes.optionsIconContainer}>
                {option.selected && (
                  <FontAwesomeIcon icon={faCheck} />
                )}
              </div>
              <Typography variant="body1">
                {option.title}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  );
};

ShareLink.defaultProps = {
  url: null,
  icon: 'private',
};

ShareLink.propTypes = {
  url: PropTypes.string,
  onOptionClick: PropTypes.func.isRequired,
  onClickCopyLink: PropTypes.func.isRequired,
  icon: PropTypes.oneOf(['public', 'private']),
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    selected: PropTypes.bool,
  })).isRequired,
  i18n: PropTypes.shape({
    title: PropTypes.string.isRequired,
    copyLink: PropTypes.string.isRequired,
  }).isRequired,
};

export default ShareLink;
