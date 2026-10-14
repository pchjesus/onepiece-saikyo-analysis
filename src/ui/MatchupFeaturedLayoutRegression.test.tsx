// @vitest-environment jsdom
import {act} from 'react'
import {createRoot} from 'react-dom/client'
import {describe,it,expect} from 'vitest'
import {MatchupHome} from './pages/MatchupHome'

describe('v0.4.6 matchup featured long state chip regression',()=>{
 it('keeps selected check inline rather than CSS grid column 4 wrap',async()=>{
   ;(globalThis as typeof globalThis & {IS_REACT_ACT_ENVIRONMENT:boolean}).IS_REACT_ACT_ENVIRONMENT=true
   const host=document.createElement('div');document.body.appendChild(host)
   const root=createRoot(host)
   try{
     await act(async()=>root.render(<MatchupHome/>))
     const gear4=[...host.querySelectorAll<HTMLButtonElement>('.matchup-picker button')].find(b=>b.textContent?.includes('기어 4 이하')&&b.textContent?.includes('몽키 D. 루피'))!
     const gear5=[...host.querySelectorAll<HTMLButtonElement>('.matchup-picker button')].find(b=>b.textContent?.includes('기어 5 · 니카')&&b.textContent?.includes('몽키 D. 루피'))!
     expect(gear4).toBeDefined()
     expect(gear5).toBeDefined()
     expect(gear4.querySelector('.matchup-featured-state')?.textContent).toContain('기어 4 이하')
     await act(async()=>gear4.click())
     expect(gear4.getAttribute('aria-pressed')).toBe('true')
     expect(gear5.getAttribute('aria-pressed')).toBe('false')
     await act(async()=>gear5.click())
     expect(gear5.getAttribute('aria-pressed')).toBe('true')
     expect(gear4.getAttribute('aria-pressed')).toBe('false')
     expect(host.querySelector('.matchup-scoreboard')?.textContent).toContain('기어 5 · 니카')
   }finally{await act(async()=>root.unmount());host.remove()}
 })
})
