import { useEffect, useRef, useState } from 'react'
import { PATCH_CATEGORIES, categoryForPatchChange, patchHistory, type PatchCategoryFilter } from '../../data/patchHistory'

export function PatchHistoryDialog({onClose}:{onClose:()=>void}) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const [selectedCategory, setSelectedCategory] = useState<PatchCategoryFilter>('all')

  useEffect(() => {
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
    closeRef.current?.focus()
    const onKey = (event:KeyboardEvent) => { if(event.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('keydown', onKey); previouslyFocused?.focus() }
  }, [onClose])

  const countAll = patchHistory.reduce((total,version)=>total+version.changes.length,0)
  const visibleVersions = patchHistory.map(version=>({
    ...version,
    changes: version.changes.filter(change=>
      selectedCategory === 'all' || categoryForPatchChange(change) === selectedCategory),
  })).filter(version=>version.changes.length>0)

  return <div className="patch-overlay" role="presentation" onMouseDown={event=>{
    if(event.target === event.currentTarget) onClose()
  }}>
    <section role="dialog" aria-modal="true" aria-labelledby="patch-history-title" className="patch-dialog">
      <div className="patch-dialog-header">
        <div>
          <p className="eyebrow">UPDATE HISTORY</p>
          <h2 id="patch-history-title">패치 내역</h2>
          <p>버전별 변경 내용 · 스탯 조정 사유와 근거</p>
        </div>
        <button type="button" ref={closeRef} className="patch-close" onClick={onClose} aria-label="패치 내역 닫기">닫기 ✕</button>
      </div>

      <nav className="patch-category-tabs" aria-label="패치 내역 카테고리">
        <button type="button" className="patch-category-tab" aria-pressed={selectedCategory==='all'}
          onClick={()=>setSelectedCategory('all')}>전체 <small>{countAll}</small></button>
        {PATCH_CATEGORIES.map(category=><button type="button" className="patch-category-tab"
          aria-pressed={selectedCategory===category.id} key={category.id}
          onClick={()=>setSelectedCategory(category.id)}>
          {category.label} <small>{patchHistory.reduce((total,version)=>
            total+version.changes.filter(change=>categoryForPatchChange(change)===category.id).length,0)}</small>
        </button>)}
      </nav>

      <div className="patch-dialog-scroll" aria-live="polite">
        {visibleVersions.map(version=><article className="patch-version" key={version.version}>
          <header className="patch-version-header">
            <span className="patch-version-tag">{version.version}</span>
            <span className="patch-date">{version.date}</span>
            <h3>{version.title}</h3><p>{version.summary}</p>
          </header>

          {PATCH_CATEGORIES.map(category=>{
            const changes=version.changes.filter(change=>categoryForPatchChange(change)===category.id)
            if(changes.length===0)return null
            return <section className="patch-category-section" key={category.id}
              aria-label={category.label}>
              <h4 className="patch-category-heading">{category.label} <span>{changes.length}건</span></h4>
              {changes.map((change,index)=><div className="patch-change" key={index}>
                <h5>{change.title}</h5>
                {change.before!==undefined && change.after!==undefined &&
                  <p className="patch-score">{change.stat}: {change.before} → <strong>{change.after}</strong> ({change.after-change.before>0?'+':''}{change.after-change.before})</p>}
                {change.detail && <p>{change.detail}</p>}
                {change.reason && <p><strong>변경 이유·근거:</strong> {change.reason}</p>}
                {change.evidence && change.evidence.length>0 && <p className="patch-links">
                  {change.evidence.map((item,i)=><a key={i} href={item.url} target="_blank" rel="noopener noreferrer">{item.label} ↗</a>)}
                </p>}
              </div>)}
            </section>
          })}
          {version.report && <a href={version.report} target="_blank" rel="noopener noreferrer"
            className="patch-report-link">상세 분석 보고서 ↗</a>}
        </article>)}
      </div>
    </section>
  </div>
}
