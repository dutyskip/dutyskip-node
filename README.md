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
#### Sample Request
```javascript
import Dutyskip from 'dutyskip'
const dutyskip = new Dutyskip('<api-key>')

void (async () => {
  const results = await dutyskip.hs.search({ q: 'chapstick', country: 'canada' })
  console.log(results)
})()
```
#### Sample Response
```json
{
  "numResults": 1,
  "items": [
    {
      "code": "3304.99.90.90",
      "description": "Other",
      "subheading": "3304.99",
      "duty": "6.5",
      "pga": [
        {
          "agency": "HC"
          "program": "Consumer Product Safety",
        },
        {
          "agency": "HC",
          "program": "Human Drugs",
        },
        {
          "agency": "HC",
          "program": "Consumer Product Safety",
        }
      ],
      "descriptionPath": "Beauty or make-up preparations and preparations for the care of the skin (other than medicaments), including sunscreen or sun tan preparations; manicure or pedicure preparations. > Other: > Other > Other > Other"
    }
  ]
}
```
