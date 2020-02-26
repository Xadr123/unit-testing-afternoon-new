import { shortenText } from '../utils/functions'
import { wordCount, attachUserName } from '../../server/utils'
import { shortText, longText, posts, users } from './__data__/testData'

test('should not alter string under 100 characters', () => {
    expect(shortenText(shortText)).toHaveLength(29)
})

test('should shorten text over 100 characters and add three periods at the end', () => {
    const shortenedText = shortenText(longText)

    expect(shortenedText).not.toHaveLength(longText.length)
    expect(shortenedText.slice(-3)).toBe('...')
})

test('should correctly count the number of words in a sentence', () => {
    expect(wordCount(posts)).toBe(233)
})

test('should correctly attach users full name to a post', () => {
    const newPosts = attachUserName(users, posts)
    expect(newPosts[0]).toHaveProperty('displayName')
})

test('should remove any post with no matching user', () => {
    const newPosts = attachUserName(users, posts)
    const deletedPost = posts[5]
    expect(newPosts).not.toContainEqual(deletedPost)
})
