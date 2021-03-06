import React from 'react';
import PropTypes from 'prop-types';
import ContextMenu from '@ui/ContextMenu';
import Popper from '@material-ui/core/Popper';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@terminal-packages/space-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/pro-light-svg-icons/faAngleDown';
import useMenuItemOnClick, {
  shareAction,
} from '@utils/use-menu-item-on-click';
import { getDealId } from '@events/filecoin';
import { getIdentitiesByAddress } from '@events';

import { VIEW_MODES } from '../../constants';
import CollaboratorList from '../CollaboratorList';
import getCopyMenuItems from '../../utils/get-copy-menu';

import useStyles from './styles';

const SharePanel = (props) => {
  const {
    members,
    viewMode,
    disableShare,
    selectedObject,
  } = props;

  const classes = useStyles({ viewMode });
  const { t } = useTranslation();
  const state = useSelector((s) => s.identities);
  const dispatch = useDispatch();

  const initialContextState = {
    mouseX: null,
    mouseY: null,
  };

  const [contextState, setContextState] = React.useState(initialContextState);

  const copyMenuItems = getCopyMenuItems(t, selectedObject);

  const handleContextClose = () => {
    setContextState(initialContextState);
  };

  const menuItemOnClick = useMenuItemOnClick({
    handleContextClose,
    clickedItem: selectedObject,
  });

  const handleContextMenuOpen = (event) => {
    event.preventDefault();

    getDealId(selectedObject);

    const copyButton = document.getElementById('copy-button');
    const boundaries = copyButton.getBoundingClientRect();

    setContextState({
      mouseX: boundaries.left,
      mouseY: boundaries.top + boundaries.height + 3,
    });
  };

  const membersAddresses = members.map((m) => m.address);

  React.useEffect(() => {
    const addresses = members.slice(1).reduce((addrs, member) => {
      if (!state.identities[member.publicKey]) {
        return addrs.concat(member.address);
      }

      return addrs;
    }, []);

    if (addresses.length > 0) {
      getIdentitiesByAddress({ addresses });
    }
  }, [...membersAddresses]);

  return (
    <div className={classes.root}>
      <Button
        fullWidth
        variant="primary"
        disabled={disableShare}
        onClick={() => {
          shareAction({
            clickedItem: selectedObject,
            dispatch,
          });
        }}
      >
        {t('detailsPanel.share.share')}
      </Button>
      <Button
        id="copy-button"
        variant="secondary"
        fullWidth
        className={classes.copyButton}
        onClick={handleContextMenuOpen}
      >
        {t('detailsPanel.copy.copy')}
        <FontAwesomeIcon
          className={classes.downAngle}
          icon={faAngleDown}
        />
      </Button>
      <Popper
        open={contextState.mouseY !== null}
        onClose={handleContextClose}
        onClickAway={handleContextClose}
        style={{
          top: contextState.mouseY,
          left: contextState.mouseX,
        }}
        className={classes.copyMenuPopper}
      >
        <ContextMenu
          onClickAway={handleContextClose}
          menuItemOnClick={menuItemOnClick}
          items={copyMenuItems}
          isDark={(viewMode === VIEW_MODES.PREVIEW) || (viewMode === VIEW_MODES.DARK)}
        />
      </Popper>
      <div className={classes.shareWidth}>
        <Typography
          variant="body1"
          className={classes.subtitle}
        >
          {t('detailsPanel.share.with')}
        </Typography>
      </div>
      <CollaboratorList
        viewMode={viewMode}
        t={t}
        collaborators={members.map((member) => {
          if (state.identities[member.publicKey]) {
            return {
              ...member,
              ...state.identities[member.publicKey],
            };
          }
          return member;
        })}
      />
    </div>
  );
};

SharePanel.defaultProps = {
  members: [],
  disableShare: false,
};

SharePanel.propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape({
    address: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    publicKey: PropTypes.string.isRequired,
  }).isRequired),
  viewMode: PropTypes.string.isRequired,
  selectedObject: PropTypes.shape({
    key: PropTypes.string,
  }).isRequired,
  disableShare: PropTypes.bool,
};

export default SharePanel;
