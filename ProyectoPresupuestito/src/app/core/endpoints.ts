// URL base de la API
export const API_URL = 'https://presupuestito.com/api/v1';

// Endpoints para diferentes recursos
export const ENDPOINTS = {
  // Clients
  clients: {
    getAll: '/clients',
    getById: '/clients/:id',
    getByBudgetId: '/clients/:idBudget',
    post: '/clients',
    update: '/clients/:id',
    delete: '/clients/:id',
  },
  // Client Histories
  clientHistories: {
    getAll: '/clientHistories',
    getById: '/clientHistorie/:id',    
    post: '/clientHistory',
    update: '/clientHistory/:id',
    delete: '/clientHistory/:id',
  },
  // Budgets
  budgets: {
    getAll: '/budgets',
    getById: '/budgets/:id',
    getPriceById: '/budgets/price/:id',
    getDeadlineById: '/budgets/deadline/:id',
    post: '/budgets',
    update: '/budgets/:id',
    delete: '/budgets/:id',
  },
  // Works
  works: {
    getAll: '/works',
    getById: '/works/:id',
    post: '/works',
    update: '/works/:id',
    delete: '/works/:id',
  },
  //Materials
  materials: {
    getAll: '/materials',
    getById: '/materials/:id',
    post: '/materials',
    update: '/materials/:id',
    delete: '/materials/:id',
  },
  //SubCategories
  subCategories: {
    getAll: '/subCategories',
    getById: '/subCategories/:id',
    post: '/subCategories',
    update: '/subCategories/:id',
    delete: '/subCategories/:id',
  },
  //Categories
  categories: {
    getAll: '/categories',
    getById: '/categories/:id',
    post: '/categories',
    update: '/categories/:id',
    delete: '/categories/:id',
  },
};