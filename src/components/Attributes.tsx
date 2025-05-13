import './Attributes.css'

const attrImg = Object.values(import.meta.glob('../assets/filter/attributes/*.png', { eager: true, as: 'url' }))

interface IAttributesProp {
  headerText: string
  attrActive: boolean[]
  setAttrActive: React.Dispatch<React.SetStateAction<boolean[]>>
}

export const Attributes: React.FC<IAttributesProp> = (props) => {
  const { headerText, attrActive, setAttrActive } = props
  const classes:string = "attr-button "

  const handleAttr = (index: number) => {
    const tempAttrActive = [...attrActive]
    tempAttrActive[index] = !tempAttrActive[index]
    setAttrActive(tempAttrActive)
  }

  return (
  	<div className="attr">
  	  {headerText}
        <div className="attr-icons">
          {attrImg.map((attr, index) => (
            <button key={index}
              className={attrActive[index] ? classes + "attr-button-active" : classes + "attr-button-inactive"}
              onClick={() => handleAttr(index)}
            >
              <img className="attr-icon" src={attr} />
            </button>
          ))}
        </div>
  	</div>
  )
}