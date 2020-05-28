import React, { useState, useRef } from 'react';
import { fetchObjects } from '@events';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';

const SetUpWD = () => {
  const [value, setValue] = useState(localStorage.getItem('_wd'));

  const ref = useRef();
  const classes = useStyles();

  const onCancel = () => {
    ref.current.style.display = 'none';
  };

  const onSave = () => {
    localStorage.setItem('_wd', value);
    fetchObjects();
    ref.current.style.display = 'none';
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div
      ref={ref}
      id="setup-wd"
      className={classes.root}
    >
      <div className={classes.container}>
        <Typography variant="h6">
          Setup your work directory
        </Typography>
        <TextField
          type="text"
          label="work directory"
          variant="outlined"
          color="primary"
          onChange={onChange}
          value={value}
        />
        <div className={classes.buttonsContainer}>
          <Button
            variant="contained"
            color="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={onSave}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SetUpWD;
