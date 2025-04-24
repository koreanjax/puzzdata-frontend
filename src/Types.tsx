const typesImg = Object.values(import.meta.glob('./assets/types/*.webp', { eager: true, as: 'url' }))  

// TODO: Add the words after icons
export const Type = ({types}) => {
  return (
    <div className="types">
      {types.map((type, key) => (
        <img key={key} className="type" src={typesImg[type]} />
      ))}
    </div>
  )
}