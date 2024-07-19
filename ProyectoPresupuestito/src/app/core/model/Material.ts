import { SubCategoryMaterial } from "./SubCategoryMaterial";

export interface Material
{
    idMaterial : number;
    name : string;
    description : string;
    color : string;
    brand : string;
    measure : string;
    unitOfMeasure : string;
    subCategory : SubCategoryMaterial;
}