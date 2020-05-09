const users = require('./users-list');

const counter = () =>  {
    let count = 5;
    return () => {
      count += 1;
      return count;
    };
};

const nextId = counter();

const recipes = {
    "1" : {
        id: "1",
        author: "Sahana",
        title: "Spicy Golgappa",
        ingredients:  `
        1 cup Coriander Leaves
        1/2 cup Mint Leaves
        2 tsp Ginger Chopped
        4-5 Green Chilli Chopped
        3 tbsp Tamarind Paste
        1 tsp Black salt
        1/2 tsp Roasted Cumin Powder
        2 tsp Chaat Masala
        1/4 tsp Black pepper Powder
        2 tbsp Lemon Juice
        2 tsp Sugar
        4 cups Water
        1/4 cup Boondi `,
        instructions: `
        Add coriander leaves, mint leaves, ginger, green chilli and tamarind paste in blender and blend to make a smooth paste.
        Add water while grinding. Transfer this paste in a large glass jug.
        Add black salt, roasted cumin powder, chaat masala, black pepper powder, lemon juice, sugar and water and mix well.
        Adjust salt and lemon juice if needed.
        Add water and mix well.
        Refrigerate the pani for 3-4 hours.
        Add boondi just before serving`
    },
    "2": {
        id: "2",
        author: "Adarsh",
        title: "Chicken Biriyan",
        ingredients:  `
        300g basmati rice
        25g butter
        1 large onion, finely sliced
        1 bay leaf
        3 cardamom pods
        small cinnamon stick
        1 tsp turmeric
        4 skinless chicken breasts, cut into large chunks
        4 tbsp curry paste (we used Patak's balti paste)
        85g raisins
        850ml chicken stock
        30g coriander, ½ chopped, ½ leaves picked
        2 tbsp toasted flaked almonds, to serve`,
        instructions: `
        Soak 300g basmati rice in warm water, then wash in cold until the water runs clear.
        Heat 25g butter in a saucepan and cook 1 finely sliced large onion with 1 bay leaf, 3 cardamom pods and 1 small cinnamon stick for 10 mins.
        Sprinkle in 1 tsp turmeric, then add 4 chicken breasts, cut into large chunks, and 4 tbsp curry paste. Cook until aromatic.
        Stir the rice into the pan with 85g raisins, then pour over 850ml chicken stock.
        Place a tight-fitting lid on the pan and bring to a hard boil, then lower the heat to a minimum and cook the rice for another 5 mins.
        Turn off the heat and leave for 10 mins. Stir well, mixing through 15g chopped coriander. To serve, scatter over the leaves of the remaining 15g coriander and 2 tbsp toasted almonds.`
    },
    "3": {
        id: "3",
        author: "Sahana",
        title: "Dhai Poori",
        ingredients:  `
        6 puris / papdis
        ½ potato, boiled & peeled
        1 cup curd / yogurt, thick and fresh
        1 tsp sugar
        ½ onion, finely chopped
        ½ to mato, finely chopped
        ½ cup sev
        5 tsp tamarind chutney
        3 tsp green chutney
        pinch of kashmiri chili powder
        pinch of chaat masala
        salt to taste
        3 tsp coriander leaves, finely chopped`,
        instructions: `
        firstly, make a hole at the centre of puri with your thumb.
        further, stuff half tsp of boiled potatoes into each puris.
        furthermore, take a cup of curd and mix sugar in it.
        also add generous amount of sweet curd into each puris.
        sprinkle generous amount of chopped onions.
        also sprinkle and spread chopped tomatoes.
        furthermore, top with generous amount of thin sev.
        then pour and spread tamarind chutney.
        further add green chutney onto each puri.
        then also top with a tsp of curd.
        sprinkle chili powder, chaat masala and black salt or cooking salt.
        finally, garnish with coriander leaves and serve sev puri immediately.`
    },
    "4": {
        id: "4",
        author: "Adarsh",
        title: "Vegetable pulao",
        ingredients:  `
        2 tbsp ghee / clarified butter
        1 tsp cumin / jeera
        1 star anise
        1 inch cinnamon / dalchini
        4 cloves / lavang
        3 pods cardamom
        1 bay leaf / tej patta
        10 cashew / kaju
        1 onion, sliced
        1 tsp ginger garlic paste
        2 chilli, slit
        1 to mato, finely chopped
        1 potato / aloo, cube
        3 tbsp peas / matar
        1 carrot, chopped
        10 florets cauliflower / gobi
        5 beans, chopped
        12 cubes paneer / cottage cheese
        2 tbsp coriander, finely chopped
        2 tbsp mint / pudina, finely chopped
        ½ tsp garam masala
        1 tsp salt
        1 cup basmati rice, soaked 20 minutes
        2 cup water
        1 tsp lemon juice`,
        instructions: `
        firstly, in a large kadai, heat 2 tbsp ghee and saute 1 tsp cumin, 1 star anise, 1 inch cinnamon, 4 cloves, 3 pods cardamom, 1 bay leaf and 10 cashews.
        also, saute 1 onion followed by 1 tsp ginger garlic paste and 2 chilli.
        furthermore, add 1 tomato and saute until tomatoes turn soft and mushy.
        next, add 1 potato, 3 tbsp peas, 1 carrot, 10 florets cauliflower and 5 beans. saute for 2 minutes.
        add 12 cubes paneer, 2 tbsp coriander, 2 tbsp mint, ½ tsp garam masala and 1 tsp salt. saute for a minute.
        furthermore, add 1 cup basmati rice (soaked for 20 minutes) and saute gently.
        now add 2 cup water, 1 tsp lemon juice and stir well.
        cover and pressure cook for 2 whistles or till the rice gets cooked completely.
        finally, serve veg pulao along with onion tomato raita`
    },
    "5": {
        id: "5",
        author: "Sahana",
        title: "Gulab Jamoon",
        ingredients:  `
        1 cup sugar
        1 cup water
        3 cardamom, powdered
        1 tbsp lemon juice
        FOR GULAB JAMUN:
        9 tbsp milk powder
        3½ tbsp maida / all-purpose flour / plain flour
        1 tbsp rava / semolina / sooji
        pinch of baking soda
        1 tsp lemon juice
        1 tsp ghee / clarified butter
        4-5 tbsp milk, warm`,
        instructions: `
        firstly, in a wide pan take 1 cup of sugar.
        further, to that add 1 cup of water and get to a boil.
        then simmer for 4 minutes till the sugar syrup turns slightly sticky.
        now add cardamom powder.
        also add lemon juice to stop crystallization process.
        cover and keep aside.
        firstly in a large mixing bowl take milk powder.
        further, to that add maida and rava.
        then add pinch of baking soda
        also add ghee, lemon juice and crumble well.
        slowly add milk little by little and knead well.
        knead to a smooth and soft dough.
        furthermore, make small balls greasing ghee to hands.
        make sure there are no cracks on balls. else there are chances for gulab jamun to break while frying.
        heat the ghee on low flame and when the ghee is moderately hot, fry the jamuns.
        fry the balls on low flame stirring in between.
        fry till the balls turns golden brown.
        immediately, drop the hot jamuns into hot sugar syrup.
        cover the lid and rest for 2 hours. flame should be turned off.
        finally, the jamuns have doubled in size.`
    }
};

function addRecipe( uId, recipe ) {
    const nextRecipeId = nextId();
    let errorMessage = '';
    if(!recipe.title){
        errorMessage = errorMessage + 'Title ';
    }
    if(!recipe.ingredients){
        errorMessage = errorMessage + 'Ingredients ';
    }
    if(!recipe.instructions){
        errorMessage = errorMessage + 'Instructions ';
    }
    if(errorMessage != ''){
        errorMessage = errorMessage + 'field empty';
        return {code: 406, result: errorMessage};
    }
    recipes[nextRecipeId] = { id: nextRecipeId, author: users.users[uId].username, title: recipe.title,
                              ingredients: recipe.ingredients, instructions: recipe.instructions};
    return {code: 0, result: recipes[nextRecipeId]};
}

function getRecipesList(){
    return recipes;
}

function getRecipe(recipeId){
    if(recipes[recipeId]) {
        return recipes[recipeId];
    } else {
        return null;
    }
}

module.exports = {
    addRecipe,
    getRecipesList,
    getRecipe,
    recipes,
};