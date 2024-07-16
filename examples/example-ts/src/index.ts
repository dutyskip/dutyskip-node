import Dutyskip from 'dutyskip'

const dutyskip = new Dutyskip(process.env?.DUTYSKIP_API_KEY as string)

void (async () => {
  try {
    const results = await dutyskip.hs.search({ q: 'chapstick', country: 'canada' })
    console.log(results)
  } catch (err: any) {
    console.log(err?.message)
  }
})()
