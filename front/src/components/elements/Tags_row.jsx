import React from 'react';

const Tags_row = (props) => {
  const tags = props.tags;
  console.log(tags);
  
  // Map over the tags array and return JSX elements
  return (
    <>
      {tags.map(tag => (
		<div className="tag-wrapper" >
			<div className="tag-link" style={{background:`#${tag.color}`,}} >{tag.tag}</div>
		</div>
		
        
      ))}
    </>
  );
}

export default Tags_row;
