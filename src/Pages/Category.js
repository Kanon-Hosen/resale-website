import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import { useParams } from 'react-router';
import Sppiner from '../Components/Sppiner';

const Category = () => {
    const { name } = useParams();
    const {data:carCta, isFetching } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/category/${name}`);
            const data = res.json();
            return data;
        }
    })
    console.log("🚀 ~ file: Category.js ~ line 15 ~ Category ~ carCta", carCta)
    if (isFetching) {
        return <Sppiner></Sppiner>
    }
    if (!carCta?.length) {
        return <div className='w-full h-screen flex items-center justify-center text-4xl font-semibold text-slate-800'>No Item Available</div>
    }
    return (
        <div className='px-16 my-6 h-screen'>
            <h1 className='text-3xl font-semibold text-slate-800'>{name}</h1>
            <div className='grid grid-cols-3 mt-8'>
                {
                    carCta.map(car => <div className='shadow-md shadow-blue-100 rounded-md backdrop-blur-lg p-3'>
                        <div className='w-full relative'>
                            <img className='w-full h-64 bg-center bg-cover' src={car.image} alt="" />
                        </div>
                        <div>
                            <div className='flex items-center gap-3 my-3'>
                                <img className='w-10 h-10 rounded-full' src={car.userImg} alt="" />
                                <div className='flex items-center gap-1'>
                                    <p className='font-semibold'>{car.name}</p>
                                    <BsFillPatchCheckFill title="Verifyed Seller" className="text-blue-500 font-bold text-base"></BsFillPatchCheckFill>
                                </div>
                                
                            </div>
                            <p className='text-blue-500 text-sm font-semibold'>{car.category}</p>

                            <p className='font-semibold text-xl'>{car.carName}</p>
  
                            <p className='text-xs'><span className='font-semibold'>Location:</span> {car.location}</p>
                            <p className='text-blue-500 font-semibold mt-1'> $<span className='line-through text-blue-600'>{car.price}</span> - ${car.reSellPrice}</p>
                            <p className='text-sm'><span className='font-semibold'>Condition:</span> {car.condition}</p>
                            <p className='text-sm'><span className='font-semibold'>Purchase year: </span>{car.year}</p>
                        </div>
                        <button className='absolute bottom-4 right-4 px-5 py-3 bg-blue-400 shadow-lg text-white font-semibold shadow-blue-500 rounded-tr-3xl rounded-bl-3xl'>Buy Now</button>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Category;