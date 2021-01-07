import {post} from '.'

export async function headerValue(part, brand) {
  const body = {part, brand}
  const result = await post('header', body)
  return result
}
