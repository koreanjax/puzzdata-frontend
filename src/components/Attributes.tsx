import './Attributes.css'
import { useState } from 'React'

const attrImg = Object.values(import.meta.glob('../assets/filter/attributes/*.png', { eager: true, as: 'url' }))

export const Attributes = ({headerText, attrActive, setAttrActive}) => {
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