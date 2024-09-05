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
    //suppliers
    supplier: {
        getAll: '/supplier/',
        getById: '/supplier/:id',
        post: '/supplier/',
        update: '/supplier/:id',
        delete: '/supplier/:id',
    },
    //employee
    employee: {
        getAll: '/employee/',
        getById: '/employee/:id',
        post: '/employee/',
        update: '/employee/:id',
        delete: '/employee/:id',
    },

};