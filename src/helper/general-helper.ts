export const realId = (id: number): number => {
  const realId: number = (id > 9899) ? id - 100 : id
  return realId
}

export const removeSkillColor = (text: string): string => {
  if (text === undefined) {
    return("")
  }
  const redColorRemoved = text.replace(/\^(.+?)\^(.*?)\^p,/g, '$2')
  const blueColorRemoved = redColorRemoved.replace(/\^(.+?)\^(.*?)\^p/g, '$2')
  return blueColorRemoved
}