import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FleekTypography from '@ui/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import createFleekTheme from '@ui/theme';
import { useTranslation } from 'react-i18next';
const theme = createFleekTheme();

function App() {
  const { t } = useTranslation();


  const contextMenuConfig = ({
    t,
    openOnClick,
    openWithOnClick,
    starOnClick,
    shareOnClick,
    copyLinkOnClick,
    duplicateOnClick,
    renameOnClick,
    copyOnClick,
    deleteOnClick,
    viewInFolderOnClick,
    showOpenWith,
  }) => ([
    {
      label: t('contextMenu.open'), click: openOnClick,
    },
    ...(
      !showOpenWith 
      ? []
      : [
          {
            label: t('contextMenu.openWith'),
            click: openWithOnClick
          }
        ]
    ),
    {
      label: t('contextMenu.star'), click: starOnClick,
    },
    {
      type: 'separator',
    },
    {
      label: t('contextMenu.share'), click: shareOnClick,
    },
    {
      label: t('contextMenu.copyLink'), click: copyLinkOnClick,
    },
    {
      type: 'separator',
    },
    {
      label: t('contextMenu.duplicate'), click: duplicateOnClick,
    },
    {
      label: t('contextMenu.rename'), click: renameOnClick,
    },
    {
      label: t('contextMenu.copy'), click: copyOnClick,
    },
    {
      label: t('contextMenu.delete'), click: deleteOnClick,
    },
    {
      type: 'separator',
    },
    {
      label: t('contextMenu.viewInFolder'), click: viewInFolderOnClick,
    },
  ]);

  const menuItems = contextMenuConfig({ t });

  const { ContextMenuArea } = window;

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <ContextMenuArea menuItems={menuItems}>
          <div>Right click me to show a context menu!</div>
        </ContextMenuArea>
        <Typography>{t('test')}</Typography>
        <Typography variant="h6">Variant h6</Typography>
        <Typography variant="body1" color="primary">Variant body1</Typography>
        <Typography variant="body2" color="secondary">Variant body2</Typography>
        <Typography variant="body2" color="textSecondary">Variant body2</Typography>
        <Typography variant="body2" color="error">Variant body2</Typography>
        <Typography variant="caption">Variant caption</Typography>
        <br />
        <Typography variant="button">Variant button</Typography>
        <br />
        <Button color="primary">Button</Button>
        <Button variant="contained" color="primary">Button</Button>
        <Button variant="outlined" color="primary">Button</Button>
        <br />
        <Button color="secondary">Button</Button>
        <Button variant="contained" color="secondary">Button</Button>
        <Button variant="outlined" color="secondary">Button</Button>
        <br />
        <TextField value="value" />
        <br />
        Custom typography component:
        <FleekTypography color="accent" bold variant="h6">Content</FleekTypography>
      </ThemeProvider>
    </>
  );
}

export default App;
