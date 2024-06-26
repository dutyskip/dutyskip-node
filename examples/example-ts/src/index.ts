import Dutyskip from 'dutyskip'

const dutyskip = new Dutyskip(process.env?.DUTYSKIP_API_KEY as string)

void (async () => {
  const results = await dutyskip.search('chapstick', 'canada')
  console.log(results)
})()