import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { getCharacterPortraitAsset } from '../../data/media/characterPortraits'
import { getCharacterAccent } from './CharacterIdentity'

type Props = { characterId: string; groupId: string; name: string; size: 'small' | 'large' }

export function CharacterPortrait({ characterId, groupId, name, size }: Props) {
  const [failed, setFailed] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const asset = getCharacterPortraitAsset(characterId)
  const imageUrl = asset ? import.meta.env.BASE_URL + 'images/characters/' + asset.fileName : undefined

  useEffect(() => { setFailed(false); setExpanded(false) }, [imageUrl])
  useEffect(() => {
    if (!expanded) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setExpanded(false)
        triggerRef.current?.focus()
      } else if (event.key === 'Tab') {
        event.preventDefault()
        closeRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [expanded])

  const initial = name.trim().replace(/[^가-힣a-zA-Z0-9]/g, '').slice(0, 2) || '?'
  const portrait = <span className={`character-portrait character-portrait-${size}`}
    style={{ '--portrait-accent': getCharacterAccent(groupId, characterId) } as CSSProperties}>
    {imageUrl && !failed
      ? <img src={imageUrl} alt={`${name} 캐릭터 일러스트`}
          loading="lazy" decoding="async" onError={() => { setFailed(true); setExpanded(false) }} />
      : <span className="character-portrait-fallback" aria-hidden="true">{initial}</span>}
  </span>

  // Search results already live inside an interactive picker option. Only the
  // large detail portrait opens a dialog, avoiding invalid nested buttons.
  if (size === 'small' || !imageUrl || failed) return portrait

  const close = () => {
    setExpanded(false)
    triggerRef.current?.focus()
  }

  return <>
    <span className="character-portrait-with-credit">
      <button ref={triggerRef} type="button" className="portrait-zoom-trigger"
        aria-label={`${name} 이미지 확대 보기`} aria-haspopup="dialog"
        aria-expanded={expanded} onClick={() => setExpanded(true)}>
        {portrait}
      </button>
      {asset?.sourceUrl
        ? <a className="portrait-attribution" href={asset.sourceUrl} target="_blank"
            rel="noopener noreferrer" title={asset.permissionNote}>이미지 출처 ↗</a>
        : <span className="portrait-attribution" title={asset?.permissionNote}>이미지 권리 미확인</span>}
    </span>
    {expanded && createPortal(
      <div className="portrait-lightbox-backdrop" onMouseDown={(event) => {
        if (event.target === event.currentTarget) close()
      }}>
        <section className="portrait-lightbox-dialog" role="dialog" aria-modal="true"
          aria-label={`${name} 이미지 확대`}>
          <div className="portrait-lightbox-toolbar">
            <strong>{name}</strong>
            <button ref={closeRef} type="button" className="portrait-lightbox-close"
              onClick={close} aria-label="확대 이미지 닫기">×</button>
          </div>
          <img src={imageUrl} alt={`${name} 캐릭터 일러스트 확대 이미지`}
            className="portrait-lightbox-image" decoding="async"/>
          <small className="portrait-lightbox-note">{asset?.permissionNote ?? '이미지 사용권 미확인'}</small>
        </section>
      </div>,
      document.body,
    )}
  </>
}
