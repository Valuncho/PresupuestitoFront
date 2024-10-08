// URL base de la API
//export const API_URL = 'https://presupuestito.com/api/v1';
export const API_URL = 'http://localhost:5130/api';

// Endpoints para diferentes recursos
export const ENDPOINTS = {
  // Clients
  clients: {
    getAll: '/Client',
    getById: '/Client/:id',
    getByBudgetId: '/Client/:idBudget',
    post: '/Client',
    update: '/Client/:id',
    delete: '/Client/:id',
  },
  // Client Histories
  clientHistories: {
    getAll: '/ClientHistory',
    getById: '/ClientHistory/:id',    
    post: '/ClientHistory',
    update: '/ClientHistory/:id',
    delete: '/clientHistory/:id',
  },
  // Budgets
  budgets: {
    getAll: '/Budget',
    getById: '/Budget/:id',
    getPriceById: '/Budget/price/:id',
    getDeadlineById: '/Budget/deadline/:id',
    post: '/Budget',
    update: '/Budget/:id',
    delete: '/Budget/:id',
  },
  // Works
  works: {
    getAll: '/Work',
    getById: '/Work/:id',
    post: '/Work',
    update: '/Work/:id',
    delete: '/Work/:id',
  },
  //Items
    items: {
    getAll: '/Item',
    getById: '/Item/:id',
    post: '/Item/:idWork',
    update: '/Item/:id',
    delete: '/Item/:id',
    },
  //Materials
  materials: {
    getAll: '/Material',
    getById: '/Material/:id',
    post: '/Material',
    update: '/Material/:id',
    delete: '/Material/:id',
  },
  //SubCategories
  subCategories: {
    getAll: '/SubCategoryMaterial',
    getById: '/SubCategoryMaterial/:id',
    post: '/SubCategoryMaterial',
    update: '/SubCategoryMaterial/:id',
    delete: '/SubCategoryMaterial/:id',
  },
  //Categories
  categories: {
    getAll: '/Category',
    getById: '/Category/:id',
    post: '/Category',
    update: '/Category/:id',
    delete: '/Category/:id',
  },
  //Suppliers
  suppliers: {
    getAll: '/Supplier',
    getById: '/Supplier/:id',
    getByInvoiceId: '/Supplier/:idBudget',
    post: '/Supplier',
    update: '/Supplier/:id',
    delete: '/Supplier/:id',
  },
  // Client Histories
  supplierHistories: {
    getAll: '/SupplierHistory',
    getById: '/SupplierHistory/:id',    
    post: '/SupplierHistory',
    update: '/SupplierHistory/:id',
    delete: '/SupplierHistory/:id',
  },
  // Invoices
  invoices: {
    getAll: '/Invoices',
    getById: '/Invoices/:id',
    getByInvoiceId: '/Invoices/:idBudget',
    post: '/Invoices',
    update: '/Invoices/:id',
    delete: '/Invoices/:id',
  },
  //Employees
  employees: {
    getAll: '/Employee',
    getById: '/Employee/:id',
    getByInvoiceId: '/Employee/:idBudget',
    post: '/Employee',
    update: '/Employee/:id',
    delete: '/Employee/:id',
  },
  // Employee History
  employeeHistories: {
    getAll: '/EmployeeHistory',
    getById: '/EmployeeHistory/:id',    
    post: '/EmployeeHistory',
    update: '/EmployeeHistory/:id',
    delete: '/EmployeeHistory/:id',
  },
  // Salary
  salaries: {
    getAll: '/Salary',
    getById: '/Salary/:id',
    getByInvoiceId: '/Salary/:idBudget',
    post: '/Salary',
    update: '/Salary/:id',
    delete: '/Salary/:id',
  },
    // FixedCost
    fixedCost: {
      getAll: '/FixedCost',
      getById: '/FixedCost/:id',
      getByInvoiceId: '/FixedCost/:idBudget',
      post: '/FixedCost',
      update: '/FixedCost/:id',
      delete: '/FixedCost/:id',
    },

    payments: {
      getAll: '/payments',
      getById: '/payments/:id',
      getByInvoiceId: '/payments/:id',
      post: '/payments',
      update: '/payments/:id',
      delete: '/payments/:id',
    },
};
