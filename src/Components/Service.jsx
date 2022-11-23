import React from 'react';
import {AiOutlineLike} from 'react-icons/ai'
import {MdPayment} from 'react-icons/md'
import {TbChartDots} from 'react-icons/tb'
const Service = () => {
    return (
        <div className='my-16 px-16'>
            <h1 className='text-4xl capitalize font-bold text-center'>What our serve for you</h1>
            <p className='text-center my-4 text-gray-500'>We provide many of the best services for you and you will get the<br />  best benefits here</p>
            <div className='mt-8 grid grid-cols-3 gap-8'>
                <div className='shadow px-4 py-6 hover:bg-blue-50 transition-colors'>
                    <div className='text-blue-500'>
                    <AiOutlineLike className='text-5xl '></AiOutlineLike>

                    </div>
                    <div className='mt-4'>
                        <h4 className='font-semibold text-xl text-slate-800 my-2 capitalize'>top buy & sell car</h4>
                        <p>Buy and sell most trusted car, we provide the best platfrom for you and easy to use</p>
                    </div>
                </div>
                <div className='shadow px-4 py-6 hover:bg-blue-50 transition-colors'>
                    <div className='text-blue-500'>
                    <MdPayment className='text-5xl '></MdPayment>

                    </div>
                    <div className='mt-4'>
                        <h4 className='font-semibold text-xl text-slate-800 my-2 capitalize'>top buy & sell car</h4>
                        <p>Buy and sell most trusted car, we provide the best platfrom for you and easy to use</p>
                    </div>
                </div>
                <div className='shadow px-4 py-6 hover:bg-blue-50 transition-colors'>
                    <div className='text-blue-500'>
                    <TbChartDots className='text-5xl '></TbChartDots>

                    </div>
                    <div className='mt-4'>
                        <h4 className='font-semibold text-xl text-slate-800 my-2 capitalize'>top buy & sell car</h4>
                        <p>Buy and sell most trusted car, we provide the best platfrom for you and easy to use</p>
                    </div>
                </div>
               
            </div>
        </div>
    );
};

export default Service;