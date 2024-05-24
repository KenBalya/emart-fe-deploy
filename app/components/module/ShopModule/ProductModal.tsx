'use client'
import React, { useState } from 'react';
import { Button } from '../../elements/Button';

interface ModalProps {
    isVisible: boolean;
    onClose: () => void;
    onSubmit: (data: FormData) => void;
    supermarketId: string; // Ensure this is passed as a prop
}

const ProductModal: React.FC<ModalProps> = ({ isVisible, onClose, onSubmit, supermarketId }) => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState<number | ''>('');
    const [stock, setStock] = useState<number | ''>('');
    const [logo, setLogo] = useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!supermarketId || supermarketId === 'undefined') {
            alert('Invalid Supermarket ID');
            return;
        }
        const formData = new FormData();
        formData.append('name', productName);
        formData.append('price', price.toString());
        formData.append('stock', stock.toString());
        formData.append('supermarketId', supermarketId);
        if (logo) {
            formData.append('file', logo);
        }
        onSubmit(formData);
        onClose();
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full text-black">
                <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
                    <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">Add Product</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Product Name</label>
                        <input
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Stock</label>
                        <input
                            type="number"
                            value={stock}
                            onChange={(e) => setStock(Number(e.target.value))}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Product Image</label>
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

export default ProductModal;
