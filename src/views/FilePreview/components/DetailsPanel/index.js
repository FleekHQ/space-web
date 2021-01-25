import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
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
}) => {
  const classes = useStyles();
  const viewMode = VIEW_MODES.PREVIEW;

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
        />
        <Divider viewMode={viewMode} />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <ObjectDetails viewMode={viewMode} {...object} />
        <SharePanel
          viewMode={viewMode}
          selectedObject={object}
          members={[]}
        />
      </DetailsPanel>
    </div>
  );
};

PreviewDetailsPanel.defaultProps = {
  showTitle: false,
  onClose: () => {},
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
  }).isRequired,
  expanded: PropTypes.bool.isRequired,
  showTitle: PropTypes.bool,
  onClose: PropTypes.func,
};

export default PreviewDetailsPanel;
