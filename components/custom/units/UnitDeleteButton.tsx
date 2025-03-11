'use client';

import React from 'react';
import {CircleX} from "lucide-react";

interface UnitDeleteButtonProps {
    id: number;
    onDelete: (id: number) => void;
}

const UnitDeleteButton: React.FC<UnitDeleteButtonProps> = ({ id, onDelete }) => {
    const handleDelete = async () => {
        if (confirm('Вы уверены, что хотите удалить эту единицу измерения?')) {
            await onDelete(id);
        }
    };

    return <button onClick={handleDelete}>
        <CircleX size={18} className="text-red-500"/>
    </button>;
};

export default UnitDeleteButton;
