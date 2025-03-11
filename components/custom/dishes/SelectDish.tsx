"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useDishCategoryStore } from "@/lib/store/dish-categories";
import { useDishStore } from "@/lib/store/dishes";
import clsx from "clsx";

export default function SelectDish() {
  const { categories, fetchCategories } = useDishCategoryStore();
  const { dishes, fetchDishes } = useDishStore();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    fetchCategories();
    fetchDishes();
  }, []);

  // Фильтрация блюд по категории
  const filteredDishes = selectedCategory
    ? dishes.filter((dish) => dish.category === selectedCategory)
    : dishes;

  return (
    <div className="pt-40">
    <Tabs
      defaultValue={categories.length ? categories[0].id.toString() : ""}
      className="flex"
      onValueChange={(value) => setSelectedCategory(Number(value))}
    >
      {/* Вкладки (категории) слева */}
      <TabsList className="flex flex-col w-48 border-r p-2 rounded-lg">
        {categories.map((category) => (
          <TabsTrigger key={category.id} value={category.id.toString()}
            style={{ color: category.color }} className={clsx(
                "w-full text-left px-4 py-2 rounded-lg transition-all",
                "hover:bg-blue-100 hover:text-white",
                "data-[state=active]:bg-blue-200 data-[state=active]:text-white data-[state=active]:font-semibold"
              )}>
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Контент справа (блюда) */}
      <div className="p-4 w-full">
        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id.toString()}>
            <div className="grid grid-cols-2 gap-4">
              {filteredDishes.length > 0 ? (
                filteredDishes.map((dish) => (
                  <div
                    key={dish.id}
                    className="p-4 border rounded-lg flex items-center space-x-4 shadow-sm hover:shadow-md transition-shadow"
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
          </TabsContent>
        ))}
      </div>
    </Tabs>
    </div>
  );
}
