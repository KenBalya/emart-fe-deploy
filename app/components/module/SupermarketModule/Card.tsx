'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '../../elements/Button'
import Link from 'next/link'
import ReactLoading from 'react-loading'
import { toast } from 'react-toastify'
import { useAuth } from '../../context/AuthContext'

type SupermarketInterface = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  pengelola: number;
  rating: number;
}

const Card = () => {
  const [data, setData] = useState<SupermarketInterface[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const { token, user } = useAuth();
  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch('http://localhost:8081/supermarket', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          }
        })
        const result = await response.json()
        if (result.success) {
          setData(result.data)
        } else {
          console.error('Failed to fetch data:', result.message)
        }
      } catch (error) {
        console.error('Error fetching supermarket data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this supermarket?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8081/supermarket/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        }
      });

      const result = await response.json();

      if (response.ok) {
        setData(data.filter(supermarket => supermarket.id !== id));
        toast.success('Successfully deleted supermarket');
      } else {
        toast.error(`Failed to delete supermarket: ${result.message}`);
      }
    } catch (error) {
      console.error('Error deleting supermarket:', error);
      toast.error('Error deleting supermarket');
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-[50vh] flex justify-center items-center">
        <ReactLoading
          type={'spin'}
          color={'#ffffff'}
          height={100}
          width={100}
        />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 sm:container z-10 w-full gap-2 sm:gap-5">
      {data.map((supermarket) => (
        <div
          key={supermarket.id}
          className="bg-white rounded-xl p-3 justify-center w-full"
        >
          <div className="w-full aspect-[130/57] rounded-lg overflow-hidden sm:rounded-3xl relative">
            <Image
              src={supermarket.imageUrl}
              layout="fill"
              objectFit="contain"
              objectPosition="center"
              alt="logo supermarket"
            />
          </div>
          <h5 className="font-Balsamiq_Sans text-[#D73E45] font-bold text-xs md:text-lg mt-2">
            {supermarket.name}
          </h5>
          <div className="flex justify-start md:flex-row w-full gap-y-1 md:gap-x-2 mt-3">
            <Link href={`/shop/${supermarket.id}`} className="w-full">
              <Button
                btnType="primary"
                className="rounded-lg text-xs sm:text-sm h-8 sm:h-10 md:h-12 py-3 w-full"
                callToAction={true}
              >
                Go To Store
              </Button>
            </Link>
          </div>
          <div className="flex justify-between w-full mt-2">
            <div className="flex gap-x-2">
              {user && user.role == "ADMIN" && (
                <button
                  onClick={() => handleDelete(supermarket.id)}
                  className="bg-red-500 text-white font-bold rounded hover:bg-red-700 md:py-2 md:px-4 md:text-base px-2 text-[10px] h-8 md:h-12"
                >
                  Delete
                </button>
              )}

            </div>
            <div className="font-Balsamiq_Sans flex justify-end text-black text-xs md:text-sm mt-5 font-bold">
              <div className="flex items-center gap-x-1">
                <span>{supermarket.rating.toFixed(1)}</span>
                <Image
                  src="/star.svg"
                  width={13}
                  height={14}
                  alt="rating"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Card
