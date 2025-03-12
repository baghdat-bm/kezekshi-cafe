"use client";

import { useState, useEffect } from "react";
import { useDishCategoryStore } from "@/lib/store/dish-categories";
import { useDishStore } from "@/lib/store/dishes";
import clsx from "clsx";

export default function SelectDish() {
  const { categories, fetchCategories } = useDishCategoryStore();
  const { dishes, fetchDishes } = useDishStore();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(
    categories.length ? categories[0].id : null
  );

  useEffect(() => {
    fetchCategories();
    fetchDishes();
  }, []);

  // Фильтрация блюд по категории
  const filteredDishes = selectedCategory
    ? dishes.filter((dish) => dish.category === selectedCategory)
    : dishes;

  return (
    <div className="pt-5">
      <div className="flex">
        {/* Вкладки (категории) слева */}
        <div className="flex flex-col border border-gray-200 p-2 bg-gray-100">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              style={{ color: category.color }}
              className={clsx(
                "text-left w-52 h-14 p-1 border border-gray-200 bg-white",
                "hover:bg-yellow-50",
                selectedCategory === category.id && "bg-yellow-50"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Контент справа (блюда) */}
        <div className="p-4 w-full border border-gray-200 bg-white">
          <div className="grid grid-cols-2 gap-4">
            {filteredDishes.length > 0 ? (
              filteredDishes.map((dish) => (
                <div
                  key={dish.id}
                  className="p-4 border border-gray-200 flex items-center space-x-4 shadow-sm hover:shadow-md transition-shadow bg-white"
                >
                  <img
                    src={dish.logo}
                    alt={dish.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{dish.name}</p>
                    <p className="text-sm text-gray-500">
                      Код: {dish.barcode || "—"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Нет блюд в этой категории</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}