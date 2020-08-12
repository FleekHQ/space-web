import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/pro-light-svg-icons/faQuestionCircle';
import Tooltip from '@material-ui/core/Tooltip';
import { useTranslation } from 'react-i18next';
import useStyles from './styles';

const IconsTooltip = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.container}>
      <Tooltip
        title={t('modules.storage.fileTable.head.tooltip')}
        placement="bottom"
      >
        {/* without this wrapper the tooltip will not appear */}
        <div className={classes.icon}>
          <FontAwesomeIcon
            icon={faQuestionCircle}
          />
        </div>
      </Tooltip>
    </div>
  );
};

export default IconsTooltip;
