'use client';

import { useEffect } from 'react';
import { useDishCategoryStore } from '@/lib/store/dish-categories';
import Image from "next/image";

interface DishCategoriesProps {
    token: string;
}

const DishCategories: React.FC<DishCategoriesProps> = ({ token }) => {
    const { categories, fetchCategories } = useDishCategoryStore();

    useEffect(() => {
        fetchCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
            {categories.map((category) => (
                <div
                    key={category.id}
                    className="flex flex-col items-center justify-center p-4 rounded-lg shadow-lg"
                    style={{ backgroundColor: category.color }}
                >
                    <Image
                        src={category.logo || '/images/food.png'}
                        alt={category.name}
                        className="w-20 h-20 object-cover mb-2 white-filter"
                        unoptimized={true}
                    />
                    <span className="text-white font-bold text-lg">{category.name}</span>
                </div>
            ))}
        </div>
    );
};

export default DishCategories;
