import { ArrayRemoveDuplicates } from './array-util'

describe('Array Util', () => {
  test('Should ArrayRemoveDuplicates return an array without duplicates', () => {
    const input = ['1', '2', '2', 1, 1, 2]
    const sut = ArrayRemoveDuplicates
    const output = sut(input)
    expect(output).toEqual(['1', '2', 1, 2])
  })
})
