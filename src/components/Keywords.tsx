import './Keywords.css'

export const Keywords = ({keywords}) => {
  return(
  	<div className="keywords">
  	  Can be searched with:
      {keywords.map((keywords, index) => (
        <div key={index} className="keyword">- {keywords}</div>
      ))}  
  	</div>
  )
}