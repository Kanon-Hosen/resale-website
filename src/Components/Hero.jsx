import React from 'react';

const Hero = () => {
    return (
<div className="hero min-h-screen bg-blue-100 md:px-16 px-8">
  <div className="flex items-center justify-between flex-col lg:flex-row-reverse mt-8 md:mt-0 gap-5 md:gap-0">
          <div className='w-full md:w-1/2 backdrop-blur-lg '>
          <img src="https://i.ibb.co/KG2LPVR/Png-Item-459490.png" className="rounded-lg object-cover w-full md:scale-125 drop-shadow-2xl shadow-blue-700 " alt=""/>
      </div>
    <div className='md:w-1/2 w-full'>
      <h1 className="lg:text-5xl text-4xl font-bold capitalize leading-snug">Perfect way to <span className='leading-relaxed text-blue-500 drop-shadow stroke-blue-900'> buy</span> <br/> and <span className='text-blue-500 drop-shadow stroke-blue-900'>sell</span> car on our<br/> <span className='leading-relaxed'>Platform</span></h1>
      <p className="md:py-6 py-3 text-gray-500">We will help you buy or sell your dream car here easily and quickly <br/>that is reliable</p>
      <button className=" px-6 py-3 rounded-sm border-none font-semibold text-gray-50 btn-primary shadow-md" >Buy Car</button>
      <button className=" px-6 py-3 rounded-sm font-semibold bg-white shadow-md border-none text-primary ml-5">Sell Car</button>
    </div>
  </div>
</div>
    );
};

export default Hero;