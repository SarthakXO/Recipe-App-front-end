import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";

const Home = () => {
  const [recipe, setRecipe] = useState<any>([]);

  const [savedRecipe, setSavedRecipe] = useState<string>("");

  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await Axios.get(`http://localhost:3001/recipes`);
        setRecipe(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecipe();

    const fetchSavedRecipe = async () => {
      try {
        const response = await Axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipe(response.data.savedRecipes);
        // console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSavedRecipe();
  }, []);

  // console.log(recipe);

  const saveRecipe = async (recipeID: any) => {
    try {
      await Axios.put(`http://localhost:3001/recipes`, {
        recipeID,
        userID,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const isRecipeSaved = (id: string) => savedRecipe.includes(id);
  return (
    <div>
      <h1>Recipes</h1>

      <ul>
        {recipe.map((recipe: any) => {
          return (
            <div key={recipe._id}>
              <li>
                <div>
                  <h2>{recipe.name}</h2>

                  <button
                    onClick={() => saveRecipe(recipe._id)}
                    disabled={isRecipeSaved(recipe._id)}
                  >
                    <b>
                      {isRecipeSaved(recipe._id) ? "Bookmarked" : "Bookmark"}
                    </b>
                  </button>
                </div>
                <div className="instructions">
                  <p>{recipe.instructions}</p>
                </div>
                <img src={recipe.imageUrl} alt={recipe.name} />
                <p>
                  <b>{recipe.cookingTime} (mins)</b>
                </p>
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
