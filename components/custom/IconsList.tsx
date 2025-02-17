"use client";

import { icons } from "lucide-react";
import { useState } from "react";

const foodIcons = [
    "Apple",
    "Beer",
    "Cake",
    "Candy",
    "Cheese",
    "Cocktail",
    "Coffee",
    "Cookie",
    "Drumstick",
    "Egg",
    "Fish",
    "Flame",
    "ForkKnife",
    "Grape",
    "GlassWater",
    "IceCream",
    "Leaf",
    "Lemon",
    "Martini",
    "Milk",
    "Pizza",
    "Salt",
    "Soup",
    "Steak",
    "Wine",
    "Wheat",
    "ShoppingCart",  // Можно для продуктов
    "CupSoda",
    "Soup",
    "EggFried",
    "Bread",
    "MugHot",
    "Utensils",
  ];
  

export default function IconsList() {
  const iconEntries = Object.entries(icons).filter(([name]) => foodIcons.includes(name));
  const [search, setSearch] = useState("");

  const filteredIcons = iconEntries.filter(([name]) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Food & Beverage Icons</h1>
      <input
        type="text"
        placeholder="Search icons..."
        className="w-full p-2 border rounded mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-5 gap-4">
        {filteredIcons.map(([name, Icon]) => (
          <div key={name} className="flex flex-col items-center p-2 border rounded-md">
            <Icon size={24} />
            <span className="text-xs mt-1">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
