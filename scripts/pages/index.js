import { recipes } from "../../data/recipes.js";

// Récupération des recettes initiales
function getRecipes() {
  return recipes;
}
//  DOM card container
const main = document.querySelector(".mainContainer");

const recipeCard = document.createElement("div");
main.appendChild(recipeCard);
recipeCard.classList.add("recipeCard");

function createRecipes(recipes) {
  recipeCard.innerHTML = "";
  recipes.forEach((recipe) => {
    const titleRecipe = document.createElement("H2");
    titleRecipe.innerText = recipe.name;
    const imgRecipe = `../../assets/recipes-img/${recipe.image}`;
    const img = document.createElement("img");
    img.alt = recipe.image;
    img.src = imgRecipe;
    const timeRecipe = document.createElement("em");
    timeRecipe.innerHTML = `${recipe.time}min`;
    const cardText = document.createElement("div");
    cardText.classList.add("cardText");
    const recipeTitle = document.createElement("H3");
    recipeTitle.innerText = "RECETTE";
    const cardBody = document.createElement("div");
    cardBody.classList.add("cardBody");
    const recipeDescription = document.createElement("p");
    recipeDescription.innerText = recipe.description;
    const recipeIngredientsTitle = document.createElement("H3");
    recipeIngredientsTitle.innerText = "INGREDIENTS";
    const ingredientsList = document.createElement("div");
    ingredientsList.classList.add("ingredientsList");

    recipe.ingredients.forEach((ingredients) => {
      const name = document.createElement("H4");
      if (ingredients) {
        if (ingredients?.ingredient) {
          if (ingredients?.quantity) {
            if (ingredients?.unit) {
              name.innerHTML = `${ingredients.ingredient}<br><span>${ingredients.quantity} ${ingredients.unit}</span>`;
            } else {
              name.innerHTML = `${ingredients.ingredient}<br><span>${ingredients.quantity}</span>`;
            }
          } else {
            name.innerHTML = `${ingredients.ingredient}`;
          }
        }
      }
      ingredientsList.appendChild(name);
    });

    recipeCard.appendChild(cardBody);
    cardBody.appendChild(img);
    cardBody.appendChild(timeRecipe);
    cardBody.appendChild(titleRecipe);
    cardBody.appendChild(cardText);
    cardText.appendChild(recipeTitle);
    recipeTitle.appendChild(recipeDescription);
    cardBody.appendChild(recipeIngredientsTitle);
    cardBody.appendChild(ingredientsList);
  });
}

//DOM navBar

const selectIngredient = document.querySelector(".btn_dropdown_ingredient");
const dropdown_content_ing = document.querySelector(".dropdown_content_ing");
let ingredientList = document.getElementById("ingredientList");
const arrowDown = document.querySelector(".arrow_down");
const arrowUp = document.querySelector(".arrow_up");
selectIngredient.addEventListener("click", () => {
  if (dropdown_content_ing.style.display === "none") {
    dropdown_content_ing.style.display = "block";
    ingredientList.style.display = "block";
    arrowDown.style.display = "none";
    arrowUp.style.display = "block";
  } else {
    dropdown_content_ing.style.display = "none";
    arrowDown.style.display = "block";
    arrowUp.style.display = "none";
  }
});

const listIngredient = document.getElementById("ingredientList");
function listIngredients(recipes) {
  let allIngredients = new Set();
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      allIngredients.add(ingredient.ingredient);
    });
  });
  //return Array.from(allIngredients);
  const ingredientsArray = Array.from(allIngredients);

  // Clear the existing options
  listIngredient.innerHTML = "";

  // Add a default empty option
  const defaultOption = document.createElement("option");
  defaultOption.textContent = "";
  defaultOption.value = "";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  listIngredient.appendChild(defaultOption);

  // Add each ingredient to the select element
  ingredientsArray.forEach((ingredient) => {
    const option = document.createElement("option");
    option.value = ingredient;
    option.textContent = ingredient;
    listIngredient.appendChild(option);
  });
  return ingredientsArray;
}

function init() {
  getRecipes();

  console.log("photos des recettes", createRecipes(recipes));
  console.log("Liste d'ingredients", listIngredients(recipes));
  console.log("Liste de recettes", getRecipes());
  return recipes;
}

// Appel de la fonction d'initialisation après chargement du DOM
window.addEventListener("DOMContentLoaded", init);

//searchBar
const input = document.querySelector("#input");

const selectedRecipies = [];
const selectedIngredients = [];
input.addEventListener("keydown", () => {
  searchRecipies();
});
// fonction appelée après chaque action (saisie d'une recherche, suppression d'un ingrédient, ajout d'un ingrédient, d'un ustencile..)
function searchRecipies() {
  let filteredRecipes = [];
  // Je vérifie si qqch a été saisi. Le cas échéant, je dois chercher la chaine saisie dans les recettes
  const searchedValue = input.value.trim();
  if (searchedValue.length > 2) {
    filteredRecipes = recipes.filter((recipe) => {
      return recipe.name.toLowerCase().includes(searchedValue.toLowerCase());
    });
  } else {
    filteredRecipes = recipes;
  }
  // Ensuite, je vérifie si des ingrédients ont été sélectionnés, si oui on vérifie
  if (selectedRecipies.length > 0) {
    filteredRecipes = filteredRecipes.filter((recipe) => {
      return recipe.ingredients.some;
    });
  } else {
  }
  createRecipes(filteredRecipes);
}
// autres filtres

function searchIngredients() {
  let filteredIngredients = [];
  const searchedValue = input.value.trim();
  if (searchedValue.length > 2) {
    filteredIngredients = recipes.filter((ingredient) => {
      return ingredient.ingredients
        .toLowerCase()
        .includes(searchedValue.toLowerCase());
    });
  } else {
    filteredIngredients = recipes;
  }
  if (selectedIngredients.length > 0) {
    filteredIngredients = recipes.filter((ingredient) => {
      return ingredient.ingredients.some;
    });
  } else {
  }
  createRecipes(filteredIngredients);
} // une fois que tout est filtré, je reconstruit ma liste de recette dans l'html
