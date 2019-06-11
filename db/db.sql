DROP TABLE IF EXISTS recipes
DROP TABLE IF EXISTS ingredients
DROP TABLE IF EXISTS ingredient_recipes
CREATE TABLE recipes (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT type UNIQUE, description TEXT, minutes_needed INTEGER)
CREATE TABLE ingredients (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)
CREATE TABLE ingredient_recipes (id INTEGER PRIMARY KEY AUTOINCREMENT, ingredient_id INTEGER,recipe_id INTEGER,am_grams INTEGER, FOREIGN KEY(ingredient_id) REFERENCES ingredients(id),FOREIGN KEY(recipe_id) REFERENCES recipes(id))