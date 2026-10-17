import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { renderToStaticMarkup } from 'react-dom/server'
import { CharacterPage } from '../src/ui/pages/CharacterPage'

describe('v0.4.26 mobile Overall spacing and centering',()=>{
  it('centers a full-width transparent score between two very thin separators only below 760px',()=>{
    const css=readFileSync('src/ui/styles.css','utf8')
    const section=css.split('/* v0.4.26 — mobile-only')[1]
    expect(section).toBeDefined()
    expect(section).toContain('@media(max-width:760px)')
    const mobile=section.split('@media(prefers-reduced-motion')[0]
    expect(mobile).toContain('border-block:1px solid #e3e6e7')
    expect(mobile).toContain('flex:1 1 100%')
    expect(mobile).toContain('width:100%')
    expect(mobile).toContain('margin:0')
    expect(mobile).toContain('padding:9px 0 8px')
    expect(mobile).toContain('align-items:center')
    expect(mobile).toContain('text-align:center')
    expect(mobile).toContain('gap:1px')
    expect(mobile).toContain('padding-right:0')
    expect(mobile).toContain('row-gap:5px')
    expect(mobile).not.toContain('.charlos-heading .')
    // The desktop transparent styling still comes before the mobile-only override.
    expect(css).toContain('/* v0.4.25 — Overall as free-standing typography')
    expect(css.indexOf('/* v0.4.25 —')).toBeLessThan(css.indexOf('/* v0.4.26 —'))
  })
  it('retains overall ranking, help, seven bars and the existing Magellan portrait',()=>{
    const html=renderToStaticMarkup(<CharacterPage characterId="magellan" groupId="impel-down"
      onSelectStat={()=>{}} onCompareStat={()=>{}} onSelectOverall={()=>{}}/>)
    expect(html).toContain('magellan-v0422.png')
    expect(html).toContain('종합 전투력 전체 캐릭터 순위 보기')
    expect(html).toContain('종합점수 계산 및 해석 설명 보기')
    expect((html.match(/stat-bar-row/g)||[]).length).toBe(7)
    expect((html.match(/power-card-heading/g)||[]).length).toBe(1)
    expect(html).toContain('86.0')
  })
})
