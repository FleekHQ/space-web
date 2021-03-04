![](https://fleek-team-bucket.storage.fleek.co/Blog%20Inline/space.png)

# Space Web
[![Fleek](https://img.shields.io/badge/Made%20by-Fleek-blue)](https://fleek.co/)
[![Dev Slack](https://img.shields.io/badge/Dev%20Slack-Channel-blue)](https://slack.fleek.co/)
[![License](https://img.shields.io/badge/License-MIT-green)](https://github.com/FleekHQ/space-sdk/blob/master/LICENSE)

This is the repository for the [Space Web Application](https://space.storage/), an open source, user-controlled, and encrypted file storage and sharing platform built on Open Web protocols by the team at [Fleek](https://fleek.co/).

The Space Web app is built using the [Space SDK](https://github.com/FleekHQ/space-sdk), an open source JS modular library that leverages protocols like IPFS, Filecoin, GunDB, Textile, and more to power the application's features:

- User-controlled storage on IPFS/Textile
- User-owned accounts, based on ETH keys
- Private file sharing on Textile Threads/Buckets
- Automatic Filecoin archiving

This project is community-driven and open source. Feel free to review Space's code, propose features, report features, or suggest integrations or new capabilities with the platform, or applications proposals to be integrated inside of Space (docs, editors, among other examples).

---

## Collaborating
**Creating Pull Requests**

Pull Requests are to be made on the Develop branch, where they will be reviewed and merged accordingly and from where they may be added to master once a new release is made. This basic flow helps us avoid conflicts when going live with changes.

Please be extra detailed about the purpose of your PR, and the work behind it.

**Are you reporting a bug or issue?**
Follow this simple template to make sure we get all the details necessary to debug and fix the issue.

1. Describe the bug.
2. Describe the steps to reproduce.
3. Describe the expected behavior upon fix.

That's all!

---

## Available Scripts

In the project directory, you can run:

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

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
