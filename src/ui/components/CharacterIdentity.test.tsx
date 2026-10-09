// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { sampleGroups } from '../../data/sample/groups'
import { CharacterIdentity, characterIdentityStyle, getCharacterAccent } from './CharacterIdentity'

describe('small faction and admiral character identity cues', () => {
  const group = (id: string) => sampleGroups.find(g => g.id === id)!
  it('retains named admiral color identity independent of former/current group context', () => {
    expect(getCharacterAccent('marines', 'akainu')).toBe('#ac4c43')
    expect(getCharacterAccent('blackbeard-pirates', 'kuzan')).toBe('#4579ab')
    expect(getCharacterAccent('marines', 'kizaru')).toBe('#ab883b')
    expect(getCharacterAccent('marines', 'fujitora')).toBe('#826a9f')
    expect(getCharacterAccent('marines', 'ryokugyu')).toBe('#5e8769')
    expect(characterIdentityStyle('blackbeard-pirates', 'kuzan'))
      .toHaveProperty('--identity-accent', '#4579ab')
  })
  it('includes a compact self-drawn Whitebeard crescent-moustache skull on his final crew only', () => {
    const html = renderToStaticMarkup(<CharacterIdentity group={group('whitebeard-pirates')}
      characterId="newgate" showPastMembership={false}/>)
    expect(html).toContain('흰수염 해적단')
    expect(html).toContain('<svg')
    expect(html).toContain('수염 달린 해골')
    expect(html).not.toContain('과거 소속')
    const rocks = renderToStaticMarkup(<CharacterIdentity group={group('rocks-pirates')}
      characterId="newgate" showPastMembership/>)
    expect(rocks).toContain('과거 소속')
    expect(rocks).not.toContain('<svg')
  })
  it('replaces the generic rook with an original horned-skull Beasts icon', () => {
    const html = renderToStaticMarkup(<CharacterIdentity group={group('beasts-pirates')}
      characterId="kaido" showPastMembership={false}/>)
    expect(html).toContain('백수 해적단의 뿔 달린 해골 상징')
    expect(html).toContain('<svg')
    expect(html).not.toContain('♜')
    expect(html).not.toContain('과거 소속')
  })
  it('leaves wider application colors untouched and only supplies a local accent style', () => {
    const marks = ['beasts-pirates','big-mom-pirates','straw-hat-pirates',
      'blackbeard-pirates','red-hair-pirates'].map(id =>
      renderToStaticMarkup(<CharacterIdentity group={group(id)} characterId="x" showPastMembership={false}/>))
    expect(new Set(marks).size).toBe(5)
    expect(marks.every(mark => mark.includes('identity-mark'))).toBe(true)
  })
})
