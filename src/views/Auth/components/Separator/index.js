import React from 'react';

import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import useStyles from './styles';

const Separator = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matchSmScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      mx={{
        xs: 0,
        md: '50px',
      }}
      mt={{
        xs: '20px',
        md: '59px',
      }}
      mb={{
        xs: '20px',
        md: 0,
      }}
      display="flex"
      alignItems="center"
      flexDirection={{
        xs: 'row',
        md: 'column',
      }}
    >
      <Box flex={1}>
        <Divider
          classes={{ root: classes.dividerRoot }}
          orientation={matchSmScreen ? 'horizontal' : 'vertical'}
        />
      </Box>
      <Box
        my={{
          xs: 0,
          md: '10px',
        }}
        mx={{
          xs: 1,
          md: 0,
        }}
      >
        <Typography>
          <Box component="span" color="#5A5A5A">
            or
          </Box>
        </Typography>
      </Box>
      <Box flex={1}>
        <Divider
          classes={{ root: classes.dividerRoot }}
          orientation={matchSmScreen ? 'horizontal' : 'vertical'}
        />
      </Box>
    </Box>
  );
};

export default Separator;
