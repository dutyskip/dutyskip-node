const Dutyskip = require('dutyskip')
require('dotenv').config()

const dutyskip = new Dutyskip(process.env?.DUTYSKIP_API_KEY)

void (async () => {
  const results = await dutyskip.hs.search({ q: 'chapstick', country: 'canada' })
  console.log(results)
})()
