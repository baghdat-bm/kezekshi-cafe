'use client'

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useMovementDishesStore } from '@/lib/store/movement-dishes';

const MovementDishesList = () => {
    const { movementsDishes, fetchMovementsDishes, deleteMovementDishes } = useMovementDishesStore();

    useEffect(() => {
        fetchMovementsDishes();
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm("Вы действительно хотите удалить это перемещение?")) {
            await deleteMovementDishes(id);
        }
    };

    return (
        <div>
            <h1>Список перемещений на склады</h1>

            <Link href="/operations/movement-dishes/new">
                <b>Создать новое перемещение на склад</b>
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
                {movementsDishes.map(write_off => (
                    <tr key={write_off.id}>
                        <td>{write_off.id}</td>
                        <td>
                            <Link href={`/operations/movement-dishes/${write_off.id}`}>
                                <b>{write_off.number}</b>
                            </Link>
                        </td>
                        <td>{write_off.date}</td>
                        <td>{write_off.accepted ? "Принята" : "Не принята"}</td>
                        <td>
                            <button onClick={() => handleDelete(write_off.id)}>Удалить</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    );
};

export default MovementDishesList;
