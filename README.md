![Test Action Status](https://github.com/FleekHQ/space-desktop/workflows/Test/badge.svg)
![Build-Pack-Release Action Status](https://github.com/FleekHQ/space-desktop/workflows/Build-Pack-Release/badge.svg)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn electron:dev`
Run the electron project on dev mode

### `yarn clean`
Delete build and dist folders

### `yarn electron-pack [--mac, --linux, --win, --all]`
Build electron app to prod dist `yarn electron-pack --mac`

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Run dev mode + dameon process
On production builds the app tries to launch the daemon process from the resources builds. This behavior is disabled on dev mode, so you can run the daemon separately. If you want to run the daemon process from the app on dev mode you need to pass two env variables:
- `DEV_DAEMON=true` to allow execute the daemon on dev mode
- `DAEMON_PATH=/path/to/the/bin/daemon` this one points to the daemon bin on your machine

Also, if the daemon requires additional env variables, you need to pass those envs as well:

`DEV_DAEMON=true DAEMON_PATH=/path/to/the/bin/daemon SOME_DAEMON_ENV=foo yarn electron:dev`

You can also download the latest version of the daemon directly into the resource folder (same way as CI does). To do that you can run `yarn download-daemon`

### .env File
Take a look at the `.env.example` file to set the necessary environment variables with its right values when you run the project locally.

## Build app locally
The default behavior of the build process it's to try to sign the application. If you are not exporting the ENV variables required to sign the application, the build process is going to fail. If you want to skip the signing process in order to be able to run the build process locally you can pass the `CSC_IDENTITY_AUTO_DISCOVERY=false` env variable, so the sign step is going to be ignored

example:
`CSC_IDENTITY_AUTO_DISCOVERY=false yarn electron-pack --mac`  

if you want to run a build that was not signed, you need to pass an additional env variable before executing the app (to skip check for updates). Please read the next section

## Run build not signed
If you have a build not signed, you need to disable the "check-updates" events, otherwise, the app is going to break. To do that you just need to launch the app from the command line passing an env variable `SKIP_AUTOUPDATE=true`

so let's say that you have installed the app on your `Applications` folder (OSX), you just need to run the following command:

`SKIP_AUTOUPDATE=true open /Applications/Space.app/Contents/MacOS/Space`

also you can pass additional env variables if you needed (to pass env variables required by the daemon for example)

# Release
For the release process, will be just necessary to create and merge a PR from `develop` to `master` branch, but before creating that PR, it will be required two previous actions:
* Create a PR to `develop`, to update the app version based on semantic versioning, and push the tag as `v<APP_VERSION>`.
**Note 1**: `v` is strictly necessary. Ex, `git tag v0.0.1`
**Note 2**: By running `npm version <patch|minor|major>`, the tag is automatically created with `v`, it just required to be pushed. Ex, `git push origin --tags  `.
* Create a draft release selecting the tag version previously pushed.

After doing those actions, we are ready to create the PR to make the app release. When the release PR (`develop` to `master`) is merged, the CI process will be in charge of generating the installer for each OS (mac, linux, and windows) and links to the installers will be available on the [repository releases page](https://github.com/FleekHQ/space-desktop/releases) based on the app version.
