export const realId = (id: number): number => {
  const realId: number = (id > 9899) ? id - 100 : id
  return realId
}