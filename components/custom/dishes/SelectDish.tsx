"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useDishCategoryStore } from "@/lib/store/dish-categories";
import { useDishStore } from "@/lib/store/dishes";
import clsx from "clsx";

interface SelectDishProps {
  onSelectDish: (dish: any) => void; // Функция, вызываемая при выборе блюда
}

export default function SelectDish({ onSelectDish }: SelectDishProps) {
  const { categories, fetchCategories } = useDishCategoryStore();
  const { dishesExt, fetchDishesExt } = useDishStore();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    fetchCategories();
    fetchDishesExt();
  }, []);

  // Подсчет количества блюд в каждой категории
  const categoryDishCount = categories.map((category) => ({
    id: category.id,
    name: category.name,
    color: category.color,
    count: dishesExt.filter((dish) => dish.category === category.id).length,
  }));

  // Общее количество блюд
  const totalDishes = dishesExt.length;

  // Фильтрация блюд по категории или вывод всех
  const filteredDishes = selectedCategory
      ? dishesExt.filter((dish) => dish.category === selectedCategory)
      : dishesExt;

  return (
      <div className="pt-1">
        <div className="flex">
          {/* Вкладки (категории) слева */}
          <div className="flex flex-col border border-gray-50 p-2 bg-gray-50">
            {/* Кнопка "Все категории" */}
            <button
                onClick={() => setSelectedCategory(null)}
                className={clsx(
                    "text-left w-48 h-14 p-1 border border-gray-200 bg-white flex justify-between items-center",
                    "hover:bg-gray-100",
                    selectedCategory === null && "bg-gray-200"
                )}
            >
              <span>Все категории</span>
              <span className="text-gray-600 text-sm bg-gray-200 px-2 py-1 rounded-full">
              {totalDishes}
            </span>
            </button>

            {/* Категории блюд */}
            {categoryDishCount.map((category) => (
                <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    style={{ color: category.color }}
                    className={clsx(
                        "text-left w-48 h-14 p-1 border border-gray-200 bg-white flex justify-between items-center",
                        "hover:bg-gray-100",
                        selectedCategory === category.id && "bg-gray-200"
                    )}
                >
                  <span>{category.name}</span>
                  <span className="text-gray-600 text-sm bg-gray-200 px-2 py-1 rounded-full">
                {category.count}
              </span>
                </button>
            ))}
          </div>

          {/* Контент - список блюд */}
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredDishes.length > 0 ? (
                filteredDishes.map((dish) => (
                    <div
                        key={dish.id}
                        className="p-4 border border-gray-200 flex items-center space-x-4 shadow-sm hover:shadow-md transition-shadow bg-white hover:bg-slate-100 hover:cursor-pointer"
                        onClick={() => onSelectDish(dish)} // 📌 Вызываем `onSelectDish`
                    >
                      <Image
                          src={dish.logo ? dish.logo : "/images/food.png"}
                          alt={dish.name_ru ? dish.name_ru : "dish"}
                          width={50}
                          height={50}
                          className="w-12 h-12 rounded-full"
                      />

                      <div>
                        <p className="font-semibold">{dish.name_ru}</p>
                        <p className="font-semibold">{dish.remaining_quantity}</p>
                      </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">Нет блюд в этой категории</p>
            )}
          </div>
        </div>
      </div>
  );
}
