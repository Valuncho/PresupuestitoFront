import { Injectable } from '@angular/core';
import { Category } from '../model/Category';
import { SubCategoryMaterial } from '../model/SubCategoryMaterial';
import { Material } from '../model/Material';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  private categories : Category[]=[
    {
      idCategory: 1,
      name: 'Ferretería',
    },
    {
      idCategory: 2,
      name: 'Maderas'
    },
    {
      idCategory: 3,
      name: 'Adhesivos'
    },
    {
      idCategory: 4,
      name: 'Pinturería'
    }
  ]

  private subCategories : SubCategoryMaterial[] = [
    {
      idCategoryMaterial: 1,
      name: 'Tornillos',
      category: this.categories[0]
    },
    {
      idCategoryMaterial: 2,
      name: 'Tuercas',
      category: this.categories[0]
    },
    {
      idCategoryMaterial: 3,
      name: 'Bisagras',
      category: this.categories[0]
    },
    {
      idCategoryMaterial: 4,
      name: 'Clavos',
      category: this.categories[0]
    },
    {
      idCategoryMaterial: 5,
      name: 'Manijas',
      category: this.categories[0]
    },
    {
      idCategoryMaterial: 6,
      name: 'Tableros de melamina',
      category: this.categories[1]
    },
    {
      idCategoryMaterial: 7,
      name: 'Madera maciza',
      category: this.categories[1]
    },
    {
      idCategoryMaterial: 8,
      name: 'Madera contrachapada',
      category: this.categories[1]
    },

  ]

  private materials : Material[] = [
    {
      idMaterial: 1,
      name: 'Bisagra de cazoleta estándar',
      description: 'Bisagra oculta para muebles de cocina',
      color: 'Plateado',
      brand: 'Hafele',
      measure: '35mm',
      unitOfMeasure: 'Unidad',
      subCategory : this.subCategories[2]
    },
    {
      idMaterial: 2,
      name: 'Bisagra de piano estándar',
      description: 'Bisagra visible para puertas',
      color: 'Plateado',
      brand: 'Stanley',
      measure: '100mm',
      unitOfMeasure: 'Par',
      subCategory : this.subCategories[2]
    },
    {
      idMaterial: 3,
      name: 'Bisagra de libro estándar',
      description: 'Bisagra para puertas plegables',
      color: 'Plateado',
      brand: 'Rubi',
      measure: '75mm',
      unitOfMeasure: 'Par',
      subCategory : this.subCategories[2]
    },
    {
      idMaterial: 4,
      name: 'Tornillo para madera Phillips',
      description: 'Para unir piezas de madera',
      color: 'Amarillo',
      brand: 'Simpson Strong-Tie',
      measure: '3" x 10',
      unitOfMeasure: 'Caja de 100',
      subCategory: this.subCategories[0] 
    },
    {
      idMaterial: 5,
      name: 'Tornillo para metal Allen',
      description: 'Para unir piezas metálicas',
      color: 'Negro',
      brand: 'Milwaukee',
      measure: '1/4" x 1/2"',
      unitOfMeasure: 'Paquete de 50',
      subCategory: this.subCategories[0] 
    },
    {
      idMaterial: 6,
      name: 'Tornillo autorroscante Phillips',
      description: 'Para unir metal a madera',
      color: 'Plateado',
      brand: 'Tekno',
      measure: '1/2" x 12',
      unitOfMeasure: 'Caja de 100',
      subCategory: this.subCategories[0] 

    },
    {
      idMaterial: 7,
      name: 'Perno hexagonal',
      description: 'Para fijar objetos a superficies',
      color: 'Plateado',
      brand: 'Stanley',
      measure: '1/2" x 4"',
      unitOfMeasure: 'Unidad',
      subCategory: this.subCategories[0] 
    },
    {
      idMaterial: 8,
      name: 'Pino',
      description: 'Madera blanda de color claro',
      color: 'Amarillo claro',
      brand: 'Forestal', // Marca ficticia
      measure: '2x4', // Ejemplo de medida
      unitOfMeasure: 'Metro lineal',
      subCategory: this.subCategories[6] 
    },
    {
      idMaterial: 8,
      name: 'Nogal',
      description: 'Madera blanda de color claro',
      color: 'Amarillo claro',
      brand: 'Forestal', // Marca ficticia
      measure: '2x4', // Ejemplo de medida
      unitOfMeasure: 'Metro lineal',
      subCategory: this.subCategories[6] 
    },
    {
      idMaterial: 9,
      name: 'Abedul',
      description: 'Madera blanda de color claro',
      color: 'Amarillo claro',
      brand: 'Forestal', // Marca ficticia
      measure: '2x4', // Ejemplo de medida
      unitOfMeasure: 'Metro lineal',
      subCategory: this.subCategories[6] 
    },
    {
      idMaterial: 4,
      name: 'MDF Melamínico',
      description: 'Panel aglomerado recubierto con melamina',
      color: 'Blanco',
      brand: 'Masisa', // Marca ficticia
      measure: '18mm x 1200mm x 2400mm',
      unitOfMeasure: 'Placa',
      subCategory: this.subCategories[7] 
    }
  ]

  // Función para obtener un material por su ID
  getMaterialById(id: number): Material | undefined {
    return this.materials.find(material => material.idMaterial === id);
  }

  // Función para obtener una subcategoría por su ID
  getSubCategoryById(id: number): SubCategoryMaterial | undefined {
    return this.subCategories.find(subCategory => subCategory.idCategoryMaterial === id);
  }

  // Función para obtener una categoría por su ID
  getCategoryById(id: number): Category | undefined {
    return this.categories.find(category => category.idCategory === id);
  }


  constructor() { }
}
