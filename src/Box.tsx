import './Box.css'

export function Box({name, message} : {name : string, message : string}){
	return (
		<div className='box'>
			{name} {message}
		</div>
	)	
}


{/* <div>
	<article className='textBox'>
	</article>		
</div> */}