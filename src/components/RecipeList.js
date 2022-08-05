import React, {useContext} from 'react'; 
import Recipe from './Recipe';
import { recipeContext } from './App';

export default function RecipeList({recipes}) {

  const {handleRecipeAdd} = useContext(recipeContext);
  
    
  return (
  
      <div className='recipe-list'>
        {recipes.map((recipe)=>{
            return (
            <Recipe
              key={recipe.id} 
              {...recipe}
            />
            )
        })}
      
        <div className='recipe-list__add-recipe-btn-container'>
          <button className='btn btn_primary' onClick={handleRecipeAdd} >Add new recipe</button>
        </div>
      </div>
  )
}