import { useState } from 'react'
import { getCharacterList } from '../application/getCharacterList'
import { CharacterCard } from './components/CharacterCard'
import { CharacterPage } from './pages/CharacterPage'
import './styles.css'

const characterList = getCharacterList()

export default function App() {
  const [selectedId, setSelectedId] = useState(characterList[0]?.character.id ?? '')

  return (
    <div className="app-shell">
      <header>
        <p className="eyebrow">ONE PIECE · MVP</p>
        <h1>사최간 전투력 분석</h1>
        <p>Character → Evaluation → Calculation Model → Combat Power</p>
      </header>
      <section className="character-list" aria-label="캐릭터 목록">
        {characterList.map(({ character, crew }) => (
          <CharacterCard
            key={character.id}
            character={character}
            crewName={crew.name}
            selected={selectedId === character.id}
            onSelect={() => setSelectedId(character.id)}
          />
        ))}
      </section>
      {selectedId && <CharacterPage characterId={selectedId} />}
    </div>
  )
}
