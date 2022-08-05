import React,{useContext} from 'react';
import IngredientList from './IngredientList';
import { recipeContext } from './App';

export default function Recipe(props) {

    const {handleRecipeDelete, handleRecipeEdit} = useContext(recipeContext); 
    const {
        id,
        name, 
        cookTime, 
        servings, 
        instruction, 
        ingredients }=props; 

    return (
    <div className='recipe'>
        
        <div className='recipe__header'>
            <h3 className='recipe__title'>{name}</h3>
            <div>
                <button className='btn btn_primary mr-1' onClick={()=>handleRecipeEdit(id)}>Edit</button>
                <button className='btn btn_danger' onClick={()=>handleRecipeDelete(id)}>Delete</button>
            </div>
        </div>
        
        <div className='recipe__row'>
            <span className='recipe__label'>Cook Time:</span>
            <span className='recipe__value'>{cookTime}</span>
        </div>

        <div className='recipe__row'>
            <span className='recipe__label'>Serving:</span>
            <span className='recipe__value'>{servings}</span>
        </div>

        <div className='recipe__row'>
            <span className='recipe__label'>Instructions:</span>
            <span className='recipe__value recipe__instructions recipe__value--indented'>{instruction}</span>
        </div>

        <div className='recipe__row'>
            <span className='recipe__label'>Ingredients:</span>
            <div className='recipe__value recipe__value--indented'>
                <IngredientList ingredients={ingredients} />
            </div>
        </div>

    </div>
  )
}
