// @vitest-environment jsdom
import {act} from 'react'
import {createRoot} from 'react-dom/client'
import {readFileSync} from 'node:fs'
import {resolve} from 'node:path'
import {describe,it,expect} from 'vitest'
import {MatchupHome} from './pages/MatchupHome'

describe('v0.4.6 matchup featured long state chip regression',()=>{
 it('keeps selected check inline rather than CSS grid column 4 wrap',async()=>{
   const css=readFileSync(resolve(process.cwd(),'src/ui/styles.css'),'utf8')
   const buttonRule=css.match(/\.matchup-picker button \{[^}]*\}/)?.[0]??''
   const activeMarkRule=css.match(/\.matchup-picker button\.selected::after \{[^}]*\}/)?.[0]??''
   expect(buttonRule).toContain('display: inline-flex')
   expect(buttonRule).toContain('white-space: nowrap')
   expect(buttonRule).not.toContain('grid-template-columns')
   expect(activeMarkRule).toContain('display: inline-flex')
   expect(activeMarkRule).not.toContain('grid-column')
   expect(css).toContain('.matchup-picker { display: flex; gap: 8px; overflow-x: auto;')
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
