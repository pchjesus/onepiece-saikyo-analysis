/**
 * User-provided OPTC-style portrait assets. Files live in public/images/characters/.
 * Images are for presentation only; canon evidence and ratings must never depend on them.
 * Original creator/licensing and public redistribution permissions are NOT verified.
 */
export type CharacterPortraitAsset = {
  fileName: string
  alt?: string
  sourceUrl?: string
  permission: 'owned' | 'licensed' | 'open-license' | 'user-provided-unverified'
  permissionNote: string
}
const providedIds = 'marco newgate jozu ace vista king kaido queen jack x-drake page-one ulti whos-who black-maria sasaki linlin katakuri smoothie cracker zoro sanji jinbe shanks gaban rayleigh roger rocks mihawk crocodile garp kizaru kuzan akainu ryokugyu fujitora prince-grus smoker vergo tashigi inazuma lucci stussy sabo ivankov kaku morley karasu doflamingo diamante pica hancock law kid killer kinemon kanjuro raizo kikunojo ashura-doji kawamatsu denjiro inuarashi nekomamushi izo teach shiryu burgess van-augur pizarro koby buggy luffy'.split(' ')

export const characterPortraitAssets: Readonly<Record<string, CharacterPortraitAsset>> =
  Object.fromEntries(providedIds.map((id): [string, CharacterPortraitAsset] => [id, {
    fileName: id + '.webp',
    ...(id === 'buggy' ? {sourceUrl:'https://one-piece-artworks.com/app/view/assets/img/BlqAnyy'} : {}),
    ...(id === 'luffy' ? {sourceUrl:'https://pbs.twimg.com/media/HJdnZZiXsAA5TE9?format=png&name=orig'} : {}),
    permission: 'user-provided-unverified',
    permissionNote: '사용자 제공 이미지 · 원저작권자 및 공개 재배포 허가 미확인',
  }]))

/** Added in v0.4.11: separate uploaded portrait assets preserve the frozen 72-image registry. */
const v0411PortraitAssets: Readonly<Record<string, CharacterPortraitAsset>> =
  Object.fromEntries(['guernica','maha','usopp','nami','chopper','robin','franky','brook'].map(id => [id, {
    fileName: id + '.webp',
    permission: 'user-provided-unverified',
    permissionNote: '사용자 제공 이미지 · 원저작권자 및 공개 재배포 허가 미확인',
  }]))

/** v0.4.14 Enel: new user-provided image without mutating frozen 72 + 8 registries. */
const v0414EnelPortraitAsset: CharacterPortraitAsset = {
  fileName: 'enel.webp',
  permission: 'user-provided-unverified',
  permissionNote: '사용자 제공 이미지 · 원저작권자 및 공개 재배포 허가 미확인',
}

/** v0.4.17 — user-provided art, resized to 300px for web delivery; original uploads remain in the conversation. */
const v0417CharlosPortraitAsset: CharacterPortraitAsset = {
  fileName: 'charlos.webp',
  permission:'user-provided-unverified',
  permissionNote:'사용자 제공 일러스트를 WebP로 웹 최적화(300px). 원작/그림 원저작권자 및 공개 재배포 허가 미확인',
}

export function getCharacterPortraitAsset(characterId: string): CharacterPortraitAsset | undefined {
  const asset = characterPortraitAssets[characterId] ?? v0411PortraitAssets[characterId]
    ?? (characterId === 'enel' ? v0414EnelPortraitAsset : characterId === 'charlos' ? v0417CharlosPortraitAsset : undefined)
  if (!asset) return undefined
  if (!/^[a-z0-9][a-z0-9-]*\.(?:webp|png|jpe?g)$/.test(asset.fileName)) return undefined
  if (asset.sourceUrl !== undefined && !/^https:\/\//.test(asset.sourceUrl)) return undefined
  if (!asset.permissionNote.trim()) return undefined
  return asset
}
