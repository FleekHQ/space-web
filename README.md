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

## Development

In the project directory, you can run:

### `yarn`
### `yarn start`

The application will run locally on localhost:3000

## Build for Publishing

### `yarn`
### `yarn build`

The application will be built in the `build` folder