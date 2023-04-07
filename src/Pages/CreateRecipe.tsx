import React, { useState } from "react";
import Axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";

const Create_Recipe = () => {
  const userID = useGetUserID();
  const [recipe, setRecipe] = useState<any>({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const handleChange = (e: any) => {
    //adding data to our body
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (e: any, idx: number) => {
    //adding ingredients to the recipe object
    const { value } = e.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const navigate = useNavigate();
  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await Axios.post("http://localhost:3001/recipes", recipe);
      alert("New Recipe Created");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={handleChange} />

        <label htmlFor="ingredients">Ingredients</label>
        <button onClick={addIngredient} type="button">
          Add Ingredient
        </button>
        {recipe.ingredients.map((ingredient: string, idx: number) => (
          <input
            key={idx}
            type="text"
            name="ingredient"
            value={ingredient}
            onChange={(event) => handleIngredientChange(event, idx)}
          />
        ))}
        <label htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          onChange={handleChange}
        ></textarea>

        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          onChange={handleChange}
        />

        <label htmlFor="cookingTime">Cooking Time</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          onChange={handleChange}
        />
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};

export default Create_Recipe;
