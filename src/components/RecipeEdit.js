import React,{useContext} from 'react';
import RecipeIngredientEdit from './RecipeIngredientEdit';
import { recipeContext } from './App';
import {v4 as uuidv4} from 'uuid'; 

export default function RecipeEdit({recipe}) {
    const {handleRecipeChange, handleRecipeEdit} = useContext(recipeContext);
    
    function handleChange(change){
        handleRecipeChange(recipe.id, {...recipe, ...change});
    }

    const {
        name, 
        cookTime, 
        servings, 
        instruction, 
        ingredients }=recipe;

    function handleIngredientChange(id, ingredient){
        const newIngredients = [...ingredients];
        const index = newIngredients.findIndex(ingredient=>ingredient.id===id);
        newIngredients[index]=ingredient; 
        handleChange({ingredients: newIngredients}); 
    }

    function handleIngredientAdd(){
        const newIngredient ={
            id: uuidv4(),
            name: '',
            amount: ''
        }
        handleChange({ingredients: [...recipe.ingredients, newIngredient]})
    }

    function handleIngredientDelete(id){
        handleChange({ingredients: recipe.ingredients.filter(ingredient=>ingredient.id!==id)})
    }
        
  return (
    <div className='recipe-edit'>
        <div className='recipe-edit__remove-button-container'>
            <button 
                className='btn recipe-edit__remove-button'
                onClick={()=>handleRecipeEdit(undefined)}>
                &times;
            </button>
        </div>
        <div className='recipe-edit__details-grid'>
            <label 
                htmlFor='name' 
                className='recipe-edit__label'>
                Name
            </label>
            <input 
                type='text' 
                name='name'
                className='recipe-edit__input' 
                id='name'
                value={name}
                onChange={e=>handleChange({name: e.target.value})}/>
            
            <label 
                htmlFor='cookTime'
                className='recipe-edit__label'>
                Cook Time
            </label>
            <input 
                type='text' 
                name='cookTime'
                className='recipe-edit__input' 
                id='cookTime'
                value={cookTime}
                onChange={e=>handleChange({cookTime: e.target.value})}/>

            <label 
                htmlFor='serving'
                className='recipe-edit__label'>
                Serving
            </label>
            <input 
                type='number' 
                min='1' 
                name='serving'
                className='recipe-edit__input'  
                id='serving'
                value={servings}
                onChange={e=>handleChange({servings: parseInt(e.target.value)||''})}/>
            
            <label 
                htmlFor='instructions'
                className='recipe-edit__label'>
                Instructions
            </label>
            <textarea 
                name='instructions'
                className='recipe-edit__input' 
                id='instructions'
                value={instruction}
                onChange={e=>handleChange({instruction: e.target.value})}>
            </textarea>
        </div>
        <br/>
        <label className='recipe-edit__label'>Ingredients</label>
        <div>
            { ingredients.map((ingredient)=>{
                return(
                    <RecipeIngredientEdit
                    key={ingredient.id}
                    ingredient={ingredient}
                    handleIngredientChange={handleIngredientChange}
                    handleIngredientDelete={handleIngredientDelete}
                    />
                )
            })}
            
        </div>
        <div className='recipe-edit__add-ingredient-btn-container'>
            <button 
                className='btn btn_primary'
                onClick={()=>handleIngredientAdd()}>
                Add Ingredient
            </button>
        </div>
    </div>
  )
}
