import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { checkIsEmail } from '@utils';

import useStyles from './styles';
import Collaborator from '../../../../Collaborator';

const filter = createFilterOptions();

const MemberInput = (props) => {
  const {
    i18n,
    className,
    loading,
    identities,
    onSelectIdentity,
    onChangeSearchIdentityTerm,
    recentlySharedCollaborators,
  } = props;

  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState('');

  React.useEffect(() => {
    let debounce;

    if (searchTerm.length) {
      debounce = setTimeout(() => {
        onChangeSearchIdentityTerm(searchTerm);
      }, 600);
    }

    return () => {
      if (debounce) {
        clearTimeout(debounce);
      }
    };
  }, [searchTerm]);

  return (
    <div
      className={classnames(
        classes.root,
        className,
      )}
    >
      <Autocomplete
        fullWidth
        clearOnBlur
        selectOnFocus
        loading={loading}
        inputValue={searchTerm}
        loadingText={i18n.search}
        noOptionsText={i18n.notFound}
        options={recentlySharedCollaborators}
        getOptionLabel={(option) => option.mainText}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (
            !loading
            && identities.length === 0
            && params.inputValue.length > 0
          ) {
            filtered.push({
              id: 123123,
              add: true,
              email: params.inputValue,
              secondaryText: params.inputValue,
              mainText: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        renderInput={(params) => (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            fullWidth
            size="small"
            variant="outlined"
            label={i18n.placeholder}
            InputProps={{
              ...params.InputProps,
              endAdornment: () => null,
              disableUnderline: true,
            }}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder={i18n.placeholder}
          />
        )}
        renderOption={(option) => (
          <Collaborator
            imageSrc={option.imageSrc}
            mainText={option.mainText}
            secondaryText={option.secondaryText}
            onSelect={() => {
              if (
                (option.add && checkIsEmail(searchTerm))
                || checkIsEmail(option.mainText)
                || checkIsEmail(option.secondaryText)
              ) {
                if (option.add) {
                  onSelectIdentity({
                    publicKey: '',
                    secondaryText: '',
                    mainText: option.email,
                    id: (new Date()).getMilliseconds(),
                  });
                }
              } else {
                onSelectIdentity(option);
                setSearchTerm('');
              }
            }}
          />
        )}
      />
    </div>
  );
};

MemberInput.defaultProps = {
  className: null,
  identities: [],
  loading: false,
  recentlySharedCollaborators: [],
};

MemberInput.propTypes = {
  className: PropTypes.string,
  loading: PropTypes.bool,
  i18n: PropTypes.shape({
    to: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    notFound: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    shareVia: PropTypes.string.isRequired,
  }).isRequired,
  identities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    isOwner: PropTypes.bool,
    avatar: PropTypes.string,
    mainText: PropTypes.string,
    secondaryText: PropTypes.string,
    permissionsId: PropTypes.string,
  })),
  onSelectIdentity: PropTypes.func.isRequired,
  onChangeSearchIdentityTerm: PropTypes.func.isRequired,
  recentlySharedCollaborators: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    isOwner: PropTypes.bool,
    avatar: PropTypes.string,
    mainText: PropTypes.string,
    secondaryText: PropTypes.string,
    permissionsId: PropTypes.string,
  })),
};

export default MemberInput;
