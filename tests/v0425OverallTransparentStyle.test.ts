import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'

describe('v0.4.25 Overall displayed as transparent header typography',()=>{
  it('removes the tinted card, border and shadow while keeping a keyboard-focus affordance',()=>{
    const stylesheet=readFileSync('src/ui/styles.css','utf8')
    const section=stylesheet.split('/* v0.4.25 —')[1]
    expect(section).toBeDefined()
    const rule=section.match(/\.detail-heading:not\(\.charlos-heading\) \.power-card-heading\{([^}]*)\}/)?.[1]
    expect(rule).toContain('background:transparent')
    expect(rule).toContain('border:0')
    expect(rule).toContain('box-shadow:none')
    expect(rule).toContain('min-height:0')
    expect(rule).toContain('align-items:flex-end')
    expect(section).toContain('font-size:clamp(2.8rem,4.2vw,3.8rem)')
    expect(section).toContain('@media(max-width:760px)')
    expect(section).toContain('@media(max-width:380px)')
    expect(section).toContain('.power-card-heading:focus-visible')
  })
})
