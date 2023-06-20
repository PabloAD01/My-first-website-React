import React from 'react'

export const AppReducer = (state, action) => {
    switch(action.type){
        case 'curr_page_changed' : {
          return action.page_number
        }

        case 'insert_data_monster' :{

            return action.monster

        }

        case 'insert_data_art':{
            console.log(action.arte)
            return action.arte

        }
    }


     
}


