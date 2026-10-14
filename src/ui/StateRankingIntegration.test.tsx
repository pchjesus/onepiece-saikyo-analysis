// @vitest-environment jsdom
import {act} from 'react'
import {createRoot} from 'react-dom/client'
import {describe,it,expect} from 'vitest'
import App from './App'

describe('v0.4.6 linked evaluation-state Overall ranking UX',()=>{
 it('uses the chosen Luffy gear and Whitebeard era, preserving one row and sync with detail',async()=>{
   ;(globalThis as typeof globalThis & {IS_REACT_ACT_ENVIRONMENT:boolean}).IS_REACT_ACT_ENVIRONMENT=true
   const host=document.createElement('div');document.body.appendChild(host)
   const root=createRoot(host)
   const click=async(el:Element|null)=>{if(!(el instanceof HTMLElement))throw Error('missing UI element');await act(async()=>el.click())}
   const change=async(select:HTMLSelectElement,value:string)=>{await act(async()=>{const setter=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,'value')?.set;setter?.call(select,value);select.dispatchEvent(new Event('change',{bubbles:true}))})}
   const group=()=>host.querySelector<HTMLSelectElement>('#group-picker-select')!
   const choose=async(name:string)=>{const option=[...group().options].find(o=>o.textContent===name);if(!option)throw Error('group missing '+name);await change(group(),option.value)}
   const rank=(name:string)=>[...host.querySelectorAll<HTMLButtonElement>('.rank-row')].find(b=>b.textContent?.includes(name))!
   try{
     await act(async()=>root.render(<App/>))
     await choose('밀짚모자 일당')
     const luffy=[...host.querySelectorAll<HTMLButtonElement>('.character-chip')].find(b=>b.textContent?.includes('몽키 D. 루피'))!
     await click(luffy)
     const gear4=[...host.querySelectorAll<HTMLButtonElement>('.evaluation-state-switcher button')].find(b=>b.textContent?.includes('기어 4 이하'))!
     await click(gear4)
     expect(gear4.getAttribute('aria-pressed')).toBe('true')
     expect(host.querySelector('.power-card')?.textContent).toContain('90.7')
     await click(host.querySelector('button[aria-label="종합 전투력 전체 캐릭터 순위 보기"]'))
     expect(host.querySelectorAll('.rank-row')).toHaveLength(72)
     expect(rank('몽키 D. 루피').textContent).toContain('90.714')
     const luffyControl=host.querySelector<HTMLSelectElement>('select[aria-label="몽키 D. 루피 순위 평가 시점 선택"]')!
     expect(luffyControl.value).toBe('egghead-gear4')
     await change(luffyControl,'egghead-gear5')
     expect(rank('몽키 D. 루피').textContent).toContain('93.857')
     expect(host.querySelectorAll('.rank-row')).toHaveLength(72)
     expect(host.querySelector('.power-card')?.textContent).toContain('93.9')
     await click(host.querySelector('button[aria-label="순위 닫기"]'))
     expect([...host.querySelectorAll('.evaluation-state-switcher button')].find(b=>b.textContent?.includes('기어 5'))?.getAttribute('aria-pressed')).toBe('true')
     await choose('흰수염 해적단')
     await click([...host.querySelectorAll<HTMLButtonElement>('.character-chip')].find(b=>b.textContent?.includes('에드워드 뉴게이트'))!)
     await click(host.querySelector('button[aria-label="종합 전투력 전체 캐릭터 순위 보기"]'))
     const whitebeardControl=host.querySelector<HTMLSelectElement>('select[aria-label="에드워드 뉴게이트 순위 평가 시점 선택"]')!
     expect(whitebeardControl.value).toBe('prime')
     const primeRank=rank('에드워드 뉴게이트').textContent!
     await change(whitebeardControl,'marineford')
     expect(rank('에드워드 뉴게이트').textContent).toContain('정상결전')
     expect(rank('에드워드 뉴게이트').textContent).not.toBe(primeRank)
     expect(host.querySelectorAll('.rank-row')).toHaveLength(72)
     await click(host.querySelector('button[aria-label="순위 닫기"]'))
     expect(host.querySelector('.power-card')?.textContent).toContain('종합')
     expect([...host.querySelectorAll('.evaluation-state-switcher button')].find(b=>b.textContent?.includes('정상결전'))?.getAttribute('aria-pressed')).toBe('true')
   }finally{await act(async()=>root.unmount());host.remove()}
 })
})
