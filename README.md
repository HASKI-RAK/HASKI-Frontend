# HASKI-Frontend

The bridge between AI backend models and a Learning Management System (LMS), wrapped nicely as a web application 🎁.

The complete **technical documentation** can be found [here](https://wiki.haski.app).

## Setup

- Install a JavaScript Runtime like [Node.js](https://nodejs.org/).
- If you choose to use yarn as a package manager, install it globally via `npm install --global yarn`, otherwise use the `npm` equivalents in the following steps.
- Navigate into the root project directory, where `package.json` lays.
- Install the project dependencies via `yarn install`
- Modify the `.env.development` or `.env.production file` to your needs (see below).

### .env files

The content of the .env.development or .env.production file gets injected at build time. The values will not be available at runtime. The .env file is not tracked by git.

```sh
# API
# Change the urls
BACKEND="http://fakedomain.com:5000"
MOODLE="http://fakedomain.com"
LOG_LEVEL="debug" # or info, warn, error
NODE_ENV="development" # or production
```

### Scripts

- Run for development: `yarn start`
- Build for production: `yarn build-prod`
- Serve production build: `yarn serve -s dist`
- Run tests: `yarn test`
- For linting: `yarn lint`

### Docker

- Build docker image: `docker build -t haski-frontend:latest .`
- Run docker image: `docker run -p 8080:80 haski-frontend:latest`

## Development

### Documentation

The documentation is located in the [wiki](https://wiki.haski.app). The project is structured in the following way:

- [Common](https://wiki.haski.app/modules/common)
- [Components](https://wiki.haski.app/modules/components)
- [Core](https://wiki.haski.app/modules/core)
- [Pages](https://wiki.haski.app/modules/pages)
- [Services](https://wiki.haski.app/modules/services)
- [Shared](https://wiki.haski.app/modules/shared)
- [Store](https://wiki.haski.app/modules/store)

### Architecture

The frontend is built with [React](https://reactjs.org/), a JavaScript library for building user interfaces. It is bootstrapped with [Create React App](

### Code style

We use [ESLint](https://eslint.org/) to enforce a consistent code style. A .prettierrc file is also included to format the code automatically.
Run `yarn lint` to check for errors.
It also runs `unimported` to check for unused imports. You will be prompted to install this package if you run `yarn lint` for the first time. You can run `yarn lint --fix` to fix some of the errors automatically.

### Testing

We use [Jest](https://jestjs.io/) as a testing framework. Tests are located besides the actual files. The naming convention for test files is `*.test.(ts/tsx)`.

### IDE

Optional plugins for your development environment:
| Plugin | README | Explanation |
| ------ | ------ | ------ |
| SonarCube | https://www.sonarqube.org/ | SonarCloud will automatically scan the code for required standards and notify you in the merge request. |
| Babel JavaScript | https://babeljs.io/ | Compiles JavaScript. |
| ESLint | https://eslint.org/ | ESLint statically analyzes your code to quickly find problems. |
| JavaScript and TypeScript | https://github.com/microsoft/vscode-typescript-next.git | TypeScript version used to power JavaScript and TypeScript IntelliSense. |
| Npm Intellisense | https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense | Code completion for imports. |
| Prettier | https://prettier.io/ | Code formatter. |
| Jest | https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest | Jest runner. |
| GitLens | https://gitlens.amod.io/ | GitLens supercharges the Git capabilities built into Visual Studio Code. |
| Git History | https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory | View git log, file history, compare branches or commits. |
