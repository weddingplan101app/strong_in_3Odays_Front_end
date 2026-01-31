"use client"

import { useState } from "react"
import { RecipeCard } from "@/components/recipe-card"
import { RecipeModal } from "@/components/recipe-modal"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Recipe {
  id: string
  title: string
  image: string
  difficulty: string
  prepTime: string
  cookTime: string
  totalTime: string
  calories: number
  rating: number
  servings: number
  description: string
  ingredients: string[]
  instructions: string[]
  nutrition: {
    protein: string
    carbs: string
    fats: string
    fiber: string
  }
}

export default function RecipesPage() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const recipes: Record<string, Recipe[]> = {
    breakfast: [
      {
        id: "r1",
        title: "Protein Pancakes",
        image: "/protein-pancakes-with-banana-and-honey.jpg",
        difficulty: "Easy",
        prepTime: "10 mins",
        cookTime: "15 mins",
        totalTime: "25 mins",
        calories: 350,
        rating: 4.8,
        servings: 2,
        description:
          "Fluffy protein-packed pancakes perfect for a post-workout breakfast. Rich in protein and complex carbs to fuel your day.",
        ingredients: [
          "2 cups oat flour",
          "2 scoops vanilla protein powder",
          "2 ripe bananas, mashed",
          "4 egg whites",
          "1 cup almond milk",
          "1 tsp baking powder",
          "1 tsp vanilla extract",
          "Pinch of salt",
          "Honey for serving (optional)",
        ],
        instructions: [
          "In a large bowl, mix together oat flour, protein powder, baking powder, and salt.",
          "In another bowl, whisk together mashed bananas, egg whites, almond milk, and vanilla extract.",
          "Pour wet ingredients into dry ingredients and mix until just combined. Don't overmix.",
          "Heat a non-stick pan over medium heat and lightly grease with cooking spray.",
          "Pour 1/4 cup of batter for each pancake and cook until bubbles form on the surface, about 2-3 minutes.",
          "Flip and cook for another 2 minutes until golden brown.",
          "Serve warm with fresh fruit and a drizzle of honey if desired.",
        ],
        nutrition: {
          protein: "28g",
          carbs: "45g",
          fats: "8g",
          fiber: "6g",
        },
      },
      {
        id: "r2",
        title: "Egg White Omelette",
        image: "/healthy-egg-white-omelette-with-vegetables.jpg",
        difficulty: "Easy",
        prepTime: "5 mins",
        cookTime: "10 mins",
        totalTime: "15 mins",
        calories: 180,
        rating: 4.5,
        servings: 1,
        description: "A light and nutritious omelette loaded with fresh vegetables and lean protein.",
        ingredients: [
          "4 egg whites",
          "1/2 cup chopped bell peppers (mixed colors)",
          "1/4 cup diced onions",
          "1/4 cup chopped tomatoes",
          "2 cups fresh spinach",
          "1 clove garlic, minced",
          "Salt and black pepper to taste",
          "Cooking spray",
        ],
        instructions: [
          "Heat a non-stick pan over medium heat and spray with cooking spray.",
          "Sauté onions and bell peppers for 2-3 minutes until softened.",
          "Add garlic and spinach, cook until spinach wilts.",
          "Pour egg whites over the vegetables, season with salt and pepper.",
          "Cook for 3-4 minutes without stirring, allowing the bottom to set.",
          "Gently fold the omelette in half and cook for another minute.",
          "Slide onto a plate and serve immediately with whole grain toast.",
        ],
        nutrition: {
          protein: "20g",
          carbs: "12g",
          fats: "2g",
          fiber: "4g",
        },
      },
      {
        id: "r3",
        title: "Overnight Oats",
        image: "/overnight-oats-with-berries-and-nuts.jpg",
        difficulty: "Easy",
        prepTime: "5 mins",
        cookTime: "0 mins",
        totalTime: "8 hours",
        calories: 320,
        rating: 4.9,
        servings: 1,
        description: "Make-ahead breakfast packed with fiber, protein, and healthy fats to keep you full all morning.",
        ingredients: [
          "1/2 cup rolled oats",
          "1 scoop protein powder",
          "1 cup unsweetened almond milk",
          "1 tbsp chia seeds",
          "1/2 banana, sliced",
          "1/4 cup mixed berries",
          "1 tbsp almond butter",
          "1 tsp honey (optional)",
          "Pinch of cinnamon",
        ],
        instructions: [
          "In a mason jar or container, combine oats, protein powder, chia seeds, and cinnamon.",
          "Pour in almond milk and stir well to combine all ingredients.",
          "Add half of the banana slices and berries, mixing gently.",
          "Cover and refrigerate overnight or for at least 6-8 hours.",
          "In the morning, give it a good stir and add more almond milk if too thick.",
          "Top with remaining fresh fruit, almond butter, and a drizzle of honey.",
          "Enjoy cold or microwave for 1 minute for a warm breakfast.",
        ],
        nutrition: {
          protein: "25g",
          carbs: "42g",
          fats: "10g",
          fiber: "10g",
        },
      },
    ],
    lunch: [
      {
        id: "r4",
        title: "Healthy Jollof Rice",
        image: "/healthy-nigerian-jollof-rice-with-vegetables.jpg",
        difficulty: "Intermediate",
        prepTime: "15 mins",
        cookTime: "40 mins",
        totalTime: "55 mins",
        calories: 420,
        rating: 4.7,
        servings: 4,
        description: "A healthier version of the beloved Nigerian classic, packed with vegetables and lean protein.",
        ingredients: [
          "2 cups brown rice (or white rice)",
          "1 can (400g) tomato puree",
          "1 large onion, blended",
          "3 bell peppers (red, yellow, green), diced",
          "2 fresh tomatoes, blended",
          "2 scotch bonnet peppers (optional, for heat)",
          "3 cloves garlic, minced",
          "1 tsp thyme",
          "1 tsp curry powder",
          "2 bay leaves",
          "3 cups low-sodium chicken or vegetable stock",
          "2 tbsp olive oil",
          "Salt and pepper to taste",
          "1 cup mixed vegetables (carrots, green beans, peas)",
        ],
        instructions: [
          "Heat olive oil in a large pot over medium heat. Add blended onions and cook until the water evaporates and it starts to fry.",
          "Add tomato puree and fresh blended tomatoes. Fry for 10-15 minutes, stirring frequently until the sauce thickens and the raw taste is gone.",
          "Add garlic, thyme, curry powder, bay leaves, and scotch bonnet peppers. Stir well.",
          "Pour in the stock and bring to a boil. Season with salt and pepper.",
          "Add the rice, stir once, then reduce heat to low. Cover tightly and cook for 25-30 minutes without lifting the lid.",
          "After 20 minutes, add the mixed vegetables and diced bell peppers on top without stirring.",
          "Once rice is cooked and liquid is absorbed, fluff with a fork and mix in the vegetables.",
          "Serve hot with grilled chicken or fish on the side.",
        ],
        nutrition: {
          protein: "12g",
          carbs: "68g",
          fats: "9g",
          fiber: "8g",
        },
      },
      {
        id: "r5",
        title: "Grilled Chicken Salad",
        image: "/grilled-chicken-salad.png",
        difficulty: "Easy",
        prepTime: "15 mins",
        cookTime: "15 mins",
        totalTime: "30 mins",
        calories: 380,
        rating: 4.6,
        servings: 2,
        description: "Fresh and satisfying salad with perfectly seasoned grilled chicken and a tangy vinaigrette.",
        ingredients: [
          "2 chicken breasts (about 400g)",
          "4 cups mixed salad greens",
          "1 cup cherry tomatoes, halved",
          "1 cucumber, sliced",
          "1 avocado, diced",
          "1/4 red onion, thinly sliced",
          "1/4 cup feta cheese (optional)",
          "2 tbsp olive oil",
          "1 tbsp lemon juice",
          "1 tsp Dijon mustard",
          "1 tsp dried oregano",
          "Salt and pepper to taste",
        ],
        instructions: [
          "Season chicken breasts with oregano, salt, and pepper.",
          "Heat a grill pan or regular pan over medium-high heat.",
          "Grill chicken for 6-7 minutes per side until fully cooked (internal temp 165°F/74°C).",
          "Let chicken rest for 5 minutes, then slice into strips.",
          "In a large bowl, combine salad greens, tomatoes, cucumber, avocado, and red onion.",
          "Make the dressing by whisking together olive oil, lemon juice, Dijon mustard, salt, and pepper.",
          "Add sliced chicken on top of the salad.",
          "Drizzle with dressing, sprinkle feta if using, and toss gently before serving.",
        ],
        nutrition: {
          protein: "42g",
          carbs: "18g",
          fats: "16g",
          fiber: "8g",
        },
      },
      {
        id: "r6",
        title: "Fish Pepper Soup",
        image: "/nigerian-fish-pepper-soup-with-herbs.jpg",
        difficulty: "Intermediate",
        prepTime: "10 mins",
        cookTime: "25 mins",
        totalTime: "35 mins",
        calories: 280,
        rating: 4.8,
        servings: 4,
        description: "A light, spicy Nigerian soup that's warming, nutritious, and perfect for recovery days.",
        ingredients: [
          "1kg firm white fish (tilapia or catfish), cut into pieces",
          "2 liters water",
          "1 large onion, sliced",
          "3 cloves garlic, minced",
          "1 thumb-sized ginger, sliced",
          "2-3 scotch bonnet peppers (adjust to taste)",
          "2 tbsp ground pepper soup spice",
          "2 seasoning cubes",
          "1/2 cup chopped scent leaves (or basil)",
          "1 tbsp ground crayfish (optional)",
          "Salt to taste",
          "2 medium yams, peeled and cut into chunks (optional)",
        ],
        instructions: [
          "In a large pot, bring water to a boil. Add sliced onions, garlic, ginger, and scotch bonnet peppers.",
          "Add pepper soup spice, seasoning cubes, crayfish, and salt. Let it boil for 5 minutes to release flavors.",
          "If using yam, add the chunks and cook for 10 minutes until tender.",
          "Gently add fish pieces to the pot. Be careful not to break them.",
          "Reduce heat and simmer for 10-12 minutes until fish is cooked through.",
          "Taste and adjust seasoning as needed.",
          "Add scent leaves in the last 2 minutes of cooking.",
          "Serve hot in bowls with the broth. Perfect on its own or with white rice.",
        ],
        nutrition: {
          protein: "38g",
          carbs: "8g",
          fats: "10g",
          fiber: "2g",
        },
      },
    ],
    dinner: [
      {
        id: "r7",
        title: "Vegetable Stir Fry",
        image: "/colorful-vegetable-stir-fry-with-tofu.jpg",
        difficulty: "Easy",
        prepTime: "10 mins",
        cookTime: "12 mins",
        totalTime: "22 mins",
        calories: 240,
        rating: 4.5,
        servings: 2,
        description: "Quick, colorful, and nutrient-dense stir fry that's ready in minutes.",
        ingredients: [
          "2 cups broccoli florets",
          "1 red bell pepper, sliced",
          "1 yellow bell pepper, sliced",
          "1 cup snap peas",
          "1 carrot, julienned",
          "200g firm tofu or chicken, cubed",
          "3 cloves garlic, minced",
          "1 thumb ginger, grated",
          "2 tbsp low-sodium soy sauce",
          "1 tbsp sesame oil",
          "1 tsp honey",
          "1/4 tsp red pepper flakes",
          "2 tsp sesame seeds",
          "2 spring onions, chopped",
        ],
        instructions: [
          "If using tofu, press it to remove excess water, then cut into cubes and pat dry.",
          "Heat sesame oil in a large wok or pan over high heat.",
          "Add tofu or chicken and cook until golden brown, about 4-5 minutes. Remove and set aside.",
          "In the same pan, add a bit more oil if needed. Stir fry garlic and ginger for 30 seconds.",
          "Add broccoli and carrots first (they take longer to cook), stir fry for 2 minutes.",
          "Add bell peppers and snap peas, continue stir frying for another 3-4 minutes.",
          "Mix soy sauce, honey, and red pepper flakes in a small bowl. Pour over vegetables.",
          "Return tofu/chicken to the pan, toss everything together for 1 minute.",
          "Garnish with sesame seeds and spring onions. Serve immediately with brown rice or quinoa.",
        ],
        nutrition: {
          protein: "18g",
          carbs: "28g",
          fats: "8g",
          fiber: "7g",
        },
      },
      {
        id: "r8",
        title: "Lean Beef Stew",
        image: "/healthy-beef-stew-with-vegetables.jpg",
        difficulty: "Intermediate",
        prepTime: "20 mins",
        cookTime: "90 mins",
        totalTime: "110 mins",
        calories: 450,
        rating: 4.9,
        servings: 6,
        description: "Hearty and comforting beef stew with tender meat and vegetables in a rich, savory broth.",
        ingredients: [
          "800g lean beef chuck, cut into cubes",
          "3 tbsp whole wheat flour",
          "2 tbsp olive oil",
          "1 large onion, diced",
          "4 cloves garlic, minced",
          "4 cups low-sodium beef broth",
          "2 cups diced tomatoes (canned or fresh)",
          "3 large carrots, cut into chunks",
          "3 potatoes, cubed",
          "2 celery stalks, chopped",
          "2 bay leaves",
          "1 tsp thyme",
          "1 tsp rosemary",
          "1 tsp paprika",
          "Salt and pepper to taste",
          "2 cups green beans, trimmed",
          "Fresh parsley for garnish",
        ],
        instructions: [
          "Season beef cubes with salt and pepper, then toss with flour until evenly coated.",
          "Heat olive oil in a large pot over medium-high heat. Brown beef in batches, about 3-4 minutes per side. Set aside.",
          "In the same pot, sauté onions until softened, about 3 minutes. Add garlic and cook for 1 minute.",
          "Return beef to the pot. Add beef broth, diced tomatoes, bay leaves, thyme, rosemary, and paprika.",
          "Bring to a boil, then reduce heat to low. Cover and simmer for 60 minutes, stirring occasionally.",
          "Add carrots, potatoes, and celery. Continue simmering for another 25-30 minutes until vegetables are tender.",
          "Add green beans in the last 10 minutes of cooking.",
          "Taste and adjust seasoning. Remove bay leaves.",
          "Serve hot, garnished with fresh parsley. Great with brown rice or crusty whole grain bread.",
        ],
        nutrition: {
          protein: "42g",
          carbs: "35g",
          fats: "14g",
          fiber: "6g",
        },
      },
    ],
  }

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe)
    setModalOpen(true)
  }

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Healthy Recipes</h1>
        <p className="text-muted-foreground">Quick Nigerian recipes for your fitness journey</p>
      </div>

      <Tabs defaultValue="breakfast" className="w-full">
        <TabsList className="w-full sm:w-auto sm:inline-flex justify-start">
          <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
          <TabsTrigger value="lunch">Lunch</TabsTrigger>
          <TabsTrigger value="dinner">Dinner</TabsTrigger>
        </TabsList>

        <TabsContent value="breakfast" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.breakfast.map((recipe) => (
              <RecipeCard key={recipe.id} {...recipe} onClick={() => handleRecipeClick(recipe)} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="lunch" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.lunch.map((recipe) => (
              <RecipeCard key={recipe.id} {...recipe} onClick={() => handleRecipeClick(recipe)} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="dinner" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.dinner.map((recipe) => (
              <RecipeCard key={recipe.id} {...recipe} onClick={() => handleRecipeClick(recipe)} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <RecipeModal recipe={selectedRecipe} open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  )
}
