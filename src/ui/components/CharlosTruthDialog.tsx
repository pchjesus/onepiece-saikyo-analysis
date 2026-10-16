import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { charlosTruthLines } from '../../data/special/charlosSpecial'

/** Single user-triggered modal. Backdrop first, then image and text reveal.
 * Respect reduced-motion, focus restoration and keyboard/browsing accessibility.
 */
export function CharlosTruthDialog({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab') return
      const container = dialogRef.current
      if (!container) return
      const focusable = Array.from(container.querySelectorAll<HTMLElement>('button, a[href], [tabindex="0"]'))
        .filter(el => !el.hasAttribute('disabled'))
      if (!focusable.length) { event.preventDefault(); container.focus(); return }
      const first = focusable[0], last = focusable[focusable.length - 1]
      if (event.shiftKey && (document.activeElement === first || document.activeElement === container)) {
        event.preventDefault(); last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [onClose])

  return createPortal(
    <div className="charlos-truth-backdrop" role="presentation"
      onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section ref={dialogRef} tabIndex={-1} role="dialog" aria-modal="true"
        aria-labelledby="charlos-truth-title" aria-describedby="charlos-truth-disclaimer"
        className="charlos-truth-dialog">
        <div className="charlos-truth-topbar">
          <span>CONFIDENTIAL RECORD · 001</span>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="진실 팝업 닫기">×</button>
        </div>
        <div className="charlos-truth-reveal">
          <p className="charlos-truth-eyebrow">세계가 오해한 한 남자의 기록</p>
          <h2 id="charlos-truth-title">인류의 구원자,<br/>차를로스 성</h2>
          <figure className="charlos-truth-figure">
            <img src={import.meta.env.BASE_URL + 'images/characters/charlos-truth.webp'}
              alt="눈물 흘리는 차를로스 성이 작은 루피를 붙잡고 있는 흑백 패러디 그림" />
            <figcaption>모두에게 미움받기로 선택한 남자다이.</figcaption>
          </figure>
          <blockquote className="charlos-truth-quote">“일어나 죽지 말고,<br/>엎드려 사는 거다이.”</blockquote>
          <div className="charlos-truth-story">
            {charlosTruthLines.map((line,index) => <p key={index}>{line}</p>)}
            <p><strong>그는 마지막으로 중얼거렸다이. “악마다이…!!”</strong></p>
          </div>
          <p className="charlos-truth-last">인류가 이해하지 못한 마지막 성자다이.</p>
          <p id="charlos-truth-disclaimer" className="charlos-truth-disclaimer">
            ※ 전부 프로젝트가 창작한 반어적 풍자와 팬덤 밈의 패러디다이.
            원작에서 차를로스 성은 폭력을 행사하는 세계귀족이며,
            실제 숨겨진 선행이나 구원자 설정은 확인된 바 없다이.
          </p>
          <button className="charlos-truth-exit" type="button" onClick={onClose}>진실을 덮는다이</button>
        </div>
      </section>
    </div>, document.body)
}
