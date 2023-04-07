import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";

const Saved = () => {
  const [recipe, setRecipe] = useState<any>([]);

  const userID = useGetUserID();

  useEffect(() => {
    const savedRecipe = async () => {
      try {
        const response = await Axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userID}`
        );
        setRecipe(response.data);

        // console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    savedRecipe();
  }, []);

  // console.log(recipe);

  return (
    <div>
      <h1>Saved Recipes</h1>

      <ul>
        {recipe.map((recipe: any) => {
          return (
            <div key={recipe._id}>
              <li>
                <div>
                  <h2>{recipe.name}</h2>
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

export default Saved;
