import { useState } from 'react'
import { getCharacterPortraitAsset } from '../../data/media/characterPortraits'
import { getCharacterAccent } from './CharacterIdentity'

type Props={characterId:string;groupId:string;name:string;size:'small'|'large'}
export function CharacterPortrait({characterId,groupId,name,size}:Props){
  const [failed,setFailed]=useState(false)
  const asset=getCharacterPortraitAsset(characterId)
  const initial=name.trim().replace(/[^가-힣a-zA-Z0-9]/g,'').slice(0,2)||'?'
  const imageUrl=asset ? import.meta.env.BASE_URL+'images/characters/'+asset.fileName:undefined
  return <span className={`character-portrait character-portrait-${size}`}
    style={{'--portrait-accent':getCharacterAccent(groupId,characterId)} as React.CSSProperties}>
    {imageUrl&&!failed
      ? <img src={imageUrl} alt={asset!.alt} loading="lazy" decoding="async" onError={()=>setFailed(true)}/>
      : <span className="character-portrait-fallback" aria-hidden="true">{initial}</span>}
  </span>
}
