import './Icon.css'
import { urlIcon } from '../helper/icon-helper.ts'

export const Icon = ({id}) => {
  return(
    <img className="card-icon" src={urlIcon(id)} />
  )
}
