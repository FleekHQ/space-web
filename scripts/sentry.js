/* eslint-disable no-console */
const SentryCli = require('@sentry/cli');

const createReleaseAndUpload = async () => {
  const release = process.env.REACT_APP_SENTRY_RELEASE;

  if (!release) {
    console.warn('REACT_APP_SENTRY_RELEASE env var null');
    return;
  }

  const cli = new SentryCli();

  try {
    console.log(`Release: ${release}`);
    await cli.releases.new(release);

    await cli.releases.uploadSourceMaps(release, {
      include: ['build/static/js'],
      urlPrefix: '~/static/js',
      rewrite: false,
    });

    await cli.releases.finalize(release);
  } catch (error) {
    console.error('Source maps uploading failed:', error);
  }
};

createReleaseAndUpload();
