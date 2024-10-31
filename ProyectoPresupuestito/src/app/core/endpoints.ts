// URL base de la API
export const API_URL = 'http://localhost:5130/api';
// export const API_URL = 'https://localhost:7114/api';


// Endpoints para diferentes recursos
export const ENDPOINTS = {
  // Clients
  clients: {
    getAll: '/Client',
    getById: '/Client/:id',
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
    post: '/Item',
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
    post: '/Supplier',
    update: '/Supplier/:id',
    delete: '/Supplier/:id',
  },
  // Supplier History
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
    post: '/Invoices',
    update: '/Invoices/:id',
    delete: '/Invoices/:id',
  },
  //InvoiceItems
  invoiceItem: {
    getAll: '/Item',
    getById: '/Item/:id',
    post: '/Item',
    update: '/Item/:id',
    delete: '/Item/:id',
  },
  //Employees
  employees: {
    getAll: '/Employee',
    getById: '/Employee/:id',
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
    post: '/Salary/:employeeId',
    update: '/Salary/:id',
    delete: '/Salary/:id',
  },
  // FixedCost
  fixedCost: {
    getAll: '/FixedCost',
    getById: '/FixedCost/:id',
    post: '/FixedCost',
    update: '/FixedCost/:id',
    delete: '/FixedCost/:id',
  },
  //Payments
  payments: {
    getAll: '/payments',
    getById: '/payments/:id',
    postInvoicePayment: '/payments/invoce/:idInvoice',
    postBudgetPayment: '/payments/budget/:idBudget',
    postSalaryPayment: '/payments/invoce/:idSalary',
    update: '/payments/:id',
    delete: '/payments/:id',
  },
};
