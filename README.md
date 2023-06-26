# HASKI-Frontend

The bridge between AI backend models and LMS, wrapped in a web application.

The complete **technical documentation** can be found [here](https://github.com/HASKI-RAK/HASKI-Frontend/wiki/Modules).

## Setup

- Install a JavaScript Runtime like [Node.js](https://nodejs.org/).
- If you choose to use yarn as a package manager, install it globally via `npm install --global yarn`, otherwise use the `npm` equivalents in the following steps.
- Navigate into the root project directory, where `package.json` lays.
- Install the project dependencies via `yarn install`
- Add a .env.development file
- For production add a .env.development file

### .env files

The content of the .env.development or .env.production file gets injected at build time. The values will not be available at runtime. The .env file is not tracked by git.

```sh
# API
# Change the backend url to the correct one
BACKEND="http://fakedomain.com:5000"
MOODLE="http://fakedomain.com"
LOG_LEVEL="debug"
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

### Code style

We use [ESLint](https://eslint.org/) to enforce a consistent code style. A .prettierrc file is also included to format the code automatically.
Run `yarn lint` to check for errors. You can also use `yarn lint --fix` to automatically fix some of the errors.
It also runs `unimported` to check for unused imports. You will be prompted to install this package if you run `yarn lint` for the first time.

### Testing

We use [Jest](https://jestjs.io/) as a testing framework. Tests are located besides the actual files. The naming convention for test files is `*.test.(ts/tsx)`.

### IDE

Optional plugins for your development environment:
| Plugin | README | Explanaition |
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