import React from 'react';

const Hero = () => {
    return (
<div className="hero min-h-screen bg-blue-50 px-16">
  <div className="flex items-center justify-between flex-col lg:flex-row-reverse">
          <div className='w-1/2'>
          <img src="https://files.oyebesmartest.com/uploads/preview/-115695679034nmay5npux.png" className="rounded-lg object-cover" />
      </div>
    <div className='w-1/2'>
      <h1 className="text-5xl font-bold capitalize leading-snug	">Perfect way to buy <br/> and sell car on our<br/> Platform</h1>
      <p className="py-6 text-gray-500">We will help you buy or sell your dream car here easily and quickly <br/>that is reliable</p>
      <button className=" px-6 py-3 rounded-sm border-none font-semibold text-gray-50 btn-primary shadow-md" >Buy Car</button>
      <button className=" px-6 py-3 rounded-sm font-semibold bg-white shadow-md border-none text-primary ml-5">Sell Car</button>
    </div>
  </div>
</div>
    );
};

export default Hero;