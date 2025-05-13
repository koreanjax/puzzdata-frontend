import './Icon.css'
import { urlIcon } from '../helper/icon-helper.ts'

interface IIconProps {
  id: number
}
export const Icon: React.FC<IIconProps> = (props) => {
  const {id} = props
  return(
    <img className="card-icon" src={urlIcon(id)} />
  )
}
