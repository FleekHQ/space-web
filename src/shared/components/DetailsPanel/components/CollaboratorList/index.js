import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/pro-regular-svg-icons/faUsers';

import Avatar from '@ui/Avatar';

import useStyles from './styles';

const RESIZE_DEBOUNCE_MS_TIME = 300;
const COLLABORATOR_ITEM_HEIGHT = 27;

const SharePanel = ({
  t,
  collaborators,
}) => {
  const [state, setState] = React.useState({
    listMaxHeight: 0,
    maxCollaborators: 0,
    currentDocBodyHeight: window.innerHeight,
  });
  const classes = useStyles({ listMaxHeight: state.listMaxHeight });
  const collaboratorList = React.useRef(null);

  /* eslint-disable react/prop-types */
  const getAvatar = ({ isLast, collaborator }) => {
    if (state.maxCollaborators > 0 && isLast) {
      return (
        <Avatar
          size={21}
          imgUrl={null}
          username={collaborator.username}
          className={classNames(classes.avatar, classes.greyBG)}
        >
          <FontAwesomeIcon
            icon={faUsers}
          />
        </Avatar>
      );
    }

    return (
      <Avatar
        size={21}
        className={classes.avatar}
        imgUrl={collaborator.avatarUrl}
        username={collaborator.username}
      />
    );
  };
  /* eslint-enable react/prop-types */

  React.useEffect(() => {
    let timer;
    const handleResizeWindow = () => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        setState({
          ...state,
          currentDocBodyHeight: window.innerHeight,
        });
      }, RESIZE_DEBOUNCE_MS_TIME);
    };

    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);

      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  React.useEffect(() => {
    if (state.currentDocBodyHeight > 0) {
      const { currentDocBodyHeight } = state;
      const { offsetTop } = collaboratorList.current;
      const detailPanelTotalHeight = offsetTop + (collaborators.length * COLLABORATOR_ITEM_HEIGHT);
      const isCollaboratorListExceedingDocHeight = currentDocBodyHeight
        - detailPanelTotalHeight < 0;

      if (isCollaboratorListExceedingDocHeight) {
        const maxCollaborators = Math.round(
          (currentDocBodyHeight - offsetTop) / COLLABORATOR_ITEM_HEIGHT,
        );
        const listMaxHeight = maxCollaborators
          + Math.abs(offsetTop + maxCollaborators - currentDocBodyHeight);

        setState({
          ...state,
          listMaxHeight,
          maxCollaborators: maxCollaborators === collaborators.length ? 0 : maxCollaborators,
        });
        return;
      }

      setState({
        ...state,
        listMaxHeight: 0,
        maxCollaborators: 0,
      });
    }
  }, [state.currentDocBodyHeight]);

  return (
    <div className={classes.root} ref={collaboratorList}>
      {
        collaborators
          .reduce((newArray, collaborator, index) => {
            if (state.maxCollaborators === 0) {
              return newArray.concat({ ...collaborator });
            }

            if (index <= state.maxCollaborators - 1) {
              if (index === collaborators.length - 1) {
                return newArray.concat({
                  username: t('detailsPanel.share.group', { number: index - state.maxCollaborators + 2 }),
                });
              }
              return newArray.concat({ ...collaborator });
            }

            if (newArray.length) {
              // eslint-disable-next-line no-param-reassign
              newArray[newArray.length - 1].username = t('detailsPanel.share.group', { number: index - state.maxCollaborators + 2 });
            }

            return newArray;
          }, [])
          .map((collaborator, index, arr) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} className={classes.user}>
              {
                getAvatar({
                  collaborator,
                  isLast: index === arr.length - 1,
                })
              }
              <Typography noWrap variant="body1">
                {`${collaborator.username}${index === 0 ? t('detailsPanel.share.you') : ''}`}
              </Typography>
            </div>
          ))
      }
    </div>
  );
};

SharePanel.defaultProps = {
  collaborators: [],
};

SharePanel.propTypes = {
  t: PropTypes.func.isRequired,
  collaborators: PropTypes.arrayOf(PropTypes.shape({
    address: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    publicKey: PropTypes.string.isRequired,
  }).isRequired),
};

export default SharePanel;
