'use client'
import React from 'react'
import { NextPage } from 'next'
import CartModule from '../../components/module/CartModule'
import { useParams } from 'next/navigation';
const Cart: NextPage = () => {
    const { id } = useParams();
  
    if (!id) {
        return <div>Loading...</div>;
    }else{
      console.log(id)
    }
    
    <CartModule pembeliId={id as string} />
}
export default Cart