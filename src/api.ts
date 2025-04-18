import { Input, SearchResult, CardResult } from './data-interface.ts'
import { emptySearchResult, emptyCardResult } from './data-interface-factory.ts'

const API_URL: string = 'http://localhost:8080'
const API_SEARCH: string = '/search/'
const API_CARD: string = '/card/'
const API_KEY_ID: string = 'id='
const API_KEY_NAME: string = 'name='

export const fetchSearch = async (search): SearchResult[] => {
  let data: SearchResult[] = []
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
    data = await response.json()
  } catch (e: any) {
    // TODO
  }
  return(data)
}

export const fetchCard = async (search: number): CardResult => {
  let data: CardResult = emptyCardResult()
  try {
    let queryString: string = API_URL + API_CARD + API_KEY_ID + search

    const response = await fetch(queryString)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    data = await response.json()
  } catch (e: any) {
    TODO
  }
  return(data)
}
