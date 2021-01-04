import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import FileIcon from '@terminal-packages/space-ui/core/FileIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/pro-light-svg-icons/faPrint';
import { faDownload } from '@fortawesome/pro-light-svg-icons/faDownload';
import { faInfoCircle } from '@fortawesome/pro-light-svg-icons/faInfoCircle';
import { faEllipsisV } from '@fortawesome/pro-regular-svg-icons/faEllipsisV';
import { faArrowLeft } from '@fortawesome/pro-regular-svg-icons/faArrowLeft';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import ButtonBase from '@material-ui/core/ButtonBase';
import Divider from '@material-ui/core/Divider';

import useStyles from './styles';
import RainbowButton from '../../../RainbowButton';

const Topbar = (props) => {
  const {
    ext,
    i18n,
    onInfo,
    onBack,
    onPrint,
    filename,
    onSignIn,
    showSignin,
    onDownload,
    menuOptions,
    onOptionClick,
  } = props;

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => setAnchorEl(null);
  const handleItemClick = (item) => {
    handleClose();
    onOptionClick(item);
  };

  return (
    <div className={classes.root}>
      {showSignin && (
        <div className={classes.logoContainer}>
          <img
            src="https://puente-team-bucket.storage.fleek.co/Space-white/SpaceFull.svg"
            alt="Space-Logo"
            className={classes.spaceLogo}
          />
        </div>
      )}
      <div className={classes.titleContainer}>
        {!showSignin && (
          <ButtonBase onClick={onBack}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              className={classes.backIcon}
            />
          </ButtonBase>
        )}
        <Box width={24} height={24} marginRight={1} borderRadius={3} overflow="hidden">
          <FileIcon ext={ext} />
        </Box>
        <Box fontSize={18}>
          {filename}
        </Box>
      </div>
      <div className={classes.ctaContainer}>
        <ButtonBase onClick={onPrint}>
          <FontAwesomeIcon icon={faPrint} />
        </ButtonBase>
        <ButtonBase onClick={onDownload}>
          <FontAwesomeIcon icon={faDownload} />
        </ButtonBase>
        <ButtonBase onClick={onInfo}>
          <FontAwesomeIcon icon={faInfoCircle} />
        </ButtonBase>
        {showSignin ? (
          <RainbowButton
            onClick={onSignIn}
            className={classes.signinButton}
          >
            {i18n.signin}
          </RainbowButton>
        ) : (
          <>
            <ButtonBase onClick={(e) => setAnchorEl(e.currentTarget)}>
              <FontAwesomeIcon icon={faEllipsisV} />
            </ButtonBase>
            <Menu
              keepMounted
              anchorEl={anchorEl}
              onClose={handleClose}
              open={Boolean(anchorEl)}
              getContentAnchorEl={null}
              classes={{ paper: classes.paper, list: classes.menuList }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
              {menuOptions.map((option, index) => {
                /* eslint-disable-next-line react/no-array-index-key */
                if (option.type === 'divider') return <Divider key={index} />;

                return (
                  <MenuItem
                    key={option.id}
                    onClick={() => handleItemClick(option)}
                  >
                    <Box fontSize={option.iconSize} height={12} width={12} marginRight={2}>
                      {option.icon && (
                        <FontAwesomeIcon icon={option.icon} />
                      )}
                    </Box>
                    <Typography variant="body2" className={classes.optionTitle}>
                      {option.title}
                    </Typography>
                  </MenuItem>
                );
              })}
            </Menu>
          </>
        )}
      </div>
    </div>
  );
};

Topbar.defaultProps = {
  onBack: null,
  onSignIn: null,
  showSignin: false,
  onOptionClick: () => {},
  menuOptions: [],
  i18n: {},
};

Topbar.propTypes = {
  filename: PropTypes.string.isRequired,
  ext: PropTypes.string.isRequired,
  onPrint: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
  onInfo: PropTypes.func.isRequired,
  onSignIn: PropTypes.func,
  onBack: PropTypes.func,
  showSignin: PropTypes.bool,
  onOptionClick: PropTypes.func,
  menuOptions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    icon: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
      PropTypes.string,
    ]),
    iconSize: PropTypes.number,
    type: PropTypes.oneOf(['divider', 'option']).isRequired,
  })),
  i18n: PropTypes.shape({
    signin: PropTypes.string,
  }),
};

export default Topbar;
