"use client";

import Image from "next/image";
import {useState, useEffect} from "react";
import {useDishCategoryStore} from "@/lib/store/dish-categories";
import {useDishStore, Dish} from "@/lib/store/dishes";
import clsx from "clsx";


interface SelectDishProps {
    onSelectDish: (dish: Dish) => void; // Функция, вызываемая при выборе блюда
}

export default function SelectDish({onSelectDish}: SelectDishProps) {
    const {categories, fetchCategories} = useDishCategoryStore();
    const {dishesExt, fetchDishesExt} = useDishStore();
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    useEffect(() => {
        fetchCategories();
        fetchDishesExt();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                            "text-left w-48 h-14 p-2 border border-gray-200 bg-white flex justify-between items-center",
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
                            style={{color: category.color}}
                            className={clsx(
                                "text-left w-48 h-14 p-2 border border-gray-200 bg-white flex justify-between items-center",
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
                <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2 w-full">
                    {filteredDishes.length > 0 ? (
                        filteredDishes.map((dish) => (
                            <div
                                key={dish.id}
                                className="p-2 border border-gray-200 flex flex-col items-center min-h-36 space-y-4 shadow-sm hover:shadow-md transition-shadow bg-white hover:bg-slate-100 hover:cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onSelectDish(dish);
                                }} // 📌 Вызываем `onSelectDish`
                            >
                                <div className="flex justify-between">
                                    <Image
                                        src={dish.logo ? dish.logo : "/images/food.png"}
                                        alt={dish.name_ru ? dish.name_ru : "dish"}
                                        width={50}
                                        height={50}
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <span
                                        className={`${
                                            dish.remaining_quantity <= 0 ? 'text-red-500' : 'text-gray-600'
                                        } text-sm bg-gray-200 px-2 py-1 mb-4 rounded-full`}
                                    >
                                      {dish.remaining_quantity}
                                    </span>

                                </div>

                                {/* Текст под изображением */}
                                <div className="text-center">
                                    <p>{dish.name_ru}</p>
                                    <p className="font-semibold">{dish.price} тг.</p>
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
