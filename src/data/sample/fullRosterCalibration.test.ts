import { describe, expect, it } from 'vitest'
import { sampleEvaluations } from './evaluations'
import { sampleCharacters } from './characters'
import { sampleMatchups } from './matchups'
import { sampleMemberships } from './memberships'
import { getStatRanking } from '../../application/getStatRanking'
import { getRawHakiContributionTotal } from '../../domain/evaluation/score'
import { getCombatPower } from '../../application/getCombatPower'
import { validateEvaluation } from '../../domain/evaluation/validation'
import { sampleEvidence } from './evidence'

/** v0.1.46 Golden baseline: check all 53 untouched characters, not only modified scores. */
const untouchedBaseline: Record<string, number[]> = {
  "akainu": [
    97,
    95,
    96,
    86,
    91,
    91,
    91
  ],
  "ashura-doji": [
    80,
    77,
    81,
    74,
    80,
    75,
    71
  ],
  "black-maria": [
    74,
    72,
    75,
    69,
    80,
    74,
    84
  ],
  "burgess": [
    76,
    74,
    79,
    74,
    72,
    70,
    74
  ],
  "cracker": [
    77,
    81,
    80,
    75,
    80,
    75,
    77
  ],
  "crocodile": [
    76,
    72,
    77,
    74,
    86,
    86,
    82
  ],
  "denjiro": [
    78,
    77,
    80,
    77,
    85,
    79,
    72
  ],
  "doflamingo": [
    76,
    74,
    81,
    75,
    87,
    81,
    83
  ],
  "fujitora": [
    91,
    88,
    87,
    85,
    92,
    86,
    94
  ],
  "gaban": [
    91,
    90,
    92,
    94,
    95,
    95,
    88
  ],
  "garp": [
    99,
    99,
    99,
    98,
    99,
    97,
    91
  ],
  "hancock": [
    79,
    76,
    77,
    80,
    82,
    75,
    82
  ],
  "inuarashi": [
    80,
    81,
    83,
    79,
    78,
    77,
    76
  ],
  "jinbe": [
    78,
    80,
    80,
    77,
    83,
    80,
    79
  ],
  "jozu": [
    78,
    84,
    78,
    79,
    74,
    75,
    74
  ],
  "kaido": [
    98,
    100,
    100,
    96,
    96,
    91,
    96
  ],
  "kaku": [
    73,
    72,
    75,
    75,
    79,
    72,
    74
  ],
  "kanjuro": [
    68,
    68,
    73,
    71,
    86,
    76,
    84
  ],
  "kawamatsu": [
    77,
    74,
    75,
    74,
    80,
    73,
    70
  ],
  "kikunojo": [
    74,
    72,
    75,
    76,
    79,
    72,
    69
  ],
  "killer": [
    79,
    76,
    80,
    81,
    82,
    84,
    72
  ],
  "kinemon": [
    76,
    74,
    81,
    75,
    79,
    71,
    78
  ],
  "kizaru": [
    92,
    89,
    91,
    99,
    93,
    90,
    91
  ],
  "kuzan": [
    93,
    93,
    97,
    90,
    93,
    91,
    92
  ],
  "law": [
    86,
    83,
    85,
    82,
    90,
    88,
    91
  ],
  "linlin": [
    98,
    99,
    99,
    89,
    94,
    84,
    97
  ],
  "lucci": [
    80,
    77,
    82,
    82,
    83,
    68,
    74
  ],
  "mihawk": [
    96,
    93,
    91,
    94,
    99,
    92,
    84
  ],
  "morley": [
    76,
    80,
    77,
    77,
    83,
    75,
    87
  ],
  "nekomamushi": [
    80,
    80,
    82,
    79,
    78,
    75,
    76
  ],
  "newgate": [
    100,
    99,
    99,
    96,
    98,
    95,
    96
  ],
  "page-one": [
    74,
    76,
    79,
    69,
    65,
    65,
    63
  ],
  "pizarro": [
    72,
    74,
    74,
    64,
    74,
    70,
    74
  ],
  "queen": [
    80,
    81,
    81,
    75,
    79,
    74,
    80
  ],
  "raizo": [
    68,
    69,
    76,
    72,
    80,
    78,
    84
  ],
  "rayleigh": [
    94,
    92,
    91,
    93,
    96,
    95,
    89
  ],
  "rocks": [
    100,
    98,
    97,
    98,
    98,
    96,
    94
  ],
  "roger": [
    100,
    99,
    99,
    98,
    99,
    97,
    91
  ],
  "ryokugyu": [
    90,
    89,
    89,
    84,
    87,
    82,
    92
  ],
  "sabo": [
    87,
    83,
    82,
    86,
    88,
    86,
    87
  ],
  "sanji": [
    83,
    85,
    85,
    91,
    84,
    81,
    82
  ],
  "sasaki": [
    77,
    79,
    78,
    70,
    70,
    68,
    69
  ],
  "shanks": [
    97,
    91,
    88,
    95,
    96,
    93,
    88
  ],
  "shiryu": [
    78,
    74,
    75,
    79,
    78,
    78,
    78
  ],
  "smoothie": [
    76,
    75,
    76,
    74,
    80,
    77,
    78
  ],
  "stussy": [
    73,
    72,
    70,
    80,
    86,
    85,
    77
  ],
  "teach": [
    95,
    89,
    95,
    82,
    93,
    87,
    93
  ],
  "ulti": [
    78,
    77,
    84,
    80,
    73,
    66,
    68
  ],
  "van-augur": [
    72,
    67,
    68,
    75,
    80,
    78,
    82
  ],
  "vista": [
    82,
    79,
    77,
    80,
    87,
    77,
    74
  ],
  "whos-who": [
    79,
    75,
    79,
    81,
    80,
    72,
    74
  ],
  "x-drake": [
    78,
    79,
    82,
    76,
    78,
    74,
    74
  ],
  "zoro": [
    90,
    83,
    87,
    83,
    87,
    82,
    81
  ]
}
const changed: Record<string, {before:number[];after:number[]}> = {
  "jack": {
    "before": [
      74,
      80,
      84,
      73,
      71,
      70,
      72
    ],
    "after": [
      79,
      84,
      88,
      75,
      75,
      72,
      74
    ]
  },
  "kid": {
    "before": [
      87,
      82,
      87,
      78,
      85,
      73,
      86
    ],
    "after": [
      92,
      86,
      90,
      82,
      89,
      73,
      80
    ]
  },
  "karasu": {
    "before": [
      79,
      75,
      74,
      83,
      83,
      80,
      86
    ],
    "after": [
      76,
      74,
      74,
      82,
      81,
      74,
      84
    ]
  },
  "marco": {
    "before": [
      77,
      85,
      84,
      81,
      81,
      79,
      85
    ],
    "after": [
      77,
      87,
      87,
      82,
      84,
      80,
      87
    ]
  },
  "king": {
    "before": [
      83,
      86,
      82,
      82,
      80,
      76,
      80
    ],
    "after": [
      85,
      88,
      85,
      83,
      81,
      77,
      82
    ]
  },
  "katakuri": {
    "before": [
      81,
      82,
      82,
      83,
      86,
      83,
      82
    ],
    "after": [
      83,
      84,
      84,
      84,
      87,
      84,
      84
    ]
  }
}
const sevenAxes=['attack','defense','stamina','speed','techniqueMastery','combatIQ','versatility']

describe('v0.1.47 evidence-based A-path all-axis calibration regression', () => {
  const all = sampleEvaluations.filter(e => e.isDefault !== false)
  const byId = (id:string) => all.find(e => e.characterId===id)!
  const vals = (id:string) => byId(id).items.map(i=>i.score)
  const overall=(id:string)=> getCombatPower(id).finalScore

  it('preserves 53 untouched characters, all 371 axes exactly, and 6 scoped recalibrations', () => {
    expect(all).toHaveLength(59)
    expect(new Set(all.map(e=>e.characterId)).size).toBe(59)
    expect(Object.keys(untouchedBaseline)).toHaveLength(53)
    for (const [id,scores] of Object.entries(untouchedBaseline)){
      expect(vals(id),id).toEqual(scores)
    }
    for (const [id, expected] of Object.entries(changed)) {
      expect(expected.before).toHaveLength(7)
      expect(vals(id),id).toEqual(expected.after)
      expect(overall(id),id).toBeCloseTo(expected.after.reduce((a,b)=>a+b,0)/7,8)
      expect(byId(id).evaluationDataVersion).toBe('evaluation-0.1.47-evidence-calibrated-A')
    }
  })

  it('validates all 59×7 calculation/evidence links and preserves approved Haki contributions', () => {
    const links=sampleEvidence.map(e=>({id:e.id,subjectCharacterId:e.subjectCharacterId}))
    expect(sampleCharacters).toHaveLength(60)
    expect(sampleMemberships).toHaveLength(73)
    expect(sampleEvaluations).toHaveLength(62)
    expect(sampleEvaluations.flatMap(e=>e.items)).toHaveLength(434)
    for (const evaluation of sampleEvaluations){
      expect(validateEvaluation(evaluation,links)).toEqual({valid:true,errors:[]})
      expect(evaluation.items.map(i=>i.stat)).toEqual(sevenAxes)
      // Prior legacy data deliberately retains 11 no-direct-evidence E3 axes (e.g. Sakazuki Speed).
      // Do not fabricate links or weaken owner/reference validation just to make all axes nonempty.
      if (Object.keys(changed).includes(evaluation.characterId)) {
        expect(evaluation.items.every(i=>i.evidenceIds.length>0),evaluation.characterId).toBe(true)
      }
    }
    expect(sampleEvaluations.flatMap(e=>e.items).reduce((sum,i)=>sum+getRawHakiContributionTotal(i),0)).toBe(230)
    expect(sampleEvaluations.flatMap(e=>e.items).filter(i=>i.evidenceIds.length===0)).toHaveLength(4)
    expect(sampleMatchups).toHaveLength(15)
    const king=byId('king'),katakuri=byId('katakuri')
    expect(king.items.find(i=>i.stat==='attack')?.baseScore).toBe(83)
    expect(king.items.find(i=>i.stat==='attack')?.score).toBe(85)
    expect(katakuri.items.find(i=>i.stat==='defense')?.baseScore).toBe(81)
    expect(katakuri.items.find(i=>i.stat==='defense')?.score).toBe(84)
    expect(katakuri.items.find(i=>i.stat==='techniqueMastery')?.score).toBe(87)
  })

  it('compares 7 axes horizontally; specialization matters instead of arbitrary crew-rank bonuses', () => {
    const stat=(id:string,key:string)=>byId(id).items.find(i=>i.stat===key)!.score
    // The example Garp (power) vs Marco is tested using actual Attack values, not invented illustrative data.
    expect(stat('garp','attack')).toBeGreaterThanOrEqual(95)
    expect(stat('garp','attack')-stat('marco','attack')).toBeGreaterThanOrEqual(15)
    expect(stat('kid','attack')).toBeGreaterThan(stat('law','attack'))
    expect(stat('kid','stamina')).toBeGreaterThan(stat('law','stamina'))
    expect(stat('kid','speed')).toBeGreaterThan(78)
    expect(stat('kid','versatility')).toBeLessThan(86)
    expect(stat('kid','versatility')).toBeLessThan(stat('law','versatility'))
    expect(stat('kid','combatIQ')).toBeLessThan(stat('law','combatIQ'))
    expect(stat('jack','stamina')).toBeGreaterThanOrEqual(stat('ulti','stamina'))
    for(const id of ['whos-who','x-drake','black-maria','ulti','sasaki','page-one']){
      expect(overall('jack')).toBeGreaterThan(overall(id))
    }
    expect(stat('marco','defense')).toBeGreaterThan(stat('queen','defense'))
    expect(stat('marco','stamina')).toBeGreaterThan(stat('queen','stamina'))
    expect(stat('king','defense')).toBeGreaterThan(stat('queen','defense'))
    expect(stat('katakuri','techniqueMastery')).toBeGreaterThan(stat('queen','techniqueMastery'))
    expect(stat('karasu','combatIQ')).toBeLessThan(stat('sabo','combatIQ'))
    const excluded=new Set(['law','mihawk','sabo','zoro','sanji'])
    const notTop=['karasu','jinbe','doflamingo','vista','morley','killer','crocodile','hancock','queen','lucci','cracker','stussy','jozu','shiryu','smoothie','jack','kaku', 'kinemon','denjiro','ashura-doji','kawamatsu','kikunojo','raizo','inuarashi','nekomamushi','kanjuro','whos-who','sasaki','black-maria','ulti','page-one','x-drake']
    for(const id of notTop) {
      expect(excluded.has(id)).toBe(false)
      for(const commander of ['king','marco','katakuri'])expect(overall(commander),commander+' vs '+id).toBeGreaterThan(overall(id))
    }
    expect(getStatRanking('overall')).toHaveLength(59)
  })
})
