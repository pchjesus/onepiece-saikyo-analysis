import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { charlosTruthMonologue } from '../../data/special/charlosSpecial'

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
        aria-labelledby="charlos-truth-title" className="charlos-truth-dialog">
        <h2 id="charlos-truth-title" className="sr-only">진실</h2>
        <div className="charlos-truth-topbar">
          <button ref={closeRef} type="button" onClick={onClose} aria-label="진실 팝업 닫기">×</button>
        </div>
        <div className="charlos-truth-reveal">
          <figure className="charlos-truth-figure">
            <img src={import.meta.env.BASE_URL + 'images/characters/charlos-truth.webp'}
              alt="눈물을 흘리는 차를로스 성의 흑백 그림" />
          </figure>
          <blockquote className="charlos-truth-quote">
            {charlosTruthMonologue.map((line) => <span className="charlos-truth-line" key={line}>{line}</span>)}
          </blockquote>
        </div>
      </section>
    </div>, document.body)
}
