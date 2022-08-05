import React from 'react'

export default function RecipeIngredientEdit(props) {
  const {
    ingredient,
    handleIngredientChange,
    handleIngredientDelete
  } = props;

  function handleChange(changes){
    handleIngredientChange(ingredient.id, {...ingredient, ...changes})
  }
  return (
    <div className='recipe-edit__ingredient-grid'>
      <div>Name</div>
      <input 
        className='recipe-edit__input' 
        type="text"
        value={ingredient.name}
        onChange={(e)=>handleChange({name: e.target.value})}/>
        <button 
          className='btn btn_danger'
          onClick={()=>handleIngredientDelete(ingredient.id)}
          >
            &times;
        </button>
        
      
      <div>Amount</div>
      <input 
        className='recipe-edit__input' 
        type="text"
        value={ingredient.amount}
        onChange={(e)=>handleChange({amount: e.target.value})}/>
      <div></div> 
    </div>
  )
}
