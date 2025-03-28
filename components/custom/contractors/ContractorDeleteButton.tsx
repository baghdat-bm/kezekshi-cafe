'use client';

import React from 'react';
import {CircleX} from "lucide-react";

interface ContractorDeleteButtonProps {
    id: number;
    onDelete: (id: number) => void;
}

const ContractorDeleteButton: React.FC<ContractorDeleteButtonProps> = ({ id, onDelete }) => {
    const handleDelete = async () => {
        if (confirm('Вы уверены, что хотите удалить этого поставщика?')) {
            await onDelete(id);
        }
    };

    return <button onClick={handleDelete}>
        <CircleX size={18} className="text-red-500"/>
    </button>;
};

export default ContractorDeleteButton;
