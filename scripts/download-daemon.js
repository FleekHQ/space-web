/* eslint-disable no-console */
const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
const ProgressBar = require('progress');

async function getDaemon() {
  const { cwd, platform } = process;
  const resourcesPath = path.resolve(cwd(), 'resources');

  let binaryPlatform = 'Linux';
  let ext = '';

  if (platform === 'darwin') {
    binaryPlatform = 'Darwin';
  }
  if (platform === 'win32' || platform === 'win64') {
    binaryPlatform = 'Windows';
    ext = '.exe';
  }

  const daemonURL = `https://github.com/FleekHQ/space-poc/releases/latest/download/space_${binaryPlatform}_x86_64${ext}`;
  const { data, headers } = await axios({
    method: 'GET',
    responseType: 'stream',
    url: daemonURL,
  }).catch((error) => {
    console.error(`\nError when trying to download the daemon binary from: ${daemonURL}`);
    console.error(`Error : ${error.stack || error.message}`);
    process.exit(1);
  });

  const totalLength = headers['content-length'];

  console.log(`Downloading space daemon binary from ${daemonURL}:`);
  const progressBar = new ProgressBar(`File: ${headers['content-disposition'].split(';')[1].trim()} [:bar] :percent :etas`, {
    width: 40,
    complete: '=',
    incomplete: ' ',
    renderThrottle: 1,
    total: parseInt(totalLength, 10),
  });

  fs.mkdirSync(resourcesPath);
  // save space-daemon on ./resources/
  const writer = fs.createWriteStream(path.join(resourcesPath, `space${ext}`), { mode: 0o755 });

  data.on('data', (chunk) => (
    progressBar.tick(chunk.length)
  ));

  data.on('error', (error) => {
    data.destroy();
    writer.destroy();

    console.error(`\nError when downloading the space daemon binary: ${error.stack || error.message}`);
    process.exit(1);
  });

  writer.on('finish', async () => {
    let tag = '';
    let name = '';
    try {
      const { data: spaceDaemonReleaseInfo } = await axios.get('https://api.github.com/repos/FleekHQ/space-daemon/releases/latest');
      name = spaceDaemonReleaseInfo.name;
      tag = spaceDaemonReleaseInfo.tag_name;
    } catch (error) {
      console.error(`Could not get space daemon name and tag info: ${error.message}`);
    }
    console.log('Space daemon was download successfully:');
    console.log(`\t•Tag: ${tag}`);
    console.log(`\t•Name: ${name}`);
    process.exit(0);
  });

  writer.on('error', (error) => {
    writer.destroy();

    console.error(`\nError when saving the space daemon binary: ${error.stack || error.message}`);
    process.exit(1);
  });

  data.pipe(writer);
}

getDaemon();
