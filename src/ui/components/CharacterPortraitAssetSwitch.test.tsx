// @vitest-environment jsdom
import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { describe, expect, it, vi } from 'vitest'
import { CharacterPortrait } from './CharacterPortrait'

vi.mock('../../data/media/characterPortraits',()=>({
  getCharacterPortraitAsset:(id:string)=>id==='mock-a'||id==='mock-b'?{
    fileName:id+'.webp',alt:id,sourceUrl:'https://example.org/'+id,
    permission:'licensed' as const,permissionNote:'permission verified for test'
  }:undefined,
}))

describe('permitted portrait attribution and retry state',()=>{
  it('credits large pictures and resets a failed picture after character switch',async()=>{
    ;(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT:boolean }).IS_REACT_ACT_ENVIRONMENT=true
    const node=document.createElement('div'),root=createRoot(node)
    document.body.appendChild(node)
    try{
      await act(async()=>root.render(<CharacterPortrait characterId="mock-a" groupId="test" name="A" size="large"/>))
      const first=node.querySelector<HTMLImageElement>('img')!
      expect(first).toBeTruthy()
      expect(node.querySelector<HTMLAnchorElement>('.portrait-attribution')?.href).toBe('https://example.org/mock-a')
      await act(async()=>first.dispatchEvent(new Event('error')))
      expect(node.querySelector('img')).toBeNull()
      expect(node.querySelector('.character-portrait-fallback')).toBeTruthy()
      await act(async()=>root.render(<CharacterPortrait characterId="mock-b" groupId="test" name="B" size="large"/>))
      expect(node.querySelector<HTMLImageElement>('img')?.getAttribute('alt')).toBe('mock-b')
      expect(node.querySelector<HTMLAnchorElement>('.portrait-attribution')?.href).toBe('https://example.org/mock-b')
    }finally{await act(async()=>root.unmount());node.remove()}
  })
})
