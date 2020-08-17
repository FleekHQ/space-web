import React from 'react';
import { storiesOf } from '@storybook/react';
import Avatar from '@ui/Avatar';
import Typography from '@ui/Typography';
import Box from '@material-ui/core/Box';
import ButtonBase from '@material-ui/core/ButtonBase';

import BaseCard from './index';
import { styled } from '@material-ui/core/styles';
import { Header, Section, Body } from './components';

const categoryName = 'Modal.Settings';

storiesOf(categoryName, module).add('BaseCard', () => {
  const defaultProps = {};

  const Container = styled(Box)({
    padding: 20,
    '& > *:not(:last-child)': {
      marginBottom: 10,
    },
  });

  return (
    <Container>
      <BaseCard>
        <Header>
          <Section>
            <Typography variant="body2">
              Display Name
            </Typography>
          </Section>
          <Section>
            <Typography variant="body2">
              Jason Kerro
            </Typography>
            <ButtonBase>
              <Typography variant="body2" color="textSecondary">Edit</Typography>
            </ButtonBase>
          </Section>
        </Header>
      </BaseCard>
      <BaseCard>
        <Header>
          <Section>
            <Typography variant="body2">
              Danger Zone
            </Typography>
          </Section>
          <Section>
            <ButtonBase>
              <Typography variant="body2" color="error">Delete Account</Typography>
            </ButtonBase>
          </Section>
        </Header>
      </BaseCard>

      <BaseCard>
        <Header>
          <Section>
            <Typography variant="body2">
              Profile Picture
            </Typography>
          </Section>
          <Section>
            <Avatar size={32} username="Test" />
            <ButtonBase>
              <Typography variant="body2" color="textSecondary">Edit</Typography>
            </ButtonBase>
          </Section>
        </Header>
      </BaseCard>

      <BaseCard>
        <Header>
          <Section>
            <Typography variant="body2">
              Paper Key
            </Typography>
          </Section>
          <Section>
            <ButtonBase>
              <Typography variant="body2" color="textSecondary">Download Paper Key</Typography>
            </ButtonBase>
          </Section>
        </Header>
        <Body>
          <div
            style={{
              borderRadius: 4,
              border: '1px solid black',
              height: 75,
              padding: 10,
            }}
          >
            Some Content
          </div>
        </Body>
      </BaseCard>
    </Container>
  );
});
