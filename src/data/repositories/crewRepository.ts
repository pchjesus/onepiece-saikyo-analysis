import type { Crew } from '../../domain/character/types'
import { sampleCrews } from '../sample/crews'

export interface CrewRepository {
  getCrew(id: string): Crew | undefined
}

export const crewRepository: CrewRepository = {
  getCrew: (id) => sampleCrews.find((crew) => crew.id === id),
}
