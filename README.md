# HASKI-Frontend

The bridge between AI backend models and LMS, wrapped in a web application.

The complete **technical documentation** can be found [here](modules.md).

## Setup

- Install a JavaScript Runtime like [Node.js](https://nodejs.org/).
- If you choose to use yarn as a package manager, install it globally via `npm install --global yarn`, otherwise use the `npm` equivalents in the following steps.
- Navigate into the root project directory, where `package.json` lays.
- Install the project dependencies via `yarn install`
- Add a .env.development file and add the value `"BACKEND=http://localhost:5000"`
- For production add a .env.development file and change the its content into your actual backend adress, e.g. `BACKEND="https://84.213.212.2:5001"`

### Scripts

- Run for development: `yarn start`
- Build: `yarn build`
- Run tests: `yarn test`
- For linting: `yarn lint`

### IDE

Optional plugins for your development environment:
| Plugin | README | Explanaition |
| ------ | ------ | ------ |
| SonarCube | https://www.sonarqube.org/ | SonarCloud will automatically scan the code for required standards and notify you in the merge request. |
| Babel JavaScript | https://babeljs.io/ | Compiles JavaScript. |
| ESLint | https://eslint.org/ | ESLint statically analyzes your code to quickly find problems. |
| JavaScript and TypeScript | https://github.com/microsoft/vscode-typescript-next.git | TypeScript version used to power JavaScript and TypeScript IntelliSense. |
| Npm Intellisense | https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense | Code completion for imports. |
