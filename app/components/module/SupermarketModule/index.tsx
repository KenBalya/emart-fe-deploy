'use client'
import React, { useState } from 'react'
import Card from './Card'
import Image from 'next/image'
import { Button } from '../../elements/Button'
import Modal from './Modal'
import { useAuth } from '../../context/AuthContext'
import { toast } from 'react-toastify'

const SupermarketModule = () => {
  const { token, user } = useAuth();
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleSubmit = async (formData: FormData) => {
    console.log(formData)
    try {
      const response = await fetch('http://localhost:8081/supermarket', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to create supermarket');
      }

      const data = await response.json();
      console.log('Supermarket created:', data);
      toast.success("Supermarket created successfully");

    } catch (error) {
      console.error('Error:', error);
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
          className=""
        />
        <div className="pt-3 flex px-1 sm:px-2 container flex-row flex-wrap">
          <Card />
        </div>
        {user && user.role=="ADMIN" && (
          <Button
          btnType="primary"
          className="mt-10 rounded-lg text-xs sm:text-sm h-8 sm:h-10 md:h-12 py-3 w-full sm:w-auto"
          callToAction={true}
          onClick={openModal}
        >
          Add Supermarket
        </Button>

        )}
      </div>
      <Modal isVisible={isModalVisible} onClose={closeModal} onSubmit={handleSubmit} />
    </section>
  );
}

export default SupermarketModule;
