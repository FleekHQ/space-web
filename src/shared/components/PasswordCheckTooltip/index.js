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
  const test1 = /.{8,}/.test(password);
  const test2 = /[A-Z]/.test(password) && /[a-z]/.test(password);
  const test3 = /[0-9]/.test(password);

  const successfulCheck = test1 && test2 && test3;

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
            isCorrect={test1}
            requirement={t('modules.shared.passwordCheck.requirements.charLength')}
          />
          <Requirement
            isCorrect={test2}
            requirement={t('modules.shared.passwordCheck.requirements.upperCase')}
          />
          <Requirement
            isCorrect={test3}
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
