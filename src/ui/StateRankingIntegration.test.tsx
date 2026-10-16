// @vitest-environment jsdom
import {act} from 'react'
import {createRoot} from 'react-dom/client'
import {describe,it,expect} from 'vitest'
import App from './App'

describe('v0.4.7 temporary Overall ranking selections',()=>{
  it('defaults to each multi-state fighter highest Overall, re-ranks locally, and resets on X/backdrop/Escape',async()=>{
    ;(globalThis as typeof globalThis & {IS_REACT_ACT_ENVIRONMENT:boolean}).IS_REACT_ACT_ENVIRONMENT=true
    const host=document.createElement('div');document.body.appendChild(host)
    const root=createRoot(host)
    const click=async(el:Element|null)=>{if(!(el instanceof HTMLElement))throw Error('missing UI element');await act(async()=>el.click())}
    const change=async(select:HTMLSelectElement,value:string)=>{await act(async()=>{const setter=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,'value')?.set;setter?.call(select,value);select.dispatchEvent(new Event('change',{bubbles:true}))})}
    const group=()=>host.querySelector<HTMLSelectElement>('#group-picker-select')!
    const choose=async(name:string)=>{const option=[...group().options].find(o=>o.textContent===name);if(!option)throw Error('missing group '+name);await change(group(),option.value)}
    const open=async()=>click(host.querySelector('button[aria-label="종합 전투력 전체 캐릭터 순위 보기"]'))
    const rank=(name:string)=>[...host.querySelectorAll<HTMLButtonElement>('.rank-row')].find(b=>b.textContent?.includes(name))!
    const state=(name:string)=>host.querySelector<HTMLSelectElement>(`select[aria-label="${name} 순위 평가 시점 선택"]`)!
    const close=async()=>click(host.querySelector('button[aria-label="순위 닫기"]'))
    try {
      await act(async()=>root.render(<App/>))
      await choose('밀짚모자 일당')
      await click([...host.querySelectorAll<HTMLButtonElement>('.character-chip')].find(b=>b.textContent?.includes('몽키 D. 루피'))!)
      await click([...host.querySelectorAll<HTMLButtonElement>('.evaluation-state-switcher button')].find(b=>b.textContent?.includes('기어 4 이하'))!)
      expect(host.querySelector('.power-card')?.textContent).toContain('90.7')
      await open()
      expect(host.querySelectorAll('.rank-row')).toHaveLength(82)
      expect(state('몽키 D. 루피').value).toBe('egghead-gear5')
      expect(rank('몽키 D. 루피').textContent).toContain('93.857')
      expect(state('에드워드 뉴게이트').value).toBe('prime')
      await change(state('몽키 D. 루피'),'egghead-gear4')
      expect(rank('몽키 D. 루피').textContent).toContain('90.714')
      expect(host.querySelectorAll('.rank-row')).toHaveLength(82)
      expect(host.querySelector('.power-card')?.textContent).toContain('90.7') // detail not changed by popup
      await click(host.querySelector('.rank-sort-controls button:last-child'))
      expect(host.querySelector<HTMLButtonElement>('.rank-sort-controls button:last-child')?.getAttribute('aria-pressed')).toBe('true')
      await close()
      expect(host.querySelector('.stat-rank-dialog')).toBeNull()
      await open()
      expect(state('몽키 D. 루피').value).toBe('egghead-gear5')
      expect(rank('몽키 D. 루피').textContent).toContain('93.857')
      expect(host.querySelector<HTMLButtonElement>('.rank-sort-controls button:first-child')?.getAttribute('aria-pressed')).toBe('true')
      await change(state('에드워드 뉴게이트'),'marineford')
      expect(rank('에드워드 뉴게이트').textContent).toContain('정상결전')
      expect(state('몽키 D. 루피').value).toBe('egghead-gear5')
      await act(async()=>{host.querySelector('.stat-info-backdrop')?.dispatchEvent(new MouseEvent('mousedown',{bubbles:true}))})
      expect(host.querySelector('.stat-rank-dialog')).toBeNull()
      await open()
      expect(state('에드워드 뉴게이트').value).toBe('prime')
      await change(state('몽키 D. 루피'),'egghead-gear4')
      await act(async()=>{document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}))})
      expect(host.querySelector('.stat-rank-dialog')).toBeNull()
      await open()
      expect(state('몽키 D. 루피').value).toBe('egghead-gear5')
      expect(host.querySelector('.power-card')?.textContent).toContain('90.7')
      await close()
      await choose('해군')
      await click([...host.querySelectorAll<HTMLButtonElement>('.character-chip')].find(b=>b.textContent?.includes('몽키 D. 가프'))!)
      await open()
      expect(state('몽키 D. 가프').value).toBe('prime')
    }finally{await act(async()=>root.unmount());host.remove()}
  })
})
