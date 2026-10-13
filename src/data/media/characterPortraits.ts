/**
 * v0.2.0 opt-in media registry. Empty until assets with verified redistribution
 * permissions have been provided. UI must never hotlink or scrape fan/official sites.
 * This metadata is strictly a presentation source, not canon evidence.
 */
export type CharacterPortraitAsset={
  fileName:string
  alt:string
  sourceUrl:string
  permission:'owned'|'licensed'|'open-license'
  permissionNote:string
}
export const characterPortraitAssets:Readonly<Record<string,CharacterPortraitAsset>>={}

export function getCharacterPortraitAsset(characterId:string):CharacterPortraitAsset|undefined{
  const asset=characterPortraitAssets[characterId]
  if(!asset)return undefined
  if(!/^[a-z0-9][a-z0-9-]*\.(?:webp|png|jpe?g)$/.test(asset.fileName))return undefined
  if(!asset.alt.trim()||!asset.sourceUrl.startsWith('https://')||!asset.permissionNote.trim())return undefined
  return asset
}
