import './Types.css'

const typesImg = Object.values(import.meta.glob('../assets/types/*.png', { eager: true, as: 'url' }))  
const filterTypesImg: string[] = Object.values(import.meta.glob('../assets/filter/types/*.png', { eager: true, as: 'url' }))  

// TODO: Add the words after icons
interface ITypeProps {
  types: number[]
}
export const Type: React.FC<ITypeProps> = (props) => {
  const {types} = props
  return (
    <div className="types">
      {types.map((type, key) => (
        <img key={key} className="type" src={typesImg[type]} />
      ))}
    </div>
  )
}

interface ITypesProps {
  headerText: string
  typeActive: boolean[]
  setTypeActive: React.Dispatch<React.SetStateAction<boolean[]>>
}
export const Types: React.FC<ITypesProps> = (props) => {
  const {headerText, typeActive, setTypeActive} = props
  const handleType = (index: number) => {
    const tempTypeActive = [...typeActive]
    tempTypeActive[index] = !tempTypeActive[index]
    setTypeActive(tempTypeActive)
  }

  const classes:string = "type-button "

  return (
    <div className="types-filter">
      {headerText}
        <div className="types-filter-icons">
          {filterTypesImg.map((attr, index) => (
            <button key={index}
              className={typeActive[index] ? classes + "type-button-active" : classes}
              onClick={() => handleType(index)}
            >
              <img className="types-filter-icon icon-shadow" src={attr} />
            </button>
          ))}
        </div>
    </div>
  )
}