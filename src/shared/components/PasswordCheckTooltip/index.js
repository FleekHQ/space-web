import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import InputTooltip, { Requirement } from '@ui/InputTooltip';

const PasswordCheckTooltip = ({
  open,
  password,
  children,
  bgColor,
  tooltipPlacement,
}) => {
  const { t } = useTranslation();
  const isLongEnough = /.{8,}/.test(password);
  const containsUpperLowerCase = /[A-Z]/.test(password) && /[a-z]/.test(password);
  const containsNumber = /[0-9]/.test(password);

  const successfulCheck = isLongEnough && containsUpperLowerCase && containsNumber;

  return (
    <InputTooltip
      bgColor={bgColor}
      title={t('modules.shared.passwordCheck.title')}
      tooltip={{
        open: open && !successfulCheck,
        arrow: true,
        placement: tooltipPlacement,
      }}
      requirements={(
        <>
          <Requirement
            isCorrect={isLongEnough}
            requirement={t('modules.shared.passwordCheck.requirements.charLength')}
          />
          <Requirement
            isCorrect={containsUpperLowerCase}
            requirement={t('modules.shared.passwordCheck.requirements.upperCase')}
          />
          <Requirement
            isCorrect={containsNumber}
            requirement={t('modules.shared.passwordCheck.requirements.number')}
          />
        </>
      )}
    >
      {children}
    </InputTooltip>
  );
};

PasswordCheckTooltip.defaultProps = {
  open: false,
  password: '',
  bgColor: 'primary',
  tooltipPlacement: 'right-start',
};

PasswordCheckTooltip.propTypes = {
  open: PropTypes.bool,
  bgColor: PropTypes.string,
  password: PropTypes.string,
  tooltipPlacement: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default PasswordCheckTooltip;
