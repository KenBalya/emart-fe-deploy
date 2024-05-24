"use client"
import React from 'react';
import { NextPage } from 'next';
import ShopModule from '@/app/components/module/ShopModule';
import { useParams } from 'next/navigation';

const Shop: NextPage = () => {
    const { id } = useParams();
  
    if (!id) {
        return <div>Loading...</div>;
    }else{
      console.log(id)
    }
  
    return <ShopModule supermarketId={id as string} />;
};

export default Shop;
