import random from './random';

test('random to be between bounds', ()=>{
    let result = [...Array(1000).keys()].map(k=>random(122)).map(v => v>=0 && v<122);
    expect(result.reduce((acc,elem)=>acc && elem)).toEqual(true);
})