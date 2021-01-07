import {
  put
} from '.';
export function increaseViewCount(id, slug, model) {
  if (!model) {
    throw new Error('third param should be the model/table name you want to increase view count')
  }
  let modelType = model === 'parts' ? 'carparts' : 'makers'
  return slug ? put(`${modelType}/rankings/views/null?slug=${slug}`) : put(`${modelType}/rankings/views/${id}`)
}

