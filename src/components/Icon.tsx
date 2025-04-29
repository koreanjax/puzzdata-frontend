import './Icon.css'
import { urlIcon } from '../helper/icon-helper.ts'

//const iconsImg = Object.values(import.meta.glob('./assets/icons/*.png', { eager: true, as: 'url' }))

export const Icon = ({id}) => {
  return(
    <img className="card-icon" src={urlIcon(id)} />
  )
}
