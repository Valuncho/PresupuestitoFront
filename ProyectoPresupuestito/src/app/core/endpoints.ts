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
    //work
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
    invoice: {
        getAll: '/invoice',
        getById: '/invoice/:id',
        post: '/invoice',
        update: '/invoice/:id',
        delete: '/invoice/:id',
    },
    fixedCost: {
        getAll: '/fixedCost',
        getById: '/fixedCost/:id',
        post: '/fixedCost',
        update: '/fixedCost/:id',
        delete: '/fixedCost/:id',
    }

};