// @vitest-environment jsdom
import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { afterEach, describe, expect, it } from 'vitest'
import { CharacterPortrait } from './CharacterPortrait'

describe('large portrait lightbox accessibility', () => {
  afterEach(() => { document.body.innerHTML='';document.body.style.overflow='' })
  it('shows uncropped larger image in dialog, closes with Escape and restores focus', async () => {
    ;(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT=true
    const host=document.createElement('div')
    document.body.append(host)
    const root=createRoot(host)
    try {
      await act(async()=>root.render(<CharacterPortrait characterId="marco" groupId="whitebeard-pirates" name="마르코" size="large" />))
      const trigger=host.querySelector<HTMLButtonElement>('.portrait-zoom-trigger')!
      expect(trigger).toBeTruthy()
      await act(async()=>trigger.click())
      const dialog=document.body.querySelector('[role="dialog"][aria-modal="true"]')
      expect(dialog?.querySelector('img')?.getAttribute('src')).toContain('marco.webp')
      expect(document.body.style.overflow).toBe('hidden')
      await act(async()=>document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true})))
      expect(document.body.querySelector('[role="dialog"]')).toBeNull()
      expect(document.activeElement).toBe(trigger)
      expect(document.body.style.overflow).toBe('')
    } finally { await act(async()=>root.unmount()) }
  })
  it('leaves small picker portraits noninteractive and unknown portraits as fallbacks', async()=>{
    const host=document.createElement('div');const root=createRoot(host)
    try{await act(async()=>root.render(<>
      <CharacterPortrait characterId="teach" groupId="blackbeard-pirates" name="티치" size="small"/>
      <CharacterPortrait characterId="buggy" groupId="cross-guild" name="버기" size="large"/>
    </>))
    expect(host.querySelector('.portrait-zoom-trigger')).toBeNull()
    expect(host.querySelectorAll('.character-portrait-fallback')).toHaveLength(1)
    }finally{await act(async()=>root.unmount())}
  })
})
