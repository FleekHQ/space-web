import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { faPlus } from '@fortawesome/pro-regular-svg-icons/faPlus';
import { useTranslation } from 'react-i18next';
import useStyles from './styles';

const CreateNewButton = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  
  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.container}
      {...props}
    >
      <Typography className={classes.text}>
        {t('createNew')}
      </Typography>
      <div className={classes.plusContainer}>
        <FontAwesomeIcon
          icon={faPlus}
        />
      </div>
    </Button>
  );
};

export default CreateNewButton;
