import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { faPlus } from '@fortawesome/pro-regular-svg-icons/faPlus';
import CreateNewMenu from '../CreateNewMenu';
import useItems from '../CreateNewMenu/hooks/useItems';
import useStyles from './styles';

const CreateNewButton = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const rootNodeRef = useRef(null);

  const toggleIsOpenMenu = () => setIsMenuOpen(!isMenuOpen);
  const items = useItems();

  return (
    <>
      {isMenuOpen && (
        <div className={classes.createNewMenu}>
          <CreateNewMenu
            close={toggleIsOpenMenu}
            items={items}
          />
        </div>
      )}
      <Button
        variant="contained"
        color="primary"
        className={classes.container}
        onClick={toggleIsOpenMenu}
        ref={rootNodeRef}
        // eslint-disable-next-line react/jsx-props-no-spreading
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
    </>
  );
};

export default CreateNewButton;
