import React, { useEffect } from 'react'

function Card(props) {
    const{img1, img2, status, title} = props;

    return (
        img1 && 
        <div className='bg-gradient-to-r flex flex-col justify-center items-center gap-2 from-cyan-500 to-blue-500 px-3 py-5 text-center '>
            <img className='h-60 w-60' src={`https://ik.imagekit.io/dev24/${img2}`} />
            <h1 className='text-lg font-semibold'>{title}</h1>
            <button className={` w-full rounded-xl font-bold bg-white px-3 py-2 ${status === 'In Progress' && 'text-yellow-500'} ${status === 'Draft' && 'text-red-500'} ${(status === 'Published' || status === 'Completed') && 'text-green-500'}`}>{status}</button>
        </div>
    )
}
    

export default Card
