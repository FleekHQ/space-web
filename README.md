![Test Action Status](https://github.com/FleekHQ/desktop-storage/workflows/Test/badge.svg)
![Build-Pack-Release Action Status](https://github.com/FleekHQ/desktop-storage/workflows/Build-Pack-Release/badge.svg)

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

### Release
For the release process, will be just necessary to create and merge a PR from `develop` to `master` branch, but before creating that PR, it will be required two previous actions:
* Create a PR to `develop`, to update the app version based on semantic versioning, and push the tag as `v<APP_VERSION>`.
**Note 1**: `v` is strictly necessary. Ex, `git tag v0.0.1`
**Note 2**: By running `npm version <patch|minor|major>`, the tag is automatically created with `v`, it just required to be pushed. Ex, `git push origin --tags  `.
* Create a draft release selecting the tag version previously pushed.

After doing those actions, we are ready to create the PR to make the app release. When the release PR (`develop` to `master`) is merged, the CI process will be in charge of generating the installer for each OS (mac, linux, and windows) and links to the installers will be available on the [repository releases page](https://github.com/FleekHQ/desktop-storage/releases) based on the app version.
