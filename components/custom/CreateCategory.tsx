import React, { useState } from 'react';
import { useDishCategoryStore } from '@/lib/store';

const CreateCategory = () => {
    const { addCategory } = useDishCategoryStore();
    const [name, setName] = useState('');
    const [logo, setLogo] = useState('');
    const [color, setColor] = useState('#000000');
    const [measurementUnit, setMeasurementUnit] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newCategory = {
            name,
            logo: logo.trim() !== '' ? logo : null,
            color,
            measurement_unit: measurementUnit.trim() !== '' ? Number(measurementUnit) : null,
        };

        try {
            await addCategory(newCategory);
            alert('Категория успешно добавлена!');
            setName('');
            setLogo('');
            setColor('#000000');
            setMeasurementUnit('');
        } catch (error) {
            console.error('Ошибка при создании категории:', error);
        }
    };

    return (
        <div>
            <h1>Добавить новую категорию</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Название: </label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Логотип (URL): </label>
                    <input type="text" value={logo} onChange={(e) => setLogo(e.target.value)} />
                </div>
                <div>
                    <label>Цвет: </label>
                    <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
                </div>
                <div>
                    <label>Единица измерения: </label>
                    <input
                        type="number"
                        value={measurementUnit}
                        onChange={(e) => setMeasurementUnit(e.target.value)}
                    />
                </div>
                <button type="submit">Добавить категорию</button>
            </form>
        </div>
    );
};

export default CreateCategory;
