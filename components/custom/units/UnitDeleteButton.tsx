'use client';

import React from 'react';
import {CircleX} from "lucide-react";
import useTranslationStore from "@/lib/store/useTranslationStore";

interface UnitDeleteButtonProps {
    id: number;
    onDelete: (id: number) => void;
}

const UnitDeleteButton: React.FC<UnitDeleteButtonProps> = ({ id, onDelete }) => {
    const { t } = useTranslationStore();
    const handleDelete = async () => {
        if (confirm(t("refs.confirmDeleteUnit"))) {
            await onDelete(id);
        }
    };

    return <button onClick={handleDelete}>
        <CircleX size={18} className="text-red-500"/>
    </button>;
};

export default UnitDeleteButton;
