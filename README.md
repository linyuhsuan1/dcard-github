This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and TypeScript and Vite template.

# Dcard-Github-List

A webapp that imitate Dcard app.
Using Virtualized List and lazy data-loading to enhance app performance.
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fkylemocode%2Fdcard-reader.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fkylemocode%2Fdcard-reader?ref=badge_shield)

## Installation

```shell
$ git clone https://github.com/linyuhsuan1/dcard-github.git
$ cd dcard-github
$ npm install && npm run dev (or using yarn instead)
$ node ./api/proxy.js
```

## Features:

- [x] Github OAuth
- [x] Virtualized List
- [x] Infinite Scroll
- [x] Vite
- [x] Proxy Server
- [x] Github Action

## Source Code File Structure

```
├── .github
│   └── workflows
│       └──main.yml
├── api
│   └── proxy.ts
src
├── api
│   └── auth.ts
│   └── index.ts
│   └── list.ts
│   └── repo.ts
├── components
│   └── Button
│   └── Form
│   └── Input
│   └── List
├── constant
│   └── api.ts
│   └── config.ts
├── hook
│   └── useFetchIssue.tsx
├── layout
│   └── NavBar
│       └── NavBar
│   └── LoadingView
│   └── MsgView
├── Router
│   └── PageRoute.jsx
└── App.tsx
└── index.css
└── index.tsx
```
