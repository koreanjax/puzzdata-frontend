import './CardHeader.css'

export const CardHeader = ({id, name}) => {
  const realId: number = (id > 9899) ? id-100 : id
  const fileName: string = realId.toString().padStart(5, "0")
  const imgSrc: string = "https://dohzi9dodqiuu.cloudfront.net/icons/" + fileName + ".png"
  return(
  <div className="card-header">
    <div className="card-id">No.{realId}</div>
    <div className="card-name">{name}</div>
  </div>
  )
}
