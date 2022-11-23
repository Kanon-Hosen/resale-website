import React from 'react';
import {useQuery } from '@tanstack/react-query'

const Category = () => {
    const { } = useQuery({
        queryKey: ["category"],
        queryFn: () => {
            
        }
    })

    return (
        <div>
            
        </div>
    );
};

export default Category;