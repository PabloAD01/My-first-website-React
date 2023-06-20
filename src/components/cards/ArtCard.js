import React from 'react'

function ArtCard({art, handleClick}){
  const onClick = () =>{
    handleClick(art)
  }



  return (
    <img onClick={onClick} className='collage-img' src={art.image} />
  )
}

export default ArtCard
