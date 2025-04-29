import { realId } from './general-helper.ts'

const BASE_URL: string = 'https://padiconhost.s3.us-east-2.amazonaws.com/icons/'
const ICON_EXT: string = '.png'

export const urlIcon = (id: number): string => {
  const fileName: string = realId(id).toString().padStart(5, "0")
  const imgUrl: string = BASE_URL + fileName + ICON_EXT
  return imgUrl
}