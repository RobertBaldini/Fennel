export interface Measures {
    us: Us;
    metric: Metric;
}

export interface Us {
    amount: number;
    unitShort: string;
    unitLong: string;
}

export interface Metric {
    amount: number;
    unitShort: string;
    unitLong: string;
}