// TODO: restrict non-number chars in the input box
export const checkLevel = (newLevel: string, maxLevel:number, limitPercent: number): number => {
  const filtered = newLevel.replace(/\D/g, "").toString()

  if (filtered === "") {
    return(0)
  } else if(Number(filtered) > 120 && limitPercent > 0) {
    return(120)
  } else if (Number(filtered) > maxLevel && limitPercent === 0) {
    return(maxLevel)
  } else {
    return(Number(filtered))
  }
}


export const checkPlus = (newPlus: string): number => {
  const filtered: string = newPlus.replace(/\D/g, "").toString()
  if(Number(filtered) > 99) {
    return(99)
  } else if (filtered === "") {
    return(0)
  } else {
    return(Number(filtered))
  }
}

// There are different ways of calculating stats depending on level range
// 1-99 use the stat growth value into consideration
// 100-110 use the limit break percent which is divided evenly
// 111-120 use 10% for HP, 5% for ATK, 5% for RCV
// Also, every calculation is done with decimal values in mind. You never
// round off the stat and then calculate for the next set of levels.
export const calcStats = (level: number, maxLevel: number, limitPercent: number, vals: number[], statFlag: number): number => {
  if (level === 0){
    return(vals[0])
  } else if (level < 100) {
    let growth: number = (maxLevel > 1) ? (level - 1) / (maxLevel - 1) : 1
    let diff: number = vals[1] - vals[0]
    let finalStat: number = vals[0] + diff * Math.pow(growth, vals[2]/10)
    return(Math.round(finalStat))
  } else if (level < 111 && level > 99){
    let limitBreakStat: number = vals[1]*((limitPercent/100)+1)
    let statPerLimitLevel: number = (limitBreakStat - vals[1])/11
    let finalStat: number = (level - 99)*statPerLimitLevel+vals[1]
    return(Math.round(finalStat))
  } else if (level > 110) {
    let initStat: number = vals[1]*((limitPercent/100)+1)
    let statPerSuperLimitLevel: number = (vals[1]*(statFlag/100)/10)
    let finalStat: number = (level - 110)*statPerSuperLimitLevel+initStat
    return(Math.round(finalStat))
  } else {
    return(0)
  }
}
