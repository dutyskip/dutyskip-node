import Dutyskip from 'dutyskip'
import 'dotenv/config'

const dutyskip = new Dutyskip(process.env?.DUTYSKIP_API_KEY)

void (async () => {
  try {
    const results = await dutyskip.hs.search({ q: 'chapstick', country: 'canada' })
    console.log(results)
  } catch (err) {
    console.log(err.message)
  }
})()
