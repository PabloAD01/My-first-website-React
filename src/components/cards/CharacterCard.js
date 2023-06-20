import React from "react";

function CharacterCard({character}){
    return(
        <div className="character-card">
            <img src={character.image}/>
            <div className="character-content" >
                <h1>{character.name}</h1>
                <p>{character.description}</p>
            </div>
        </div>
        
    )
}

export default CharacterCard