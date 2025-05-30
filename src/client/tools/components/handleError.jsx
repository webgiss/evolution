import React from 'react';

export const handleError = (name, variables, code) => {
    if (typeof name === 'function') {
        code = name 
        name = 'a component';
        variables = {}
    } else if (typeof variables === 'function') {
        code = variables
        variables = {}
    }
    try {
        return code()
    } catch (error) {
        console.error(`Error rendering ${name}`, { error, ...variables });
        return <span>Error rendering {name}</span>;
    }
}
