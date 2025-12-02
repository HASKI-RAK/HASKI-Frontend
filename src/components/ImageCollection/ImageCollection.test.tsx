import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import ImageCollection from './ImageCollection'

describe('[HASKI-REQ-0083] ImageCollection tests', () => {
  it('renders without input', () => {
    const imageCollection = render(<ImageCollection />)
    expect(imageCollection).toBeTruthy()
  })

  it('renders with input', async () => {
    const { findAllByRole } = render(<ImageCollection leftImgURL="test1" middleImgURL="test2" rightImgURL="test3" />)
    expect((await findAllByRole('img')).length).toStrictEqual(3)
  })
})
