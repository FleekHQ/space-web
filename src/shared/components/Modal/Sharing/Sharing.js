import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import BaseModal from '@ui/BaseModal';
import { shareFilesByPublicKey } from '@events/share';
import { SHARE_TYPES } from '@reducers/details-panel/share';

import useStyles from './styles';
import getOptions from './options';
import {
  Header,
  MemberInput,
  CollaboratorList,
} from './components';

const collaborators = [
  {
    id: 'morochroyce@gmail.com',
    mainText: 'Peter Adams',
    secondaryText: 'morochroyce@gmail.com',
    imageSrc: 'https://cdn.theatlantic.com/thumbor/55coU3IJRzsQ16uvkFvYoLl3Pkc=/200x200/filters:format(png)/media/None/image/original.png',
    permissionsId: 'edit',
    isOwner: true,
  },
  {
    id: 'morochgfx@gmail.com',
    mainText: 'morochgfx@gmail.com',
    secondaryText: 'Outside of Team',
    permissionsId: 'edit',
  },
  {
    address: '',
    id: 'maria.mart@gmail.com',
    mainText: 'Maria Martinez',
    secondaryText: 'maria.mart@gmail.com',
    imageSrc: 'https://aboutfaceskincare.com/wp-content/uploads/2019/11/About-Face-Skincare1172_pp-1-e1574785727292.jpg',
    permissionsId: 'edit',
  },
  {
    id: 'morochroyce@gmail.com2',
    mainText: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus recusandae est nobis quia exercitationem error harum ex laborum molestiae beatae molestias itaque voluptas soluta, eos dignissimos! In inventore autem asperiores!',
    secondaryText: 'morochroyceconsecteturadipisicing@gmail.com',
    permissionsId: 'edit',
  },
  {
    id: 'asd123@gmail.com',
    mainText: 'asd123@gmail.com',
    secondaryText: 'Outside of Team',
    permissionsId: 'edit',
  },
  {
    id: 'mon.kallen@gmail.com4',
    mainText: 'Mon Kallen',
    secondaryText: 'mon.kallen@gmail.com4',
    permissionsId: 'edit',
  },
];

/* eslint-disable react/jsx-props-no-spreading */
const SharingModal = (props) => {
  const {
    className,
    closeModal,
    selectedObjects,
  } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const state = useSelector((s) => s.detailsPanel.share);

  const [usernames, setUsernames] = React.useState([]);
  const i18n = {
    memberInput: {
      shareVia: t('modals.sharingModal.shareVia'),
      to: t('modals.sharingModal.to'),
      placeholder: t('modals.sharingModal.inputPlaceholder'),
    },
    collaboratorList: {
      owner: t('common.owner'),
      shareButton: t('modals.sharingModal.shareEmailButton'),
    },
  };

  /* eslint-disable no-console */
  const onChangeUserPermissions = (...args) => {
    console.log('onChangeUserPermissions', ...args);
  };

  const onChangeInputPermissions = (...args) => {
    console.log('onChangeInputPermissions', ...args);
  };

  const onClickSettings = () => {
    console.log('click settings');
  };

  /* eslint-disable no-unused-vars */
  const onShare = (event) => {
    event.preventDefault();

    dispatch({
      type: SHARE_TYPES.ON_SHARE_FILE_BY_PUBLIC_KEY,
    });
  };

  React.useEffect(() => (
    () => {
      dispatch({
        type: SHARE_TYPES.ON_SHARE_FILE_BY_PUBLIC_KEY_RESET,
      });
    }
  ), []);

  React.useEffect(() => {
    if (state.shareFileByPublicKey.loading) {
      shareFilesByPublicKey({
        publicKeys: [],
        paths: selectedObjects.map((obj) => obj.key),
      });
    }
  }, [state.shareFileByPublicKey.loading]);

  React.useEffect(() => {
    if (state.shareFileByPublicKey.success) {
      closeModal();
    }
  }, [state.shareFileByPublicKey.success]);

  return (
    <BaseModal onClose={closeModal} maxWidth={460}>
      <div
        className={classnames(
          classes.root,
          className,
        )}
      >
        <Header
          ext={get(selectedObjects, '[0].ext', '')}
          className={classes.header}
          onClickSettings={onClickSettings}
        >
          {get(selectedObjects, '[0].name', '')}
        </Header>
        <MemberInput
          options={getOptions(t)}
          i18n={i18n.memberInput}
          className={classes.memberInput}
          onChange={onChangeInputPermissions}
          setUsernames={setUsernames}
          usernames={usernames}
          collaborators={collaborators}
        />
        <CollaboratorList
          i18n={i18n.collaboratorList}
          collaborators={collaborators}
          options={getOptions(t, true)}
          className={classes.collaboratorList}
          onChangePermissions={onChangeUserPermissions}
          onShare={onShare}
        />
      </div>
      <div
        className={classes.footer}
      >
        Implement Share Link
      </div>
    </BaseModal>
  );
};

SharingModal.defaultProps = {
  className: null,
  selectedObjects: [],
};

SharingModal.propTypes = {
  className: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  selectedObjects: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    ext: PropTypes.string,
    name: PropTypes.string,
    members: PropTypes.arrayOf(PropTypes.shape({
      address: PropTypes.string,
      publicKey: PropTypes.string,
    })),
  })),
};

export default SharingModal;
