import React, { useState } from 'react';
import PropTypes from 'prop-types';

import MuiTextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';

import useStyles from './styles';

const RainbowField = (props) => {
  const {
    errorMsg,
    onChange,
    onFocus,
    onBlur,
    isDark = false,
    className,
    endAdornment,
    ...restProps
  } = props;

  const [inputContent, setInputContent] = useState('');
  const [isInFocus, setIsInFocus] = useState(false);

  const isRainbowVisibile = inputContent !== '' || isInFocus;

  const classes = useStyles({ isDark, endAdornment });

  const handleOnChange = (e) => {
    setInputContent(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  const handleOnFocus = (e) => {
    setIsInFocus(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleOnBlur = (e) => {
    setIsInFocus(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <div className={className}>
      <div
        className={classnames({
          [classes.lessMargin]: isRainbowVisibile && !errorMsg,
        })}
      >
        <div
          className={classnames({
            [classes.rainbow]: isRainbowVisibile && isInFocus && !errorMsg,
            [classes.inactive]: !isRainbowVisibile && !errorMsg,
            [classes.dimRainbow]: isRainbowVisibile && !isInFocus && !errorMsg,
            [classes.error]: errorMsg,
          })}
        >
          <MuiTextField
            onChange={handleOnChange}
            classes={{
              root: classes.root,
            }}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            fullWidth
            error={!!errorMsg}
            variant="outlined"
            InputProps={{
              endAdornment,
              className: classes.field,
            }}
            InputLabelProps={{
              classes: {
                root: classes.label,
                error: classes.erroredLabel,
              },
            }}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...restProps}
          />
        </div>
      </div>
      {errorMsg && (
        <div className={classes.errorContainer}>
          <FontAwesomeIcon
            icon={faExclamationCircle}
            className={classes.errorIcon}
          />
          <Typography
            className={classes.errorText}
          >
            {errorMsg}
          </Typography>
        </div>
      )}
    </div>
  );
};

RainbowField.defaultProps = {
  errorMsg: null,
  error: false,
  onChange: null,
  onBlur: null,
  onFocus: null,
  isDark: null,
  className: null,
  endAdornment: null,
};

RainbowField.propTypes = {
  errorMsg: PropTypes.string,
  error: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  isDark: PropTypes.bool,
  className: PropTypes.string,
  endAdornment: PropTypes.element,
};

export default RainbowField;
