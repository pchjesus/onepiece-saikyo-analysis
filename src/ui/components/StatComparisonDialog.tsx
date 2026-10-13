import { useEffect, useMemo, useRef, useState } from 'react'
import { COMBAT_STAT_DEFINITIONS } from '../../domain/evaluation/statDefinitions'
import type { CombatStat } from '../../domain/evaluation/types'
import { getStatRanking } from '../../application/getStatRanking'
import { getStatComparison, getStatComparisonRoster, type StatComparisonSide } from '../../application/getStatComparison'
import { normalizeCharacterNamesForDisplay } from '../../domain/character/normalizeCharacterNamesForDisplay'
import { CharacterPortrait } from './CharacterPortrait'

type Props={stat:CombatStat;primaryId:string;primaryStateId?:string;onClose:()=>void}
const roleLabels={primary:'주요',secondary:'보조',context:'상황 참고'} as const
const attackDimensions=[['peakOutput','순간 최대 출력'],['verifiedHit','실제 유효타'],['sustainedPressure','지속 화력'],['matchup','상성·조건']] as const
const sourceUrl=(source:{reference:string;description?:string})=>
  [source.description,source.reference].find((x):x is string=>Boolean(x&&/^https:\/\//.test(x)))

function ComparisonColumn({side}: {side:StatComparisonSide}){
  const [expanded,setExpanded]=useState(false)
  const shown=expanded?side.evidence:side.evidence.slice(0,3)
  return <article className="stat-compare-column">
    <div className="stat-compare-person">
      <CharacterPortrait characterId={side.characterId} groupId={side.groupId} name={side.name} size="small"/>
      <div><h4>{side.name}</h4><p>{side.groupName} · {side.stateLabel}</p></div>
    </div>
    <div className="stat-compare-score">
      <strong>{side.final}<small>/100</small></strong>
      <span>근거 {side.readiness??'미분류'} · {side.status}</span>
    </div>
    <p className="stat-compare-formula">기본 {side.base} + 패기 Raw {side.rawHaki} × {side.hakiWeight} = Final {side.final}{side.base+side.effectiveHaki>100?' · 100점 상한 적용':''}</p>
    <div className="stat-compare-rationale"><strong>평가 이유</strong><p>{normalizeCharacterNamesForDisplay(side.rationale)}</p></div>
    {side.attackAudit&&<section className="stat-compare-audit" aria-label={side.name+' 공격력 4요소'}>
      <h5>공격력 4요소 검토</h5>
      {attackDimensions.map(([key,label])=><p key={key}><strong>{label}</strong>{side.attackAudit![key]}</p>)}
      <small>{side.attackAudit.rationale}</small>
    </section>}
    <div className="stat-compare-evidence">
      <h5>이 스탯의 연결 근거 · {side.evidence.length}건</h5>
      {shown.length?shown.map(({evidence,battle,role})=><div className="stat-compare-evidence-item" key={evidence.id}>
        <strong>{battle?.title??evidence.source.reference}</strong>
        <span>{evidence.source.type==='canon'?'원작':evidence.source.type==='supplementary'?'공식·보조 자료':'커뮤니티'} · {role?roleLabels[role]+' 근거':'역할 미지정'}</span>
        <p><b>작중 사실</b> {normalizeCharacterNamesForDisplay(evidence.fact)}</p>
        {battle&&<p><b>전투 조건</b> {normalizeCharacterNamesForDisplay(battle.restrictions)} / {normalizeCharacterNamesForDisplay(battle.externalFactors)}</p>}
        <p><b>해석</b> {normalizeCharacterNamesForDisplay(evidence.interpretation)}</p>
        {sourceUrl(evidence.source)
          ? <a target="_blank" rel="noopener noreferrer" href={sourceUrl(evidence.source)}>출처 확인 ↗</a>
          : <small>출처: {evidence.source.reference}</small>}
      </div>):<p className="stat-compare-muted">이 평가축에 연결된 근거가 없어. 근거 부족이 곧 낮은 전투력을 뜻하지는 않아.</p>}
      {side.evidence.length>3&&<button type="button" className="stat-compare-more" onClick={()=>setExpanded(v=>!v)}>
        {expanded?'근거 접기':`근거 ${side.evidence.length-3}건 더 보기`}
      </button>}
      {side.missingEvidenceIds.length>0&&<p className="stat-compare-missing">미확인 근거 연결 {side.missingEvidenceIds.length}건 · 점수 재산정 없이 연결만 점검 필요</p>}
    </div>
  </article>
}

export function StatComparisonDialog({stat,primaryId,primaryStateId,onClose}:Props){
  const closeRef=useRef<HTMLButtonElement>(null)
  const roster=useMemo(()=>getStatComparisonRoster(),[])
  const ranking=useMemo(()=>getStatRanking(stat),[stat])
  const currentScore=ranking.find(x=>x.characterId===primaryId)?.score??0
  const firstOther=[...ranking].filter(x=>x.characterId!==primaryId)
    .sort((a,b)=>Math.abs(a.score-currentScore)-Math.abs(b.score-currentScore))[0]?.characterId
    ??roster.find(x=>x.id!==primaryId)?.id??''
  const [secondaryId,setSecondaryId]=useState(firstOther)
  const [secondaryStateId,setSecondaryStateId]=useState<string|undefined>(roster.find(x=>x.id===firstOther)?.defaultStateId)
  const comparison=getStatComparison(stat,primaryId,secondaryId,primaryStateId,secondaryStateId)
  const secondary=roster.find(x=>x.id===secondaryId)
  useEffect(()=>{
    const previous=document.activeElement instanceof HTMLElement?document.activeElement:null
    const previousOverflow=document.body.style.overflow
    document.body.style.overflow='hidden'
    closeRef.current?.focus()
    const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape'){e.preventDefault();onClose()}}
    document.addEventListener('keydown',onKey)
    return ()=>{document.removeEventListener('keydown',onKey);document.body.style.overflow=previousOverflow;previous?.focus()}
  },[onClose])
  return <div className="stat-compare-overlay" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}>
    <section className="stat-compare-dialog" role="dialog" aria-modal="true" aria-labelledby="stat-compare-title"
      onKeyDown={event=>{
        if(event.key!=='Tab')return
        const focusable=[...event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]),select:not([disabled]),a[href]')]
        if(focusable.length===0)return
        const first=focusable[0],last=focusable[focusable.length-1]
        if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
        else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
      }}>
      <header className="stat-compare-header">
        <div><p className="eyebrow">근거 기반 동축 비교</p><h2 id="stat-compare-title">{COMBAT_STAT_DEFINITIONS[stat].label} · 비교 분석</h2></div>
        <button type="button" ref={closeRef} className="stat-compare-close" aria-label="스탯 비교 닫기" onClick={onClose}>닫기 ×</button>
      </header>
      <div className="stat-compare-controls">
        <label>비교 대상 캐릭터
          <select aria-label="비교 상대 선택" value={secondaryId}
            onChange={e=>{const id=e.target.value;setSecondaryId(id);setSecondaryStateId(roster.find(x=>x.id===id)?.defaultStateId)}}>
            {roster.map(c=><option key={c.id} value={c.id} disabled={c.id===primaryId}>{c.name} · {c.groupName}</option>)}
          </select>
        </label>
        {secondary&&secondary.states.length>1&&<label>상대 평가 시점
          <select aria-label="비교 상대 평가 시점" value={secondaryStateId??''} onChange={e=>setSecondaryStateId(e.target.value||undefined)}>
            {secondary.states.map(state=><option key={state.id} value={state.id}>{state.label}</option>)}
          </select>
        </label>}
      </div>
      <div className="stat-compare-scroll">
        <p className="stat-compare-disclaimer">같은 스탯의 Final 점수와 근거를 나란히 비교해. E등급은 자료 충분도이며 승률·공식 전투력·감점값이 아니야.</p>
        {comparison
          ? <><p className="stat-compare-gap">두 인물 Final 격차: <strong>{Math.abs(comparison.difference)}점</strong> · 점수 차이가 1대1 승패를 결정하지 않아.</p>
            <div className="stat-compare-grid">
              <ComparisonColumn key={comparison.left.evaluationId} side={comparison.left}/>
              <ComparisonColumn key={comparison.right.evaluationId} side={comparison.right}/>
            </div></>
          : <p className="stat-compare-muted">해당 캐릭터와 평가 시점의 자료를 찾지 못했어. 다른 대상을 선택해 줘.</p>}
      </div>
    </section>
  </div>
}
