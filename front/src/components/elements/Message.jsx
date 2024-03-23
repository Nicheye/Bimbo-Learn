import React from 'react'

const Message = (props) => {
	const message = props.message
  return (
	<div className="message-wrap">
		<div className="message-title">{message}</div>
	</div>
  )
}

export default Message