'use client'

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSellingDishesStore } from '@/lib/store/selling-dishes';

const SellingDishesList = () => {
    const { sellingsDishes, fetchSellingsDishes, deleteSellingDishes } = useSellingDishesStore();

    useEffect(() => {
        fetchSellingsDishes();
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm("Вы действительно хотите удалить эту продажу?")) {
            await deleteSellingDishes(id);
        }
    };

    return (
        <div>
            <h1>Список продаж блюд</h1>

            <Link href="/operations/selling-dishes/new">
                <b>Создать новую продажу блюд</b>
            </Link>

            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Номер</th>
                    <th>Дата</th>
                    <th>Статус</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {sellingsDishes.map(doc => (
                    <tr key={doc.id}>
                        <td>{doc.id}</td>
                        <td>
                            <Link href={`/operations/selling-dishes/${doc.id}`}>
                                <b>{doc.number}</b>
                            </Link>
                        </td>
                        <td>{doc.date}</td>
                        <td>{doc.accepted ? "Принята" : "Не принята"}</td>
                        <td>
                            <button onClick={() => handleDelete(doc.id)}>Удалить</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    );
};

export default SellingDishesList;
