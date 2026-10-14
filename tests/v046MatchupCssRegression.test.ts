import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

describe('v0.4.6 selected matchup state pill layout',()=>{
  it('prevents the selected checkmark moving to a grid fourth column',()=>{
    const css=readFileSync(resolve(process.cwd(),'src/ui/styles.css'),'utf8')
    const button=css.match(/\.matchup-picker button \{[^}]*\}/)?.[0]??''
    const check=css.match(/\.matchup-picker button\.selected::after \{[^}]*\}/)?.[0]??''
    expect(css).toContain('.matchup-picker { display: flex; gap: 8px; overflow-x: auto;')
    expect(button).toContain('display: inline-flex')
    expect(button).toContain('flex-wrap: nowrap')
    expect(button).toContain('white-space: nowrap')
    expect(button).not.toContain('grid-template-columns')
    expect(check).toContain('display: inline-flex')
    expect(check).not.toContain('grid-column')
  })
})
