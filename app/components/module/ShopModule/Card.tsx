'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { toast } from 'react-toastify';

type Product = {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    stock: number;
};

interface CardProps {
    supermarketId: string;
}

const Card: React.FC<CardProps> = ({ supermarketId }) => {
    const [data, setData] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8081/product/supermarket/${supermarketId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const products: Product[] = await response.json();
                setData(products);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (supermarketId) {
            fetchData();
        }
    }, [supermarketId]);



    const addToCart = async (productId: string, supermarketId: string) => {
        try {
            const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
            if (!token) {
                throw new Error('User not authenticated');
            }

            const response = await fetch(`http://localhost:8082/shopping-cart/add-item?productId=${productId}&supermarketId=${supermarketId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to add item to cart');
            }

            const result = await response.json();
            toast.success('Item added to cart successfully');
            console.log('Item added to cart:', result);
        } catch (error: any) {
            toast.error(`Error adding item to cart: ${error.message}`);
            console.error('Error adding item to cart:', error);
        }
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 sm:container z-10 w-full gap-2 sm:gap-5">
            {data.map((item, index) => (
                <div
                    key={index}
                    className="bg-white rounded-xl p-3 justify-center w-full flex flex-col gap-2"
                >
                    <div className="w-full aspect-[130/57] rounded-lg overflow-hidden sm:rounded-3xl relative">
                        <Image
                            src={item.imageUrl}
                            layout="fill"
                            objectFit="contain"
                            objectPosition="center"
                            alt="logo produk"
                        />
                    </div>
                    <div className='flex justify-between'>
                        <h5 className="font-Balsamiq_Sans text-[#D73E45] font-bold text-xs md:text-lg mt-2">
                            {item.name}
                        </h5>
                        <div className="font-Balsamiq_Sans flex justify-end text-[#21BF73] text-xs md:text-[14px] mt-2 font-bold">
                            <div className="flex items-center gap-x-1">
                                <span>
                                    Rp {item.price}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between space-x-5'>

                        <button className="rounded-lg text-xs sm:text-sm h-8 md:h-10 py-1 w-full bg-[#21BF73] basis-1/2 md:basis-3/4" onClick={() => addToCart(item.id, supermarketId)}>
                            Add To Cart
                        </button>

                        <div className='flex items-end justify-end gap-2 basis-1/2 md:basis-1/4 text-black text-xs sm:text-sm '>
                            Stok: {item.stock}
                        </div>

                    </div>

                </div>
            ))}
        </div>
    )
}

export default Card
