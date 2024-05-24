'use client'
import React, { useState, useEffect } from 'react';
import { Button } from '../../elements/Button';

interface ModalProps {
    isVisible: boolean;
    onClose: () => void;
    onSubmit: (data: FormData) => void;
}

interface Manager {
    id: number;
    username: string;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, onSubmit }) => {
    const [supermarketName, setSupermarketName] = useState('');
    const [description, setDescription] = useState('');
    const [admin, setAdmin] = useState('');
    const [logo, setLogo] = useState<File | null>(null);
    const [managers, setManagers] = useState<Manager[]>([]);

    useEffect(() => {
        if (isVisible) {
            fetch('http://localhost:8080/api/users/managers', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data && data.managers) {
                        setManagers(data.managers);
                    }
                })
                .catch(error => console.error('Error fetching managers:', error));
        }
    }, [isVisible]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', supermarketName);
        formData.append('description', description);
        formData.append('pengelola', admin);
        if (logo) {
            formData.append('file', logo);
        }
        console.log("Form is submitted:" + formData)
        onSubmit(formData);
        onClose();
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full text-black">
                <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
                    <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">Add Supermarket</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Supermarket Name</label>
                        <input
                            type="text"
                            value={supermarketName}
                            onChange={(e) => setSupermarketName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Admin</label>
                        <select
                            value={admin}
                            onChange={(e) => setAdmin(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        >
                            <option value="" disabled>Select an admin</option>
                            {managers.map(manager => (
                                <option key={manager.id} value={manager.id}>{manager.username}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Supermarket Logo</label>
                        <input
                            type="file"
                            onChange={(e) => setLogo(e.target.files ? e.target.files[0] : null)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <Button 
                        btnType="primary" 
                        callToAction={false} 
                        className="w-full" 
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </form>
                <div className="my-5 sm:my-6 mx-7">
                    <button
                        type="button"
                        className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
