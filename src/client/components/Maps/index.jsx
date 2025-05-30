import React from 'react'
import createComponent from '@/tools/components/createComponent';
import './Maps.css'

export default createComponent(({ children }) => {
    return (
        <div className='Maps'>
            {children}
        </div>
    )
})
