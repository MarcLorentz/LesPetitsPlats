import { recipes } from "../../data/recipes.js";

// Récupération des recettes initiales
function getRecipes() {
  return recipes;
}
//  DOM CARD container
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

//DOM NAVBAR

const selectIngredient = document.querySelector(".btn_dropdown_ingredient");
const dropdown_content_ing = document.querySelector(".dropdown_content_ing");
let ingredientList = document.getElementById("ingredientList");
//const recipeList = document.getElementById("recipeList");
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

//SELECTION par TAGS dropdown ingrédients
const ingredientSelected = document.getElementById("ingredientSelected");
const closeIng = document.querySelector(".closeIng");
const listIngredient = document.getElementById("ingredientList");
const ingredientSelectedContent = document.getElementById(
  "ingredientSelectedContent"
);
//Création de la liste des Ingrédients
function listIngredients(recipes) {
  let allIngredients = new Set();
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      allIngredients.add(ingredient.ingredient);
    });
  });
  //retourne le tableau de (allIngredients);
  const ingredientsArray = Array.from(allIngredients);

  // on vide listIngredients//à voir!!!!
  listIngredient.innerHTML = "";

  // on ajoute une option vide
  const defaultOption = document.createElement("a");
  defaultOption.textContent = "";
  defaultOption.href = "";
  listIngredient.appendChild(defaultOption);

  // on ajoute tous les ingrédients des recettes sélectionnées depuis la searchBar
  ingredientsArray.forEach((ingredient) => {
    const a = document.createElement("a");
    a.href = ingredient;
    a.textContent = ingredient;
    a.addEventListener("click", (event) => {
      event.preventDefault();
      displayIngredientSelected(ingredient);
      updateRecipes(ingredient);
      //toggleIngredientSelection(ingredient);
    });
    listIngredient.appendChild(a);
  });
  return ingredientsArray;
}

let selectedIngredients = [];
// fonction de mise à jour des recettes suivant ingredient sélectionné de la liste
function updateRecipes(selectedIngredient) {
  //const filteredRecipes = recipes.filter((recipe) =>  recipe.ingredients.some((ing) => ing.ingredient === selectedIngredient)
  //);
  selectedIngredients.push(selectedIngredient);
  searchRecipies();
  //createRecipes(filteredRecipes);
}
function displayIngredientSelected(ingredient) {
  dropdown_content_ing.style.display = "none";
  // montre la section ingredient
  ingredientSelected.style.display = "block";
  ingredientSelectedContent.textContent = `${ingredient}`;
}
/*let selectedIngredients = [];
// fonction de mise à jour des recettes suivant ingredient sélectionné de la liste
function updateRecipes() {
  let filteredRecipes = recipes;

  if (selectedIngredients.length > 0) {
    filteredRecipes = filteredRecipes.filter((recipe) => {
      return selectedIngredients.every((ingredient) => {
        return recipe.ingredients.some((ing) => ing.ingredient === ingredient);
      });
    });
  }

  createRecipes(filteredRecipes);
}
function toggleIngredientSelection(ingredient) {
  const index = selectedIngredients.indexOf(ingredient);
  if (index === -1) {
    // Ajouter l'ingrédient à la liste sélectionnée
    selectedIngredients.push(ingredient);
  } else {
    // Retirer l'ingrédient de la liste sélectionnée
    selectedIngredients.splice(index, 1);
  }
  updateSelectedIngredientsDisplay();
  updateRecipes();
}
function updateSelectedIngredientsDisplay() {
  // Clear the selected ingredients display
  ingredientSelectedContent.innerHTML = "";

  selectedIngredients.forEach((ingredient) => {
    const span = document.createElement("span");
    span.textContent = ingredient;
    span.classList.add("selected-ingredient");
    const close = document.createElement("span");
    close.innerHTML =
      '<img class="crossClose" src="./assets/icones/crossCloseBlack.png"/>';
    close.classList.add("closeIng");
    close.addEventListener("click", () => {
      toggleIngredientSelection(ingredient);
    });
    span.appendChild(close);
    ingredientSelectedContent.appendChild(span);
  });
}*/
// Close the ingredient details section when the close button is clicked
closeIng.addEventListener("click", () => {
  ingredientSelected.style.display = "none";
});

//INITIALISATION des éléments
function init() {
  getRecipes();

  console.log("photos des recettes", createRecipes(recipes));
  console.log("Liste d'ingredients", listIngredients(recipes));
  console.log("Liste de recettes", getRecipes());

  return recipes;
}

// Appel de la fonction d'initialisation après chargement du DOM
window.addEventListener("DOMContentLoaded", init);

//SEARCHBAR sélections
const input = document.querySelector("#input");

const selectedRecipies = [];
input.addEventListener("keydown", () => {
  searchRecipies();
});
// fonction appelée après chaque action (saisie d'une recherche, suppression d'un ingrédient, ajout d'un ingrédient, d'un ustencile..)
function searchRecipies() {
  let filteredRecipes = []; //Une variable filteredRecipes est déclarée pour stocker les recettes filtrées
  // Je vérifie si qqch a été saisi. Le cas échéant, je dois chercher la chaine saisie dans les recettes
  const searchedValue = input.value.trim(); //La valeur saisie par l'utilisateur dans le champ de recherche (input)
  // est récupérée et nettoyée des espaces en début et en fin
  //Si la valeur saisie (searchedValue) contient plus de 2 caractères,
  //les recettes (recipes) sont filtrées pour ne garder que celles dont le nom (recipe.name) contient
  // la chaîne saisie (insensible à la casse). Si la chaîne saisie contient 2 caractères ou moins,
  // toutes les recettes sont conservées (filteredRecipes = recipes)
  if (searchedValue.length > 2) {
    filteredRecipes = recipes.filter((recipe) => {
      return recipe.name.toLowerCase().includes(searchedValue.toLowerCase());
    });
  } else {
    filteredRecipes = recipes;
  }
  // Ensuite, je vérifie si des ingrédients ont été sélectionnés, si oui on vérifie
  //Si des ingrédients ont été sélectionnés (selectedIngredients.length > 0),
  //les recettes déjà filtrées (filteredRecipes) sont filtrées à nouveau pour ne garder que celles qui
  //contiennent au moins un des ingrédients sélectionnés. Cela se fait en vérifiant si l'ingrédient de la recette (ingredient.ingredient)
  // est présent dans la liste des ingrédients sélectionnés (selectedIngredients)
  if (selectedIngredients.length > 0) {
    filteredRecipes = filteredRecipes.filter((recipe) => {
      return recipe.ingredients.some((ingredient) => {
        return selectedIngredients.includes(ingredient.ingredient);
      });
    });
  } else {
  }
  listIngredients(filteredRecipes);
  createRecipes(filteredRecipes);
}

// autres filtres

// une fois que tout est filtré, je reconstruit ma liste de recette dans l'html
