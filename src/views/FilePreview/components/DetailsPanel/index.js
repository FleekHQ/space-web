import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CONTEXT_OPTION_IDS } from '@ui/ContextMenu';
import DetailsPanel, {
  Header,
  Divider,
  SharePanel,
  ObjectDetails,
} from '@shared/components/DetailsPanel';
import { VIEW_MODES } from '@shared/components/DetailsPanel/constants';

import useStyles from './styles';

const PreviewDetailsPanel = ({
  object,
  expanded,
  showTitle,
  onClose,
  disablePreview,
}) => {
  const classes = useStyles();
  const viewMode = VIEW_MODES.PREVIEW;

  const mapContextMenuItems = (menuOptions) => (
    menuOptions.filter((item) => item.id !== CONTEXT_OPTION_IDS.preview)
  );

  return (
    <div
      className={classnames(classes.root, {
        [classes.expanded]: expanded,
      })}
      data-prevent-details-panel-collapse="true"
    >
      <DetailsPanel
        viewMode={viewMode}
      >
        <Header
          viewMode={viewMode}
          objects={[object]}
          showTitle={showTitle}
          onClose={onClose}
          mapContextMenuItems={mapContextMenuItems}
          disablePreview={disablePreview}
        />
        <Divider viewMode={viewMode} />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <ObjectDetails viewMode={viewMode} {...object} />
        <SharePanel
          viewMode={viewMode}
          selectedObject={object}
          members={object.members}
        />
      </DetailsPanel>
    </div>
  );
};

PreviewDetailsPanel.defaultProps = {
  showTitle: false,
  onClose: () => {},
  disablePreview: false,
};

PreviewDetailsPanel.propTypes = {
  object: PropTypes.shape({
    ext: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    src: PropTypes.string,
    isUploading: PropTypes.bool,
    error: PropTypes.bool,
    type: PropTypes.string,
    isAvailableInSpace: PropTypes.bool,
    members: PropTypes.array,
  }).isRequired,
  expanded: PropTypes.bool.isRequired,
  showTitle: PropTypes.bool,
  onClose: PropTypes.func,
  disablePreview: PropTypes.bool,
};

export default PreviewDetailsPanel;
