import { expect, test } from 'vitest'
import Dutyskip from '../dist'
const dutyskip = new Dutyskip('4b7f6118-555b-4dba-b0ec-7d2025745778', { protocol: 'https://', host: 'staging-api.dutyskip.com' })

test('hs search canada', async () => {
  const { items } = await dutyskip.hs.search('chapstick', 'canada') || {}
  const { code } = items[0]
  expect(code).toBe('3304.99.90.90')
})

test('hs search usa', async () => {
  const { items } = await dutyskip.hs.search('chapstick', 'usa') || {}
  const { code } = items[0]
  expect(code).toBe('3304.99.50.00')
})
