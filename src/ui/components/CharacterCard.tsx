import type { Character } from '../../domain/character/types'

export function CharacterCard({ character, crewName, selected, onSelect }: {
  character: Character
  crewName: string
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button className={`character-card ${selected ? 'selected' : ''}`} onClick={onSelect}>
      <strong>{character.name}</strong>
      <span>{crewName}</span>
    </button>
  )
}
