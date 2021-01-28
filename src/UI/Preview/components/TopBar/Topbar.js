import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Popper from '@material-ui/core/Popper';
import FileIcon from '@terminal-packages/space-ui/core/FileIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/pro-light-svg-icons/faPrint';
import { faDownload } from '@fortawesome/pro-light-svg-icons/faDownload';
import { faInfoCircle } from '@fortawesome/pro-light-svg-icons/faInfoCircle';
import { faEllipsisV } from '@fortawesome/pro-regular-svg-icons/faEllipsisV';
import { faArrowLeft } from '@fortawesome/pro-regular-svg-icons/faArrowLeft';
import Box from '@material-ui/core/Box';
import ButtonBase from '@material-ui/core/ButtonBase';
import ContextMenu from '@ui/ContextMenu';

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
    disableDownload,
    disablePrint,
  } = props;

  const initialContextState = {
    mouseX: null,
    mouseY: null,
  };

  const classes = useStyles();
  const [contextState, setContextState] = useState(initialContextState);

  const handleClose = () => setContextState(initialContextState);

  const handleMenuOpen = (event) => {
    event.preventDefault();

    setContextState({
      mouseX: event.clientX - 160,
      mouseY: 42,
    });
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
        {!showSignin && onBack && (
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
        <ButtonBase onClick={onPrint} disabled={disablePrint}>
          <FontAwesomeIcon icon={faPrint} />
        </ButtonBase>
        <ButtonBase onClick={onDownload} disabled={disableDownload}>
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
            <ButtonBase onClick={handleMenuOpen}>
              <FontAwesomeIcon icon={faEllipsisV} />
            </ButtonBase>
            <Popper
              open={contextState.mouseY !== null}
              onClose={handleClose}
              onClickAway={handleClose}
              style={{
                top: contextState.mouseY,
                left: contextState.mouseX,
              }}
              className={classes.topBarPopper}
            >
              <ContextMenu
                onClickAway={handleClose}
                menuItemOnClick={onOptionClick}
                items={menuOptions}
                isDark
              />
            </Popper>
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
  disableDownload: false,
  disablePrint: false,
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
    displayText: PropTypes.string,
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
  disableDownload: PropTypes.bool,
  disablePrint: PropTypes.bool,
};

export default Topbar;
