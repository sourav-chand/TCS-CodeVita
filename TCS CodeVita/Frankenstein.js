const input = require("fs").readFileSync(0, "utf-8").trim().split("\n");

const n = parseInt(input[0]);
const recipeLines = input.slice(1, n + 1);
const targetPotion = input[n + 1];

const recipes = Object.create(null);
const memo = Object.create(null);

for (const line of recipeLines) {
  const [potion, ingredientsStr] = line.split("=");
  const ingredients = ingredientsStr.split("+");
  if (!recipes[potion]) recipes[potion] = [];
  recipes[potion].push(ingredients);
}

function minOrbs(potion) {
  const stack = [[potion, 0]];
  const visited = Object.create(null);

  while (stack.length) {
    const [current, state] = stack.pop();

    if (memo[current] !== undefined) continue;
    if (!recipes[current]) {
      memo[current] = 0;
      continue;
    }

    if (state === 0) {
      stack.push([current, 1]);
      for (const ingredients of recipes[current]) {
        for (const ing of ingredients) {
          if (memo[ing] === undefined) stack.push([ing, 0]);
        }
      }
    } else {
      let minCost = Infinity;
      for (const ingredients of recipes[current]) {
        let cost = ingredients.length - 1;
        for (const ing of ingredients) {
          cost += memo[ing];
        }
        if (cost < minCost) minCost = cost;
      }
      memo[current] = minCost;
    }
  }

  return memo[potion];
}

process.stdout.write(String(minOrbs(targetPotion)));
