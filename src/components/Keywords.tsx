import './Keywords.css'

interface IKeywordsProps {
  keywords: string[]
}
export const Keywords: React.FC<IKeywordsProps> = (props) => {
  const {keywords} = props
  return(
  	<div className="keywords">
  	  Can be searched with:
      {keywords.map((keyword, index) => (
        <div key={index} className="keyword">- {keyword}</div>
      ))}  
  	</div>
  )
}