import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/pro-regular-svg-icons/faUsers';

import Avatar from '@ui/Avatar';

import useStyles from './styles';

const RESIZE_DEBOUNCE_TIME = 300;
const COLLABORATOR_ITEM_HEIGHT = 27;

const SharePanel = ({ t }) => {
  const [state, setState] = React.useState({
    listMaxHeight: 0,
    maxCollaborators: 0,
    currentDocBodyHeight: window.innerHeight,
  });
  const classes = useStyles({ listMaxHeight: state.listMaxHeight });
  const collaboratorList = React.useRef(null);

  const { collaborators } = useSelector((reduxState) => ({
    // TODO: remove this mock
    collaborators: [
      {
        username: reduxState.user.username,
      },
      {
        username: 'someuser1',
      },
      {
        username: '4retggsdfgsfdfg',
      },
      {
        username: 'sddavcsdgdfhfhjhmfhjsrgdfb',
      },
      {
        username: 'zxczxcasdasdaczxcasdasdaczxas',
      },
      {
        username: 'someuser1asdasdzcxc',
      },
      {
        username: '4retxcssdsd',
      },
      {
        username: 'xzcasd',
      },
      {
        username: 'pfdoggohikjym',
      },
      {
        username: 'asdxcasd',
      },
      {
        username: 'hjgtybb',
      },
      {
        username: 'zxczxcasdasdasdaczxas',
      },
      {
        username: 'sobbvbasdasdzcxc',
      },
      {
        username: '4regjfghjssdsd',
      },
      {
        username: 'xzcasdvbdsfs45',
      },
      {
        username: 'bnsiduyty',
      },
      {
        username: 'zxcsffhgfhher',
      },
      {
        username: 'bvsdfs',
      },
      {
        username: 'cxvcxvsd',
      },
      {
        username: 'dflgkwer',
      },
      {
        username: 'xcvoiiuyen',
      },
      {
        username: 'dfrtrtmm',
      },
    ],
  }));

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
        imgUrl={null}
        className={classes.avatar}
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
      }, RESIZE_DEBOUNCE_TIME);
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
      const detailPaneltTotalHeight = offsetTop + (collaborators.length * COLLABORATOR_ITEM_HEIGHT);
      const isCollaboratorListExceedingDocHeight = currentDocBodyHeight
        - detailPaneltTotalHeight < 0;

      if (isCollaboratorListExceedingDocHeight) {
        const maxCollaborators = Math.round(
          (currentDocBodyHeight - offsetTop) / COLLABORATOR_ITEM_HEIGHT,
        );
        const listMaxHeight = maxCollaborators
          + Math.abs(offsetTop + maxCollaborators - currentDocBodyHeight);

        setState({
          ...state,
          listMaxHeight,
          maxCollaborators,
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
          .reduce((newArray, collaborator, index, arr) => {
            if (state.maxCollaborators === 0) {
              return newArray.concat(collaborator);
            }

            if (index <= state.maxCollaborators - 1) {
              if (index === arr.length - 1) {
                return newArray.concat({
                  username: t('detailsPanel.share.group', { number: index - state.maxCollaborators + 2 }),
                });
              }
              return newArray.concat(collaborator);
            }

            // eslint-disable-next-line no-param-reassign
            newArray[newArray.length - 1].username = t('detailsPanel.share.group', { number: index - state.maxCollaborators + 2 });
            return newArray;
          }, [])
          .map((collaborator, index, arr) => (
            /* eslint-disable react/prop-types */
            <div key={collaborator.username} className={classes.user}>
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
            /* eslint-enable react/prop-types */
          ))
      }
    </div>
  );
};

SharePanel.propTypes = {
  t: PropTypes.func.isRequired,
};

export default SharePanel;
