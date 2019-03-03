import { extractProps, describeProps, generateDna } from './itemprops';

console.log(describeProps());

const exampleDna = '100110011001110000101101011011110011010111001101';
const exampleProps = {minAge: 14, maxDeltaAge: 5, speed: 3, gmr: 5, gmrDen: 29, maxMass:14, minReproMass: 3, reproRate: 6, reproRateDen: 8, type: 3};

describe('itemprops', ()=>{
    describe('extractProps', ()=>{
        test('example', ()=>{
            let props = extractProps({dna: exampleDna, alive: true});
            expect(props).toEqual(exampleProps);
        });
    });
    describe('generateDna', () => {
        test('reverse example', ()=>{
            let dna = generateDna(exampleProps);
            expect(dna).toEqual(exampleDna.substring(0, dna.length));
        });
    });
});
