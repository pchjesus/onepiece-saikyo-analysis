// @vitest-environment jsdom
import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import App from './App'

let container: HTMLDivElement
let root: Root

async function click(selector: string) {
  const node = container.querySelector<HTMLButtonElement>(selector)
  if (!node) throw new Error('Missing button: ' + selector)
  await act(async () => { node.click() })
}

async function changeOrganization(groupId: string) {
  const select = container.querySelector<HTMLSelectElement>('#organization-group')!
  await act(async () => {
    const setter = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value')?.set
    setter?.call(select, groupId)
    select.dispatchEvent(new Event('change', { bubbles: true }))
  })
}

beforeEach(async () => {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true
  container = document.createElement('div')
  document.body.appendChild(container)
  root = createRoot(container)
  await act(async () => { root.render(<App />) })
})
afterEach(async () => {
  await act(async () => { root.unmount() })
  container.remove()
})

describe('v0.4.8 Organization tab interactions', () => {
  it('shows a third top-level view and keeps existing stats and matchup views accessible', async () => {
    expect(container.querySelector('.character-selector')).not.toBeNull()
    await click('button[aria-label="조직도 화면"]')
    expect(container.querySelector('.organization-view')).not.toBeNull()
    expect(container.querySelector('.character-selector')).toBeNull()
    expect(container.querySelector('button[aria-label="조직도 화면"]')?.getAttribute('aria-pressed')).toBe('true')
    await click('button[aria-label="매치업 아레나 화면"]')
    expect(container.querySelector('.matchup-home')).not.toBeNull()
    await click('button[aria-label="스탯 분석 화면"]')
    expect(container.querySelector('.character-selector')).not.toBeNull()
  })

  it('shows current and former members together without a time selector', async () => {
    await click('button[aria-label="조직도 화면"]')
    await changeOrganization('marines')
    expect(container.querySelector('.organization-scope')).toBeNull()
    expect(container.querySelector('.organization-member[data-character-id="kuzan"]')).not.toBeNull()
    expect(container.querySelector('.organization-results')?.textContent).toContain('전 대장')
    await changeOrganization('roger-pirates')
    expect(container.querySelector('.organization-member[data-character-id="roger"]')).not.toBeNull()
    await changeOrganization('whitebeard-pirates')
    expect(container.querySelector('.organization-member[data-character-id="newgate"]')).not.toBeNull()
  })

  it('opens the original character detail from an organization card without editing score state', async () => {
    await click('button[aria-label="조직도 화면"]')
    await changeOrganization('blackbeard-pirates')
    expect(container.querySelector('.organization-member[data-character-id="teach"]')).not.toBeNull()
    await click('.organization-member[data-character-id="teach"]')
    expect(container.querySelector('button[aria-label="스탯 분석 화면"]')?.getAttribute('aria-pressed')).toBe('true')
    expect(container.querySelector('main.detail h1')?.textContent).toContain('티치')
    expect(container.querySelector<HTMLSelectElement>('#group-picker-select')?.value).toBe('blackbeard-pirates')
    expect(container.querySelector('.organization-view')).toBeNull()
    expect(container.querySelectorAll('.stat-compare-trigger')).toHaveLength(7)
  })

  it('shows historical affiliation and original subgroup role instead of an invented hierarchy', async () => {
    await click('button[aria-label="조직도 화면"]')
    await changeOrganization('beasts-pirates')
    const child = container.querySelector('.organization-section[data-group-id="tobiroppo"]')
    expect(child).not.toBeNull()
    expect(child?.querySelector('.organization-member[data-character-id="whos-who"]')).not.toBeNull()
    expect(container.querySelectorAll('.organization-member[data-character-id="x-drake"]')).toHaveLength(1)
    expect(container.querySelector('.organization-caveat')?.textContent).toContain('전투력 순위')
  })
})
