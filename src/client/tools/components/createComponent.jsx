import React from 'react';
import { handleError } from './handleError';

/**
 * Create a React component from a function, like the Component constructor, but with error handling.
 * 
 * @param {function} code - The function that returns the component.
 * @returns {React.Component} The component object created
 */
const createComponent = (code) => {
    const componentName = new Error().stack.split(/[\n,]/)[1].trim().split(' ').pop().split('/').slice(-2,-1)[0]
    // console.log(`Creating component: [${componentName}]`);
    const Component = (variables) => {
        return handleError(componentName, variables, () => {
            return code(variables);
        })
    }
    Component.displayName = componentName;
    return Component;
}

export default createComponent