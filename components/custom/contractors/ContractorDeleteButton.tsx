'use client';

import React from 'react';

interface ContractorDeleteButtonProps {
    id: number;
    onDelete: (id: number) => void;
}

const ContractorDeleteButton: React.FC<ContractorDeleteButtonProps> = ({ id, onDelete }) => {
    const handleDelete = async () => {
        if (confirm('Вы уверены, что хотите удалить этого контрагента?')) {
            await onDelete(id);
        }
    };

    return <button onClick={handleDelete}>Удалить</button>;
};

export default ContractorDeleteButton;
