import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import DetailsPanel, {
  Header,
  // Divider,
  // SharePanel,
  // ObjectDetails,
} from '@shared/components/DetailsPanel';
import { VIEW_MODES } from '@shared/components/DetailsPanel/constants';

import useStyles from './styles';

const PreviewDetailsPanel = ({
  object,
  expanded,
}) => {
  const classes = useStyles();
  const viewMode = VIEW_MODES.PREVIEW;
  console.log(object);
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
        />
      </DetailsPanel>
    </div>
  );
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
};

export default PreviewDetailsPanel;
