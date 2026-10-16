import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

/** Responsive CSS contract only; browser viewport visual QA remains separate. */
describe('Charlos mobile-only profile layout contract', () => {
  const css = readFileSync(new URL('../src/ui/styles.css', import.meta.url),'utf8')
  const patchStart=css.indexOf('/* Charlos-only mobile polish and restored narrative;')
  const charlos=css.slice(patchStart)

  it('retains a bordered asterisk alias with separated intro sentences', () => {
    expect(patchStart).toBeGreaterThan(0)
    expect(charlos).toContain('.charlos-alias-badge')
    expect(charlos).toContain('border:1.5px solid #b18a42')
    expect(charlos).toContain('.charlos-alias-star')
    expect(charlos).toContain('.charlos-intro-description>span{display:block')
  })

  it('matches the normal detail-header structure and quote container while keeping noble colors', () => {
    expect(css).toContain('.charlos-detail .detail-heading.charlos-heading')
    expect(css).toContain('border-left:3px solid var(--identity-accent,#b18a42)')
    expect(css).toContain('background:#f4efe5')
    expect(css).toContain('.charlos-heading .detail-heading-profile')
    expect(css).toContain('align-items:flex-start')
    expect(css).toContain('.charlos-detail .charlos-meme-quote')
    expect(css).toContain('flex:1 1 100%')
    expect(css).toContain('border-radius:12px;background:#fffaf0')
    expect(css).toContain('@media(max-width:650px)')
    expect(css).toContain('.charlos-detail .charlos-meme-quote{padding:10px 12px;margin-top:4px;}')
  })

  it('allocates a full separate row to mobile one-line stat quips', () => {
    expect(charlos).toContain('@media(max-width:700px)')
    expect(charlos).toContain('.charlos-stat-text{display:contents;}')
    expect(charlos).toContain('.charlos-stat-text small{')
    expect(charlos).toContain('grid-column:1 / -1;grid-row:2;')
    expect(charlos).toContain('.charlos-bar{grid-column:1 / -1;grid-row:3;}')
    expect(charlos).toContain('@media(min-width:355px) and (max-width:700px)')
    expect(charlos).toContain('white-space:nowrap')
    expect(charlos).toContain('@media(max-width:354px)')
    expect(charlos).toContain('white-space:normal')
  })

  it('keeps the restored original text and new monologue in distinct visual blocks', () => {
    expect(charlos).toContain('.charlos-truth-rescue')
    expect(charlos).toContain('.charlos-truth-rescue .charlos-truth-line+')
  })
  it('uses identical font sizes for both truth quotations without a mobile downscale', () => {
    const originalQuoteSize = css.match(/\.charlos-truth-quote\{[^}]*font-size:([^;]+);/)?.[1]
    const restoredMonologueSize = css.match(/\.charlos-truth-rescue\{[^}]*font-size:([^;]+);/)?.[1]
    expect(originalQuoteSize).toBe('clamp(1.1rem,3.6vw,1.65rem)')
    expect(restoredMonologueSize).toBe(originalQuoteSize)
    expect(css).toContain('.charlos-truth-rescue{padding:18px 4px;}')
    expect(css).not.toContain('.charlos-truth-rescue{padding:18px 4px;font-size:')
  })

})
