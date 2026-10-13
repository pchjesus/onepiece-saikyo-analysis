// @vitest-environment jsdom
import { act } from 'react'
import {createRoot} from 'react-dom/client'
import {describe,it,expect} from 'vitest'
import {CharacterPortrait} from './CharacterPortrait'

describe('v0.2.0 portraits show non-image fallback when no approved asset exists',()=>{
  it('renders a small and large accessible surrounding identity without network requests',async()=>{
    ;(globalThis as typeof globalThis &{IS_REACT_ACT_ENVIRONMENT:boolean}).IS_REACT_ACT_ENVIRONMENT=true
    const host=document.createElement('div')
    const root=createRoot(host)
    try{
      await act(async()=>root.render(<div>
        <CharacterPortrait characterId="marco" groupId="whitebeard-pirates" name="마르코" size="large"/>
        <CharacterPortrait characterId="smoker" groupId="marines" name="스모커" size="small"/>
      </div>))
      expect(host.querySelectorAll('img')).toHaveLength(0)
      expect(host.querySelectorAll('.character-portrait-fallback')).toHaveLength(2)
      expect(host.querySelector('.character-portrait-large')?.textContent).toBe('마르')
      expect(host.querySelector('.character-portrait-small')?.textContent).toBe('스모')
    }finally{await act(async()=>root.unmount())}
  })
})
