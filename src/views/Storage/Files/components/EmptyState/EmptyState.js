import React from 'react';
import Typography from '@ui/Typography';
import { Trans, useTranslation } from 'react-i18next';

import useStyles from './styles';

const StorageMainView = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <img
        className={classes.emoji}
        src={`${process.env.PUBLIC_URL}/assets/images/yawning-face.png`}
        alt="yawning face"
      />
      <Typography weight="medium" className={classes.title}>
        {t('modules.storage.fileTable.empty.title')}
      </Typography>
      <Typography>
        <Trans
          i18nKey="modules.storage.fileTable.empty.message"
          components={[(<img
            className={classes.plusIcon}
            src={`${process.env.PUBLIC_URL}/assets/icons/plus_colors.png`}
            alt="add new icon"
          />)]}
        />
      </Typography>
    </div>
  );
};

export default StorageMainView;
