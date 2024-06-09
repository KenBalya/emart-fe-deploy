import React, { useState } from 'react'
import Card from './Card'
import Image from 'next/image'
import { Button } from '../../elements/Button'
import ProductModal from './ProductModal'
import { useAuth } from '../../context/AuthContext'
import { toast } from 'react-toastify'; // Assuming you have react-toastify installed for toast notifications

interface ShopModuleProps{
  supermarketId: string
}

const ShopModule: React.FC<ShopModuleProps> = ({supermarketId}) => {
  const { token, user } = useAuth();
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleSubmit = async (formData: FormData) => {
    console.log(formData)
    try {
      const response = await fetch(`http://localhost:8081/product/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create product');
      }

      const data = await response.json();
      console.log('Product created:', data);
      toast.success('Product created successfully');
      
    } catch (error: any) {
      console.error('Error:', error.message);
      toast.error('Failed to create product');
    }
  };

  return (
    <section className="min-h-screen pb-10 md:px-16 py-20 bg-[#b5ecfb]">
      <div className="flex justify-center items-center mx-2 flex-col">
        <Image
          src="/shoppingBanner.webp"
          width={400}
          height={200}
          alt="plank"
          className=" "
        />
        <div className="pt-3 flex px-1 sm:px-2 container flex-row flex-wrap">
          <Card supermarketId={supermarketId} />
        </div>
        {user && user.role === "MANAGER" && (
          <Button
            btnType="primary"
            className="mt-10 rounded-lg text-xs sm:text-sm h-8 sm:h-10 md:h-12 py-3 w-full sm:w-auto"
            callToAction={true}
            onClick={openModal}
          >
            Add Product
          </Button>
        )}
      </div>
      <ProductModal isVisible={isModalVisible} onClose={closeModal} onSubmit={handleSubmit} supermarketId={supermarketId} />
    </section>
  );
}

export default ShopModule;
