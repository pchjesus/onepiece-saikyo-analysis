import {describe,it,expect} from 'vitest'
import {getCharacterPortraitAsset,characterPortraitAssets} from './characterPortraits'

describe('v0.2.0 permission-gated visual media registry',()=>{
  it('does not silently load any unlicensed image, fake offsite link, or known character graphic',()=>{
    expect(Object.keys(characterPortraitAssets)).toHaveLength(0)
    for(const id of ['marco','king','katakuri','smoker','ivankov','nonexistent']){
      expect(getCharacterPortraitAsset(id)).toBeUndefined()
    }
  })
})
