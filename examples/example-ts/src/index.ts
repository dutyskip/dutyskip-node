import Dutyskip from 'dutyskip'

const dutyskip = new Dutyskip(process.env?.DUTYSKIP_API_KEY as string)

void (async () => {
  const results = await dutyskip.hs.search({ q: 'chapstick', country: 'canada' })
  console.log(results)
})()
