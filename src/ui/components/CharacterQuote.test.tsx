import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { CharacterQuote } from './CharacterQuote'
import { CharacterPage } from '../pages/CharacterPage'
import { getCharacterDetail } from '../../application/getCharacterDetail'

const renderCharacter = (characterId: string, groupId: string, stateId?: string) => renderToStaticMarkup(
  <CharacterPage characterId={characterId} groupId={groupId} selectedStateId={stateId}
    onSelectStat={() => {}} onCompareStat={() => {}} onSelectOverall={() => {}} />,
)

describe('v0.4.10 character-scoped quote UI', () => {
  it('renders Korean editorial translation and optionally reveals official Japanese source', () => {
    const markup = renderToStaticMarkup(<CharacterQuote characterId="ace" />)
    expect(markup).toContain('사랑해 줘서 고마워!')
    expect(markup).toContain('愛してくれて')
    expect(markup).toContain('한국어 자체 번역')
    expect(markup).toContain('원작 컷 미대조')
    expect(markup).toContain('rel="noopener noreferrer"')
    expect(markup).not.toContain('원작 제574화')
  })
  it('does not render a fake placeholder quote for pending or unknown characters', () => {
    expect(renderToStaticMarkup(<CharacterQuote characterId="maha" />)).toBe('')
    expect(renderToStaticMarkup(<CharacterQuote characterId="nobody" />)).toBe('')
    const html = renderCharacter('kaku', 'cp0')
    expect(html).toContain('class="character-quote"')
    expect(html).toContain('핵심 전투 스탯')
  })
  it('keeps one quote for all evaluation states and uses the selected character identity', () => {
    const states = getCharacterDetail('luffy','straw-hat-pirates')!.evaluations
    expect(states.length).toBeGreaterThan(1)
    for (const state of states) {
      const html = renderCharacter('luffy', 'straw-hat-pirates', state.subjectState?.id)
      expect(html.match(/class="character-quote"/g)).toHaveLength(1)
      expect(html).toContain('나는 해적왕이 될 거야!')
      expect(html).not.toContain('사랑해 줘서 고마워!')
    }
    expect(renderCharacter('ace','whitebeard-pirates')).toContain('사랑해 줘서 고마워!')
    expect(renderCharacter('ace','whitebeard-pirates')).not.toContain('나는 해적왕이 될 거야!')
  })
})
