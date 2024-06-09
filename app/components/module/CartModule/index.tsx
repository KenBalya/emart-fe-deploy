'use client'
import React, { useEffect, useState } from 'react';
import { Button } from '../../elements/Button';
import { FiTrash } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify'; // Assuming you have react-toastify installed for toast notifications

type CartItem = {
  productId: string;
  productName: string;
  price: number;
  amount: number;
};

const CartModule: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, token } = useAuth(); // Assuming useAuth provides user and token

  useEffect(() => {
    const fetchProductDetails = async (productId: string) => {
      try {
        const response = await fetch(`http://localhost:8081/product/findById/${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const productData = await response.json();
        return {
          productName: productData.name,
          price: productData.price,
        };
      } catch (error: any) {
        throw new Error(error.message);
      }
    };

    const fetchCartItems = async () => {
      try {
        const response = await fetch(`http://localhost:8082/shopping-cart/${user?.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch cart items');
        }
        const cartData = await response.json();
        
        const itemsWithDetails = await Promise.all(
          cartData.items.map(async (item: any) => {
            const productDetails = await fetchProductDetails(item.productId);
            return {
              ...item,
              productName: productDetails.productName,
              price: productDetails.price,
            };
          })
        );

        setCartItems(itemsWithDetails);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchCartItems();
    }
  }, [user?.id]);

  const handleRemoveItem = async (productId: string) => {
    try {
      const response = await fetch(`http://localhost:8082/shopping-cart/remove-item?productId=${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      });

      if (!response.ok) {
        throw new Error('Failed to remove item from cart');
      }

      const updatedCart = await response.json();
      setCartItems(updatedCart.items);
      toast.success('Successfully removed item');
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="relative overflow-x-auto py-20">
      <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 text-center">
              Product name
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Price
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Amount
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.productId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                {item.productName}
              </th>
              <td className="px-6 py-4 text-center">
                Rp {item.price}
              </td>
              <td className="px-6 py-3 text-center">
                {item.amount}
              </td>
              <td className="px-6 py-4 text-center">
                <button 
                  className='text-white'
                  onClick={() => handleRemoveItem(item.productId)}
                >
                  <FiTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center items-center w-full py-7">
        <Button callToAction={true} btnType={'secondary'}>
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartModule;
