import { SubCategoryMaterial } from "./SubCategoryMaterial";

export interface Material
{
    materialId : number;
    materialName : string;
    materialDescription : string;
    materialColor : string;
    materialBrand : string;
    materialMeasure : string;
    materialUnitMeasure : string;
    subCategoryMaterialId : SubCategoryMaterial;
}