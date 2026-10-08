import { describe, expect, it } from 'vitest'
import { evaluationRepository } from './evaluationRepository'

describe('evaluationRepository multi-state lookup', () => {
  it('returns the default evaluation for normal character-level views', () => {
    expect(evaluationRepository.getEvaluation('garp')?.subjectState?.id).toBe('prime')
    expect(evaluationRepository.getEvaluation('marco')?.characterId).toBe('marco')
  })

  it('returns all multi-state legendary evaluations and resolves them explicitly', () => {
    const evaluations = evaluationRepository.getEvaluations('garp')
    expect(evaluations.map(({ subjectState }) => subjectState?.id)).toEqual(['prime', 'current'])
    expect(evaluationRepository.getEvaluation('garp', 'current')?.id).toBe('evaluation-garp-current')
    expect(evaluationRepository.getEvaluation('garp', 'prime')?.id).toBe('evaluation-garp')
    expect(evaluationRepository.getEvaluation('garp', 'missing')).toBeUndefined()

    expect(evaluationRepository.getEvaluations('rayleigh').map(({ subjectState }) => subjectState?.id)).toEqual(['prime', 'current'])
    expect(evaluationRepository.getEvaluation('rayleigh')?.subjectState?.id).toBe('prime')
    expect(evaluationRepository.getEvaluation('rayleigh', 'current')?.id).toBe('evaluation-rayleigh-current')

    expect(evaluationRepository.getEvaluations('newgate').map(({ subjectState }) => subjectState?.id)).toEqual(['prime', 'marineford'])
    expect(evaluationRepository.getEvaluation('newgate')?.subjectState?.id).toBe('prime')
    expect(evaluationRepository.getEvaluation('newgate', 'marineford')?.id).toBe('evaluation-newgate-marineford')

    expect(evaluationRepository.getEvaluations('gaban')).toHaveLength(1)
    expect(evaluationRepository.getEvaluation('gaban')?.subjectState?.id).toBe('current')
  })
})
