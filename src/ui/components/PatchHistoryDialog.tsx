import { useEffect, useRef } from 'react'
import { patchHistory } from '../../data/patchHistory'

export function PatchHistoryDialog({onClose}:{onClose:()=>void}){
  const closeRef=useRef<HTMLButtonElement>(null)
  useEffect(()=>{
    const previouslyFocused=document.activeElement instanceof HTMLElement?document.activeElement:null
    closeRef.current?.focus()
    const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape')onClose()}
    document.addEventListener('keydown',onKey)
    return ()=>{document.removeEventListener('keydown',onKey);previouslyFocused?.focus()}
  },[onClose])
  return <div className="patch-overlay" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}>
    <section role="dialog" aria-modal="true" aria-labelledby="patch-history-title" className="patch-dialog">
      <div className="patch-dialog-header">
        <div><p className="eyebrow">UPDATE HISTORY</p><h2 id="patch-history-title">패치 내역</h2><p>버전 · 변경점 · 변경 이유 · 전투력 근거</p></div>
        <button type="button" ref={closeRef} className="patch-close" onClick={onClose} aria-label="패치 내역 닫기">닫기 ✕</button>
      </div>
      <div className="patch-dialog-scroll">
        {patchHistory.map(p=><article className="patch-version" key={p.version}>
          <header className="patch-version-header"><span className="patch-version-tag">{p.version}</span><span className="patch-date">{p.date}</span><h3>{p.title}</h3><p>{p.summary}</p></header>
          {p.changes.map((c,i)=><div className="patch-change" key={i}>
            <h4>{c.title}</h4>
            {c.before!==undefined&&c.after!==undefined&&<p className="patch-score">{c.stat}: {c.before} → <strong>{c.after}</strong> ({c.after-c.before>0?'+':''}{c.after-c.before})</p>}
            <p>{c.detail}</p><p><strong>이유·근거:</strong> {c.reason}</p>
            {c.evidence?.length&&<p className="patch-links">{c.evidence.map((e,j)=><a key={j} href={e.url} target="_blank" rel="noopener noreferrer">{e.label} ↗</a>)}</p>}
          </div>)}
          {p.report&&<a href={p.report} target="_blank" rel="noopener noreferrer" className="patch-report-link">상세 분석 보고서 ↗</a>}
        </article>)}
      </div>
    </section>
  </div>
}
