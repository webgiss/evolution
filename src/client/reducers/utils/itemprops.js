import { ORGANIC, OMNIVORE, CARNIVORE, HERBIVORE } from "../../constants/itemprops";
import random from "./random";

const dnaMeanning = [
    { name: 'minAge', size: 4, min: 15 },
    { name: 'maxDeltaAge', size: 4, min: 3 },
    { name: 'speed', size: 1, min: 1 },
    { name: 'gmr', size: 1, min: 1 },
    { name: 'gmrDen', size: 6, min: 40 },
    { name: 'minReproMass', size: 1, min: 2 },
    { name: 'maxMass', size: 4, min: 8 },
    { name: 'reproRate', size: 3, min: 1 },
    { name: 'reproRateDen', size: 3, min: 1 },
    { name: 'minDejecMass', size: 3, min: 2 },
    { name: 'dejecRate', size: 1, min: 2 },
    { name: 'dejecRateDen', size: 1, min: 2 },
    { name: 'type', size: 2, min: 0 },
];

const readInt = (dna, pos, size, min) => parseInt(dna.substring(pos, pos + size).padEnd(size, '0'), 2) + min;
// const readIntX = (dna, pos, size, min) => { let value=readInt(dna, pos, size, min); console.log([dna, pos, size, min], value); return value; }
const createDnaStruct = (dna) => ({ 
    dna,
    pos: 0,
});
const dnaReadGene = (dnaStruct, size, min) => {
    let value = readInt(dnaStruct.dna, dnaStruct.pos, size, min);
    dnaStruct.pos += size;
    return value;
}
const dnaRead = (dna, dnaMeanning) => {
    const dnaStruct = createDnaStruct(dna);
    return dnaMeanning
        .map(dnaGene => [dnaGene.name, dnaReadGene(dnaStruct, dnaGene.size, dnaGene.min)])
        .reduce((acc, elem) => { acc[elem[0]] = elem[1]; return acc; }, {})
        ;
}
export const getDnaSize = () => dnaMeanning.map(dnaGene => dnaGene.size).reduce((acc, elem) => acc + elem);

export const describeProps = () => {
    return dnaMeanning
        .map(dnaGene => [
            dnaGene.name,
            readInt(''.padStart(dnaGene.size, '0'), 0, dnaGene.size, dnaGene.min),
            readInt(''.padStart(dnaGene.size, '1'), 0, dnaGene.size, dnaGene.min)
        ])
        .map(([name, min, max]) => `${min} <= ${name} <= ${max}`)
        .reduce((acc, elem) => acc + "\n" + elem)
        + "\ndna size: " + getDnaSize();
    ;
};

export const extractProps = (item) => {
    let { alive, dna } = item;
    dna = dna || '';
    let props = dnaRead(dna, dnaMeanning); 
    if (dna === '' && item.type !== undefined) {
        props.type = item.type;
    }
    alive = alive === undefined ? props.type !== ORGANIC : alive;
    if (alive) {
        return props;
    } else {
        return { type: ORGANIC };
    }
};

export const generateDna = (props) => {
    let alive = props.alive === undefined ? props.type !== ORGANIC : props.alive;
    if (alive) {
        return dnaMeanning
            .map(dnaGene => (
                ((props[dnaGene.name] !== undefined && props[dnaGene.name] > dnaGene.min) ? props[dnaGene.name] - dnaGene.min : 0)
                    .toString(2)
                    .padStart(dnaGene.size, '0')
                    .substring(0, dnaGene.size)
            ))
            .reduce((acc, elem) => acc + elem)
            ;
    } else {
        return '';
    }
}

export const mutate = (dnaValues, dna) => {
    let dnabits = dna.split('');
    let { type, gmrDen, gmr } = dnaValues;
    if (! gmrDen) {
        gmrDen
    }
    return dnabits.map(bit => (random(gmrDen) < gmr) ? (random(2) ? '1' : '0') : bit).join('');
}

window.mutate = mutate;
window.generateDna = generateDna;

