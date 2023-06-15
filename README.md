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

### .env file

The content of the .env file gets injected at build time. The values will not be available at runtime. The .env file is not tracked by git.

```sh
# API
# Change the backend url to the correct one
BACKEND=http://localhost:8080
```

### Scripts

- Run for development: `yarn start`
- Build for production: `yarn build-prod`
- Serve production build: `yarn serve -s dist`
- Run tests: `yarn test`
- For linting: `yarn lint`

### IDE

Optional plugins for your development environment:
| Plugin | README | Explanation |
| ------ | ------ | ------ |
| SonarCube | https://www.sonarqube.org/ | SonarCloud will automatically scan the code for required standards and notify you in the merge request. |
| Babel JavaScript | https://babeljs.io/ | Compiles JavaScript. |
| ESLint | https://eslint.org/ | ESLint statically analyzes your code to quickly find problems. |
| JavaScript and TypeScript | https://github.com/microsoft/vscode-typescript-next.git | TypeScript version used to power JavaScript and TypeScript IntelliSense. |
| Npm Intellisense | https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense | Code completion for imports. |
