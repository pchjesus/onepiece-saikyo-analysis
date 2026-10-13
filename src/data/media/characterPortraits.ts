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
const providedIds = 'marco newgate jozu ace vista king kaido queen jack x-drake page-one ulti whos-who black-maria sasaki linlin katakuri smoothie cracker zoro sanji jinbe shanks gaban rayleigh roger rocks mihawk crocodile garp kizaru kuzan akainu ryokugyu fujitora prince-grus smoker vergo tashigi inazuma lucci stussy sabo ivankov kaku morley karasu doflamingo diamante pica hancock law kid killer kinemon kanjuro raizo kikunojo ashura-doji kawamatsu denjiro inuarashi nekomamushi izo'.split(' ')

export const characterPortraitAssets: Readonly<Record<string, CharacterPortraitAsset>> =
  Object.fromEntries(providedIds.map((id): [string, CharacterPortraitAsset] => [id, {
    fileName: id + '.webp',
    permission: 'user-provided-unverified',
    permissionNote: '사용자 제공 이미지 · 원저작권자 및 공개 재배포 허가 미확인',
  }]))

export function getCharacterPortraitAsset(characterId: string): CharacterPortraitAsset | undefined {
  const asset = characterPortraitAssets[characterId]
  if (!asset) return undefined
  if (!/^[a-z0-9][a-z0-9-]*\.(?:webp|png|jpe?g)$/.test(asset.fileName)) return undefined
  if (asset.sourceUrl !== undefined && !/^https:\/\//.test(asset.sourceUrl)) return undefined
  if (!asset.permissionNote.trim()) return undefined
  return asset
}
