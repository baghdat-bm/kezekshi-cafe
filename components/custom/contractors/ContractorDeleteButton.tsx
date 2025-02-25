'use client';

import React from 'react';

interface UnitDeleteButtonProps {
    id: number;
    onDelete: (id: number) => void;
}

const ContractorDeleteButton: React.FC<UnitDeleteButtonProps> = ({ id, onDelete }) => {
    const handleDelete = async () => {
        if (confirm('Вы уверены, что хотите удалить эту единицу измерения?')) {
            await onDelete(id);
        }
    };

    return <button onClick={handleDelete}>Удалить</button>;
};

export default ContractorDeleteButton;
