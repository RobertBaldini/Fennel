export interface Step {
    number: number;
    step: string;
    ingredients: Ingredient[];
    equipment: Equipment[];
    length: Length;
}

export interface Ingredient {
    id: number;
    name: string;
    image: string;
}

export interface Equipment {
    id: number;
    name: string;
    image: string;
    temperature: Temperature;
}

export interface Temperature {
    number: number;
    unit: string;
}

export interface Length {
    number: number;
    unit: string;
}