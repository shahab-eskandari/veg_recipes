import React, {useState, useEffect} from "react";
import RecipeList from "./RecipeList";
import '../style/css/App.css';
import {v4 as uuidv4} from 'uuid';  
import RecipeEdit from "./RecipeEdit";

export const recipeContext = React.createContext();
const LOCAL_STORAGE_KEY = 'vegRecipe.recipes'; 

function App() {

  const [recipes , setRecipes] = useState(sampleRecipes);
  const [editingRecipeId, setEditingRecipeId] = useState();
  const selectedRecipe = recipes.find(recipe=>recipe.id===editingRecipeId)
  

  useEffect(()=>{
    const recipesJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    if(recipesJSON!= null) setRecipes(JSON.parse(recipesJSON))
  },[])

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(recipes))
  },[recipes])

  const handleRecipeAdd=()=>{
    const newRecipe = {
      id: uuidv4(),
      name: '', 
      servings: 1,
      cookTime: '',
      instruction: '\n',
      ingredients: [
        {id: uuidv4(),
        name: '',
        amount: '' },
      ]
    }
    setEditingRecipeId(newRecipe.id)
    setRecipes([...recipes, newRecipe])
  }

  const handleRecipeDelete = (id)=>{
    if(selectedRecipe != null && selectedRecipe === id){
      setEditingRecipeId(undefined)
    }
    setRecipes(recipes.filter(recipe=>recipe.id !== id ))
  }

  const handleRecipeEdit = (id)=>{
    setEditingRecipeId(id);
  }

  function handleRecipeChange(id, recipe){
    const newRecipes = [...recipes];
    const index = newRecipes.findIndex(recipe=>recipe.id===id);
    newRecipes[index]=recipe; 
    setRecipes(newRecipes);  

  }

  const recipeContextValue = {
    handleRecipeAdd, 
    handleRecipeDelete,
    handleRecipeEdit,
    handleRecipeChange
  }
  
  return (
    <recipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes}/>
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe}/>}
    </recipeContext.Provider>
  );
}

export default App;

const sampleRecipes = [{
  id: uuidv4(),
  name: 'Red Zinger', 
  servings: 3,
  cookTime: '1:45',
  instruction: '\n1. Put salt on chicken\n2. Put chiken in oven\n3. Eat Red Zinger',
  ingredients: [
    {id: uuidv4(),
    name: 'Chiken',
    amount: '2 Pounds' },
    {id: uuidv4(),
      name: 'Salt',
      amount: '1 Tbs' } 
  ]
},
{
  id: uuidv4(),
  name: 'Kinoko burger', 
  servings: 1,
  cookTime: '1:45',
  instruction: '\n1. Put salt on burger\n2. Put burger in oven\n3. Eat kinoko burger',
  ingredients: [
    {id: uuidv4(),
    name: 'Pork',
    amount: '2 Pounds' },
    {id: uuidv4(),
      name: 'Paprika',
      amount: '2 Tbs' } 
  ]
}]
