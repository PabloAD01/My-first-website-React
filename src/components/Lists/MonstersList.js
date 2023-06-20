import React, { useEffect, useReducer } from "react";
import { itemsPerPage } from "../../constants";
import CharacterCard from "../cards/CharacterCard";
import { AppReducer } from "../../reducers/AppReducer";


const MonstersList = ({ page }) => {
    const [monst, monstDispatch]= useReducer(AppReducer, [])
    const [artes, artDispatch] = useReducer(AppReducer, [])

    useEffect(() => {
        throw fetchAll()
            .then((res) => res.json())
            .then((data) => {
                monstDispatch({type: "insert_data_monster", monster: data.data.monsters})
                artDispatch({type: "insert_data_art", arte: data.data.materials})
            })
            .catch((err) => console.log(err));
    }, []);

    
    const fetchAll = async () => {
        const result = await fetch("https://botw-compendium.herokuapp.com/api/v2/all")
        return result
    }

    
  return monst
    .slice((page - 1) * itemsPerPage, page * itemsPerPage)
    .map((character) => {
      return <CharacterCard character={character} key={character.id} />;
    });
};

export default MonstersList;
