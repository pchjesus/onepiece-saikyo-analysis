import { useEffect, useState, type CSSProperties } from 'react'
import { getCharacterPortraitAsset } from '../../data/media/characterPortraits'
import { getCharacterAccent } from './CharacterIdentity'

type Props = { characterId: string; groupId: string; name: string; size: 'small' | 'large' }
export function CharacterPortrait({ characterId, groupId, name, size }: Props) {
  const [failed, setFailed] = useState(false)
  const asset = getCharacterPortraitAsset(characterId)
  const imageUrl = asset ? import.meta.env.BASE_URL + 'images/characters/' + asset.fileName : undefined
  // An image failure belongs to one asset; switching character must retry the next file.
  useEffect(() => { setFailed(false) }, [imageUrl])
  const initial = name.trim().replace(/[^가-힣a-zA-Z0-9]/g, '').slice(0, 2) || '?'
  const portrait = <span className={`character-portrait character-portrait-${size}`}
    style={{ '--portrait-accent': getCharacterAccent(groupId, characterId) } as CSSProperties}>
    {imageUrl && !failed
      ? <img src={imageUrl} alt={asset?.alt || `${name} 캐릭터 일러스트`} loading="lazy" decoding="async"
          onError={() => setFailed(true)} />
      : <span className="character-portrait-fallback" aria-hidden="true">{initial}</span>}
  </span>
  return size === 'large' && imageUrl && !failed && asset
    ? <span className="character-portrait-with-credit">{portrait}
      {asset.sourceUrl
        ? <a className="portrait-attribution" href={asset.sourceUrl} target="_blank"
          rel="noopener noreferrer" title={asset.permissionNote}>이미지 출처 ↗</a>
        : <span className="portrait-attribution" title={asset.permissionNote}>이미지 권리 미확인</span>}
    </span>
    : portrait
}
