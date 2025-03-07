'use client';

import React, { useEffect } from 'react';
import { useStudentStore } from '@/lib/store/students';

const StudentList = () => {
    const { students, fetchStudents } = useStudentStore();

    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);

    return (
        <div>
            <h1>Список учащихся</h1>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>ФИО</th>
                </tr>
                </thead>
                <tbody>
                {students.map((student) => (
                    <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.full_name || 'Без ФИО'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentList;
