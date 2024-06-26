# DutySkip API for Node.js
[![Version](https://img.shields.io/npm/v/dutyskip.svg)](https://www.npmjs.org/package/dutyskip)

Node.js / Typescript Module for DutySkip API

## DutySkip API
https://docs.dutyskip.com/api/

## Install
Use `pnpm` to install the module
```bash
pnpm install dutyskip
```
Or use `npm` to install the module
```bash
npm install dutyskip
```
Or use `yarn` to install the module
```bash
yarn add dutyskip
```

## Usage
### HS Classification Search
```javascript
import Dutyskip from 'dutyskip'
const dutyskip = new Dutyskip('<api-key>')

void (async () => {
  const results = await dutyskip.search('chapstick', 'canada')
  console.log(results)
})()
```

