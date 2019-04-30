import { Measures } from './measures';

export interface ExtendedIngredient {
    id: number;
    aisle: string;
    image: string;
    consitency: string;
    name: string;
    original: string;
    originalString: string;
    originalName: string;
    amount: number;
    unit: string;
    meta: string[];
    metaInformation: string[];
    measures: Measures;
}