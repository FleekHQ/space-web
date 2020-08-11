import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Tooltip from '@material-ui/core/Tooltip';

import Header from './components/Header';
import Requirement from './components/Requirement';

import useStyles, { useCustomToolTipStyles } from './styles';

const PasswordCheckTooltip = ({
  open,
  invert,
  password,
  children,
}) => {
  const classes = useStyles();
  const tooltipClasses = useCustomToolTipStyles({ invert });
  const { t } = useTranslation();

  return (
    <Tooltip
      arrow
      placement="right-start"
      open={open}
      classes={tooltipClasses}
      title={(
        <div className={classes.tooltipContent}>
          <Header t={t} />
          <div className={classes.requirementList}>
            <Requirement
              isCorrect={/[0-9]/.test(password)}
              requirement={t('modules.shared.passwordCheck.requirements.number')}
            />
            <Requirement
              isCorrect={/[A-Z]/.test(password)}
              requirement={t('modules.shared.passwordCheck.requirements.upperCase')}
            />
            <Requirement
              isCorrect={/[a-z]/.test(password)}
              requirement={t('modules.shared.passwordCheck.requirements.lowerCase')}
            />
            <Requirement
              isCorrect={/[\W]/.test(password)}
              requirement={t('modules.shared.passwordCheck.requirements.specialChar')}
            />
            <Requirement
              isCorrect={/.{8,}/.test(password)}
              requirement={t('modules.shared.passwordCheck.requirements.charLength')}
            />
          </div>
        </div>
      )}
    >
      {children}
    </Tooltip>
  );
};

PasswordCheckTooltip.defaultProps = {
  open: false,
  password: '',
  invert: false,
};

PasswordCheckTooltip.propTypes = {
  open: PropTypes.bool,
  invert: PropTypes.bool,
  password: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default PasswordCheckTooltip;
