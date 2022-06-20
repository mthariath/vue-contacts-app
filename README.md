# The Contacts App

A basic contact manager app built with Vue 3.

## Features

✨ Global state management featuring Pinia

✨ Loads up dummy data automatically on initial load

✨ Data persistence between reloads with LocalStorage

✨ GitHub Actions to deploy to Surge.sh

✨ Client-side routing with Vue Router

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Deploying with GitHub Actions

This repo is preconfigured to deploy to Surge.sh with GitHub Actions with every push to `main`. To customize the build steps, see `/.github/workflows/surge-deploy.yaml`

To use this feature, fork the repo to your GitHub account, navigate to the "Settings" tab of the repo, and add the following repository secrets: 

- `SURGE_URL` A Surge.sh URL that you have permission to deploy to.
- `SURGE_TOKEN` Your Surge.sh token.

GitHub will ✨automagically✨  build and deploy your repo on every commit to the `main` branch.

More details:

- [Surge.sh](https://surge.sh/)
- [Github Secrets](https://docs.github.com/en/actions)