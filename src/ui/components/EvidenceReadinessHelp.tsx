import { useEffect, useRef, useState } from 'react'
import { EVIDENCE_READINESS_DEFINITIONS, EVIDENCE_READINESS_LEVELS } from '../../domain/evaluation/types'

/** Read-only explanation; E4 is not an approved grading level. */
export function EvidenceReadinessHelp() {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLElement>(null)

  const close = () => {
    setOpen(false)
    triggerRef.current?.focus()
  }

  useEffect(() => {
    if (!open) return
    dialogRef.current?.focus()
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onEscape)
    return () => document.removeEventListener('keydown', onEscape)
  }, [open])

  return (
    <div className="readiness-help">
      <button ref={triggerRef} type="button" className="stat-info-button readiness-help-trigger"
        aria-label="근거 충분도 E1부터 E4까지의 등급 설명 보기" aria-expanded={open}
        onClick={() => setOpen((value) => !value)}>?</button>
      {open && (
        <div className="stat-info-backdrop readiness-help-backdrop" role="presentation"
          onPointerDown={(event) => { if (event.target === event.currentTarget) close() }}>
          <section ref={dialogRef} tabIndex={-1} className="stat-info-dialog readiness-help-dialog"
            role="dialog" aria-modal="true" aria-labelledby="readiness-help-title">
            <div className="stat-info-header">
              <div>
                <p className="eyebrow">평가 근거 충분도</p>
                <h3 id="readiness-help-title">E등급 설명</h3>
              </div>
              <button className="stat-info-close" type="button" aria-label="근거 등급 설명 닫기" onClick={close}>×</button>
            </div>
            <p>근거 충분도는 각 전투 스탯의 자료가 얼마나 뒷받침되는지 나타내며, 전투력 점수나 패기 가중치가 아닙니다.</p>
            <dl className="readiness-levels">
              {EVIDENCE_READINESS_LEVELS.map((level) => (
                <div key={level}>
                  <dt>{level}</dt><dd>{EVIDENCE_READINESS_DEFINITIONS[level]}</dd>
                </div>
              ))}
              <div>
                <dt>E4</dt>
                <dd>현재 프로젝트에서 정의되지 않은 등급입니다. 실제 평가에 사용하지 않으며 향후 별도 검토가 필요합니다.</dd>
              </div>
            </dl>
            <p className="readiness-help-note">E3 또는 근거 미입력은 낮은 전투력의 증거가 아닙니다. 현재 근거가 충분하지 않다는 뜻입니다.</p>
          </section>
        </div>
      )}
    </div>
  )
}
