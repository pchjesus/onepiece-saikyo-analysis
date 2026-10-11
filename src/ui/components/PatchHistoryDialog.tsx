import { useEffect, useRef, type KeyboardEvent } from 'react'
import { CURRENT_PATCH_VERSION, patchHistory } from '../../data/releases/patchHistory'

const categoryLabel={
  feature:'기능',roster:'캐릭터·집단',evidence:'전투 근거',stat:'스탯 변경',fix:'호환성·검증',
} as const

export function PatchHistoryDialog({onClose}:{onClose:()=>void}){
  const closeRef=useRef<HTMLButtonElement>(null)
  const dialogRef=useRef<HTMLElement>(null)

  useEffect(()=>{
    const active=document.activeElement instanceof HTMLElement?document.activeElement:null
    const overflow=document.body.style.overflow
    document.body.style.overflow='hidden'
    closeRef.current?.focus()
    return ()=>{
      document.body.style.overflow=overflow
      active?.focus()
    }
  },[])

  const onKeyDown=(event:KeyboardEvent<HTMLElement>)=>{
    if(event.key==='Escape'){
      event.preventDefault()
      onClose()
    }
    if(event.key!=='Tab')return
    const focusable=dialogRef.current?.querySelectorAll<HTMLElement>(
      'a[href],button:not([disabled]),summary,[tabindex]:not([tabindex="-1"])',
    )
    if(!focusable?.length)return
    const first=focusable[0],last=focusable[focusable.length-1]
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
  }

  return (
    <div className="patch-backdrop" onPointerDown={event=>{
      if(event.target===event.currentTarget)onClose()
    }}>
      <section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="patch-title"
        className="patch-history-dialog" onKeyDown={onKeyDown}>
        <header className="patch-dialog-header">
          <div>
            <p className="eyebrow">원피스 전투력 분석 · 업데이트</p>
            <h2 id="patch-title">패치 내역</h2>
            <p>현재 {CURRENT_PATCH_VERSION} · 버전을 펼쳐 변경 사항과 판단 근거 확인</p>
          </div>
          <button type="button" className="patch-close" aria-label="패치 내역 닫기" ref={closeRef} onClick={onClose}>×</button>
        </header>
        <div className="patch-dialog-list">
          {patchHistory.map((patch,index)=>(
            <details className="patch-release" key={patch.version} open={index===0}>
              <summary>
                <span className="patch-version">{patch.version}</span>
                <span className="patch-summary-title">{patch.headline}
                  <small>{patch.date} · {patch.changes.length}건</small>
                </span>
                <span className="patch-expand" aria-hidden="true">▾</span>
              </summary>
              <div className="patch-release-body">
                <p className="patch-lead">{patch.summary}</p>
                <ol className="patch-changes">
                  {patch.changes.map((change,i)=>(
                    <li key={i}>
                      <div className="patch-change-head">
                        <span className={`patch-category patch-category-${change.category}`}>{categoryLabel[change.category]}</span>
                        <strong>{change.title}</strong>
                      </div>
                      {change.stat&&(
                        <div className="patch-score-delta" aria-label={`${change.stat.character} ${change.stat.label} ${change.stat.from}점에서 ${change.stat.to}점으로 변경`}>
                          <span>{change.stat.character} · {change.stat.label}</span>
                          <strong>{change.stat.from} → {change.stat.to}</strong>
                          <small>{change.stat.readiness} · {change.stat.to-change.stat.from>0?'+':''}{change.stat.to-change.stat.from}점</small>
                        </div>
                      )}
                      <p><b>{change.category==='stat'?'변경 이유 · 근거':'변경 이유'}:</b> {change.reason}</p>
                      {change.sources?.length?(
                        <div className="patch-sources">
                          <span>출처 · </span>
                          {change.sources.map(s=><a href={s.url} target="_blank" rel="noopener noreferrer" key={s.url}>{s.label} ↗</a>)}
                        </div>
                      ):null}
                    </li>
                  ))}
                </ol>
                {patch.reportUrl&&<a className="patch-full-report" href={patch.reportUrl} target="_blank" rel="noopener noreferrer">전체 분석·검증 보고서 보기 ↗</a>}
              </div>
            </details>
          ))}
        </div>
        <footer className="patch-dialog-footer">
          <p>v0.1.75 이전 변경은 아직 이 화면에 소급 등록하지 않았어. 스탯 수치는 원작 공식 수치가 아니라 버전별 프로젝트의 평가값이며, 공식 애니 요약은 보조 출처로 구분해.</p>
        </footer>
      </section>
    </div>
  )
}
