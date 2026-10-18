import { describe, expect, it } from 'vitest'
import {
  patchHistory,
  PATCH_CATEGORIES,
  categoryForPatchChange,
  type PatchChange,
} from './patchHistory'

describe('v0.1.81 typed patch-history categories',()=>{
  it('maps every existing change to one of four exclusive categories',()=>{
    expect(PATCH_CATEGORIES.map(x=>x.id)).toEqual(['stats','characters','features','analysis'])
    expect(PATCH_CATEGORIES.map(x=>x.label)).toEqual(['스탯 조정','캐릭터·소속','UI·기능','근거·분석'])
    const all=patchHistory.flatMap(p=>p.changes)
    expect(new Set(patchHistory.map(p=>p.version)).size).toBe(patchHistory.length)
    expect(patchHistory[0].version).toBe('v0.4.33')
    expect(patchHistory.find(x=>x.version==='v0.4.31')).toBeDefined()
    expect(all.length).toBeGreaterThan(20)
    for(const change of all){
      const matches=PATCH_CATEGORIES.filter(c=>(c.kinds as readonly string[]).includes(change.kind))
      expect(matches,change.title).toHaveLength(1)
      expect(categoryForPatchChange(change)).toBe(matches[0].id)
    }
    expect(new Set(all.map(categoryForPatchChange))).toEqual(new Set(PATCH_CATEGORIES.map(x=>x.id)))
  })

  it('keeps score adjustments in stats with before/after figures and reasons',()=>{
    const scores=patchHistory.flatMap(p=>p.changes).filter(x=>x.kind==='score')
    expect(scores).toHaveLength(168)
    for(const change of scores){
      expect(categoryForPatchChange(change)).toBe('stats')
      expect(change.before).toBeTypeOf('number')
      expect(change.after).toBeTypeOf('number')
      expect(change.before).not.toBe(change.after)
      expect(change.reason?.length).toBeGreaterThan(20)
    }
    const queen=patchHistory.find(x=>x.version==='v0.1.79')!.changes.find(x=>x.title==='퀸 범용성 조정')!
    expect([queen.before,queen.after]).toEqual([80,82])
  })

  it('does not require or show any extra rationale for the original history button addition',()=>{
    const original=patchHistory.find(x=>x.version==='v0.1.80')!.changes
      .find(x=>x.title==='패치 내역 버튼 추가')!
    expect(original.kind).toBe('feature')
    expect(categoryForPatchChange(original)).toBe('features')
    expect(original.detail).toBeUndefined()
    expect(original.reason).toBeUndefined()
    expect(original.evidence).toBeUndefined()
    const uiFix=patchHistory.find(p=>p.version==='v0.1.81')!.changes
    expect(uiFix.every(x=>categoryForPatchChange(x)==='features')).toBe(true)
  })

  it('keeps existing evidence audits distinct from character changes and score changes',()=>{
    const review=patchHistory.find(x=>x.version==='v0.1.80')!
    expect(review.changes.filter(x=>categoryForPatchChange(x)==='characters').map(x=>x.characterId).sort())
      .toEqual(['inazuma','ivankov','smoker','tashigi'])
    const audit=review.changes.filter(x=>x.kind==='evidence'&&x.title.endsWith('유지)'))
    expect(audit).toHaveLength(6)
    expect(audit.every(x=>x.detail?.includes('실제 유효타')&&x.reason)).toBe(true)
    expect(review.changes.find(x=>x.title==='패치 내역 버튼 추가')?.reason).toBeUndefined()
    expect(()=>categoryForPatchChange({kind:'unexpected',title:'잘못된 항목'} as unknown as PatchChange))
      .toThrow('Uncategorized patch change')
  })
})
