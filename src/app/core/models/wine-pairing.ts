import { ProductMatch } from './product-match';

export interface WinePairing {
    pairedWines: string[];
    pairingText: string;
    productMatches: ProductMatch[];
}