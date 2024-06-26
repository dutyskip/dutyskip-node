const Dutyskip = require('dutyskip')
require('dotenv').config()

const dutyskip = new Dutyskip(process.env?.DUTYSKIP_API_KEY)

void (async () => {
  const results = await dutyskip.search('chapstick', 'canada')
  console.log(results)
})()
