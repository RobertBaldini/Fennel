import { RecipeReference } from './recipe-reference';

export interface SearchResults {
    query: string;
    results: RecipeReference[];
}
