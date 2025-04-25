import './Icon.css'

//const iconsImg = Object.values(import.meta.glob('./assets/icons/*.png', { eager: true, as: 'url' }))

export const Icon = ({id, name}) => {
  const realId: number = (id > 9899) ? id-100 : id
  const fileName: string = realId.toString().padStart(5, "0")
  const imgSrc: string = "https://dohzi9dodqiuu.cloudfront.net/icons/" + fileName + ".png"
  return(
    <img className="card-icon" src={imgSrc} />
  )
}
