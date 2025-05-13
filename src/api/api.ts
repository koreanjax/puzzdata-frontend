import { SearchResult, CardResult, SkillResult } from '../models/data-interface.ts'
import { CardOrganized, CardApiToOrganized } from '../models/card-organized-interface.ts'
import { SkillOrganized, SkillApiToOrganized } from '../models/skill-organized-interface.ts'

const API_URL: string = import.meta.env.VITE_API_URL
const API_SEARCH: string = '/search?'
const API_CARD: string = '/card/'
const API_SKILL: string = '/skill/'
const API_FILTER: string = '/filter/'
const API_KEY_ID: string = 'id='
const API_KEY_NAME: string = 'name='

export const fetchSearch = async (search: string): Promise<SearchResult[]> => {
  try {
    let queryString: string = API_URL + API_SEARCH
    if (search.match(/^[0-9]+$/)) {
      queryString += API_KEY_ID
    } else {
      queryString += API_KEY_NAME
    }
    queryString += search
    const response = await fetch(queryString)
    
    if (!response.ok) {
     throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (e: any) {
    throw new Error(e)
  }
}

export const fetchCard = async (search: number): Promise<CardOrganized> => {
  try {
    let queryString: string = API_URL + API_CARD + API_KEY_ID + search
    const response = await fetch(queryString)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = CardApiToOrganized(await response.json() as CardResult)
    return data
  } catch (e: any) {
    throw new Error (e)
  }
}

export const fetchSkill = async (search: number): Promise<SkillOrganized | SkillResult[]> => {
  try {
    let queryString: string = API_URL + API_SKILL + API_KEY_ID + search
    const response = await fetch(queryString)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    if (Array.isArray(data)) {
      return(data as SkillResult[])
    } else {
      return(SkillApiToOrganized(data) as SkillOrganized)
    }
    return data
  } catch (e: any) {
    throw new Error (e)
  }
}

export const fetchFilter = async (filterString: string): Promise<SearchResult[]> => {
  try {
    let queryString: string = API_URL + API_FILTER + filterString

    const response = await fetch(queryString)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (e: any) {
    throw new Error (e)
  }
}