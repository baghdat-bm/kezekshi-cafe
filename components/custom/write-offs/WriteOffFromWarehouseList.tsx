// components/SellingDishesList.tsx
'use client'

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useWriteOffFromWarehouseStore } from '@/lib/store/write-off-from-warehouses';

const WriteOffFromWarehouseList = () => {
    const { writeOffFromWarehouses, fetchWriteOffFromWarehouses, deleteWriteOffFromWarehouse } = useWriteOffFromWarehouseStore();

    useEffect(() => {
        fetchWriteOffFromWarehouses();
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm("Вы действительно хотите удалить это списание?")) {
            await deleteWriteOffFromWarehouse(id);
        }
    };

    return (
        <div>
            <h1>Список списаний со склада</h1>

            <Link href="/operations/write-offs/new">
                <b>Создать новое списание со склада</b>
            </Link>

            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Номер накладной</th>
                    <th>Дата</th>
                    <th>Статус</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {writeOffFromWarehouses.map(write_off => (
                    <tr key={write_off.id}>
                        <td>{write_off.id}</td>
                        <td>
                            <Link href={`/operations/write-offs/${write_off.id}`}>
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

export default WriteOffFromWarehouseList;
