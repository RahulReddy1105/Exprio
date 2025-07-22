// Dummy API service with mock data
// Simulating API delays for realistic behavior

// Helper function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Supermarket Mock Data
const mockDashboardStats = {
  totalSales: 285000,
  totalProducts: 2156,
  lowStockItems: 47,
  expiringItems: 28,
  customers: 156,
  averageTransactionValue: 1826.92
};

const mockCategories = [
  { name: 'Fresh Vegetables', value: 89, totalValue: 45000 },
  { name: 'Fresh Fruits', value: 67, totalValue: 38000 },
  { name: 'Dairy & Eggs', value: 124, totalValue: 52000 },
  { name: 'Bakery & Breads', value: 78, totalValue: 25000 },
  { name: 'Meat & Poultry', value: 56, totalValue: 45000 },
  { name: 'Rice & Pulses', value: 145, totalValue: 35000 },
  { name: 'Cooking Oil & Ghee', value: 89, totalValue: 28000 },
  { name: 'Spices & Masalas', value: 234, totalValue: 18000 },
  { name: 'Beverages', value: 167, totalValue: 32000 },
  { name: 'Snacks & Namkeen', value: 198, totalValue: 35000 },
  { name: 'Personal Care', value: 134, totalValue: 42000 },
  { name: 'Household & Cleaning', value: 156, totalValue: 28000 },
  { name: 'Frozen Foods', value: 78, totalValue: 22000 },
  { name: 'Baby Care', value: 45, totalValue: 18000 },
  { name: 'Pet Care', value: 34, totalValue: 12000 }
];

const mockExpiringProducts = [
  {
    id: '1',
    name: 'Amul Gold Milk',
    category: 'Dairy & Eggs',
    quantity: 25,
    unit: 'liters',
    status: '1 day left',
    expiry: '2024-01-15'
  },
  {
    id: '2',
    name: 'Fresh Onions',
    category: 'Fresh Vegetables',
    quantity: 45,
    unit: 'kg',
    status: '2 days left',
    expiry: '2024-01-16'
  },
  {
    id: '3',
    name: 'Britannia Brown Bread',
    category: 'Bakery & Breads',
    quantity: 12,
    unit: 'packets',
    status: '1 day left',
    expiry: '2024-01-15'
  },
  {
    id: '4',
    name: 'Fresh Chicken',
    category: 'Meat & Poultry',
    quantity: 18,
    unit: 'kg',
    status: '3 days left',
    expiry: '2024-01-17'
  },
  {
    id: '5',
    name: 'Curd (Dahi)',
    category: 'Dairy & Eggs',
    quantity: 30,
    unit: 'packs',
    status: '2 days left',
    expiry: '2024-01-16'
  },
  {
    id: '6',
    name: 'Fresh Spinach',
    category: 'Fresh Vegetables',
    quantity: 15,
    unit: 'kg',
    status: '1 day left',
    expiry: '2024-01-15'
  },
  {
    id: '7',
    name: 'Paneer',
    category: 'Dairy & Eggs',
    quantity: 8,
    unit: 'kg',
    status: '2 days left',
    expiry: '2024-01-16'
  }
];

const mockSalesAnalysis = [
  { id: '1', date: 'Today', totalSales: 28500, customers: 156, totalProducts: 234 },
  { id: '2', date: 'Yesterday', totalSales: 31200, customers: 178, totalProducts: 267 },
  { id: '3', date: '2 days ago', totalSales: 29800, customers: 165, totalProducts: 245 },
  { id: '4', date: '3 days ago', totalSales: 27500, customers: 142, totalProducts: 198 },
  { id: '5', date: '4 days ago', totalSales: 33200, customers: 189, totalProducts: 289 },
  { id: '6', date: '5 days ago', totalSales: 28900, customers: 167, totalProducts: 256 },
  { id: '7', date: '6 days ago', totalSales: 25600, customers: 134, totalProducts: 187 }
];

const mockProducts = [
  // Fresh Vegetables
  {
    id: '1',
    name: 'Fresh Tomatoes',
    category: 'Fresh Vegetables',
    quantity: 85,
    unit: 'kg',
    price: 40,
    expiry: '2024-01-18',
    velocity: 'High',
    status: 'In Stock'
  },
  {
    id: '2',
    name: 'Fresh Onions',
    category: 'Fresh Vegetables',
    quantity: 120,
    unit: 'kg',
    price: 25,
    expiry: '2024-01-20',
    velocity: 'High',
    status: 'In Stock'
  },
  {
    id: '3',
    name: 'Fresh Potatoes',
    category: 'Fresh Vegetables',
    quantity: 95,
    unit: 'kg',
    price: 30,
    expiry: '2024-01-25',
    velocity: 'High',
    status: 'In Stock'
  },
  {
    id: '4',
    name: 'Fresh Carrots',
    category: 'Fresh Vegetables',
    quantity: 45,
    unit: 'kg',
    price: 35,
    expiry: '2024-01-19',
    velocity: 'Medium',
    status: 'In Stock'
  },
  {
    id: '5',
    name: 'Fresh Spinach',
    category: 'Fresh Vegetables',
    quantity: 25,
    unit: 'kg',
    price: 20,
    expiry: '2024-01-15',
    velocity: 'Medium',
    status: 'Low Stock'
  },
  
  // Fresh Fruits
  {
    id: '6',
    name: 'Fresh Bananas',
    category: 'Fresh Fruits',
    quantity: 75,
    unit: 'kg',
    price: 60,
    expiry: '2024-01-22',
    velocity: 'High',
    status: 'In Stock'
  },
  {
    id: '7',
    name: 'Fresh Apples',
    category: 'Fresh Fruits',
    quantity: 55,
    unit: 'kg',
    price: 180,
    expiry: '2024-01-28',
    velocity: 'Medium',
    status: 'In Stock'
  },
  {
    id: '8',
    name: 'Fresh Oranges',
    category: 'Fresh Fruits',
    quantity: 40,
    unit: 'kg',
    price: 120,
    expiry: '2024-01-24',
    velocity: 'Medium',
    status: 'In Stock'
  },
  
  // Dairy & Eggs
  {
    id: '9',
    name: 'Amul Gold Milk',
    category: 'Dairy & Eggs',
    quantity: 45,
    unit: 'liters',
    price: 65,
    expiry: '2024-01-15',
    velocity: 'High',
    status: 'Low Stock'
  },
  {
    id: '10',
    name: 'Amul Butter',
    category: 'Dairy & Eggs',
    quantity: 35,
    unit: 'packs',
    price: 55,
    expiry: '2024-02-15',
    velocity: 'Medium',
    status: 'In Stock'
  },
  {
    id: '11',
    name: 'Fresh Eggs',
    category: 'Dairy & Eggs',
    quantity: 120,
    unit: 'dozen',
    price: 90,
    expiry: '2024-01-30',
    velocity: 'High',
    status: 'In Stock'
  },
  {
    id: '12',
    name: 'Curd (Dahi)',
    category: 'Dairy & Eggs',
    quantity: 50,
    unit: 'packs',
    price: 25,
    expiry: '2024-01-16',
    velocity: 'High',
    status: 'Low Stock'
  },
  
  // Bakery & Breads
  {
    id: '13',
    name: 'Britannia Brown Bread',
    category: 'Bakery & Breads',
    quantity: 25,
    unit: 'packets',
    price: 35,
    expiry: '2024-01-15',
    velocity: 'High',
    status: 'Low Stock'
  },
  {
    id: '14',
    name: 'Britannia White Bread',
    category: 'Bakery & Breads',
    quantity: 30,
    unit: 'packets',
    price: 30,
    expiry: '2024-01-16',
    velocity: 'High',
    status: 'In Stock'
  },
  {
    id: '15',
    name: 'Cookies',
    category: 'Bakery & Breads',
    quantity: 45,
    unit: 'packets',
    price: 40,
    expiry: '2024-02-20',
    velocity: 'Medium',
    status: 'In Stock'
  },
  
  // Meat & Poultry
  {
    id: '16',
    name: 'Fresh Chicken',
    category: 'Meat & Poultry',
    quantity: 35,
    unit: 'kg',
    price: 280,
    expiry: '2024-01-17',
    velocity: 'High',
    status: 'In Stock'
  },
  {
    id: '17',
    name: 'Fresh Mutton',
    category: 'Meat & Poultry',
    quantity: 20,
    unit: 'kg',
    price: 650,
    expiry: '2024-01-18',
    velocity: 'Medium',
    status: 'In Stock'
  },
  
  // Rice & Pulses
  {
    id: '18',
    name: 'Basmati Rice',
    category: 'Rice & Pulses',
    quantity: 200,
    unit: 'kg',
    price: 120,
    expiry: 'No expiry',
    velocity: 'High',
    status: 'In Stock'
  },
  {
    id: '19',
    name: 'Toor Dal',
    category: 'Rice & Pulses',
    quantity: 150,
    unit: 'kg',
    price: 140,
    expiry: 'No expiry',
    velocity: 'Medium',
    status: 'In Stock'
  },
  {
    id: '20',
    name: 'Moong Dal',
    category: 'Rice & Pulses',
    quantity: 100,
    unit: 'kg',
    price: 160,
    expiry: 'No expiry',
    velocity: 'Medium',
    status: 'In Stock'
  },
  
  // Cooking Oil & Ghee
  {
    id: '21',
    name: 'Fortune Sunflower Oil',
    category: 'Cooking Oil & Ghee',
    quantity: 80,
    unit: 'liters',
    price: 140,
    expiry: 'No expiry',
    velocity: 'High',
    status: 'In Stock'
  },
  {
    id: '22',
    name: 'Amul Pure Ghee',
    category: 'Cooking Oil & Ghee',
    quantity: 45,
    unit: 'liters',
    price: 550,
    expiry: 'No expiry',
    velocity: 'Medium',
    status: 'In Stock'
  },
  
  // Spices & Masalas
  {
    id: '23',
    name: 'Turmeric Powder',
    category: 'Spices & Masalas',
    quantity: 60,
    unit: 'kg',
    price: 180,
    expiry: 'No expiry',
    velocity: 'Medium',
    status: 'In Stock'
  },
  {
    id: '24',
    name: 'Red Chilli Powder',
    category: 'Spices & Masalas',
    quantity: 40,
    unit: 'kg',
    price: 200,
    expiry: 'No expiry',
    velocity: 'Medium',
    status: 'In Stock'
  },
  {
    id: '25',
    name: 'Garam Masala',
    category: 'Spices & Masalas',
    quantity: 25,
    unit: 'kg',
    price: 300,
    expiry: 'No expiry',
    velocity: 'Low',
    status: 'In Stock'
  },
  
  // Beverages
  {
    id: '26',
    name: 'Coca Cola',
    category: 'Beverages',
    quantity: 200,
    unit: 'cans',
    price: 35,
    expiry: '2024-12-31',
    velocity: 'High',
    status: 'In Stock'
  },
  {
    id: '27',
    name: 'Pepsi',
    category: 'Beverages',
    quantity: 180,
    unit: 'cans',
    price: 35,
    expiry: '2024-12-31',
    velocity: 'High',
    status: 'In Stock'
  },
  {
    id: '28',
    name: 'Bisleri Water',
    category: 'Beverages',
    quantity: 150,
    unit: 'bottles',
    price: 20,
    expiry: '2024-12-31',
    velocity: 'High',
    status: 'In Stock'
  },
  
  // Snacks & Namkeen
  {
    id: '29',
    name: 'Lay\'s Chips',
    category: 'Snacks & Namkeen',
    quantity: 120,
    unit: 'packets',
    price: 20,
    expiry: '2024-06-15',
    velocity: 'High',
    status: 'In Stock'
  },
  {
    id: '30',
    name: 'Kurkure',
    category: 'Snacks & Namkeen',
    quantity: 100,
    unit: 'packets',
    price: 15,
    expiry: '2024-06-20',
    velocity: 'High',
    status: 'In Stock'
  },
  {
    id: '31',
    name: 'Haldiram\'s Mixture',
    category: 'Snacks & Namkeen',
    quantity: 80,
    unit: 'packets',
    price: 25,
    expiry: '2024-05-30',
    velocity: 'Medium',
    status: 'In Stock'
  },
  
  // Personal Care
  {
    id: '32',
    name: 'Colgate Toothpaste',
    category: 'Personal Care',
    quantity: 75,
    unit: 'tubes',
    price: 85,
    expiry: 'No expiry',
    velocity: 'Medium',
    status: 'In Stock'
  },
  {
    id: '33',
    name: 'Dove Soap',
    category: 'Personal Care',
    quantity: 90,
    unit: 'bars',
    price: 45,
    expiry: 'No expiry',
    velocity: 'Medium',
    status: 'In Stock'
  },
  {
    id: '34',
    name: 'Head & Shoulders Shampoo',
    category: 'Personal Care',
    quantity: 60,
    unit: 'bottles',
    price: 180,
    expiry: 'No expiry',
    velocity: 'Low',
    status: 'In Stock'
  },
  
  // Household & Cleaning
  {
    id: '35',
    name: 'Surf Excel Liquid',
    category: 'Household & Cleaning',
    quantity: 50,
    unit: 'bottles',
    price: 120,
    expiry: 'No expiry',
    velocity: 'Medium',
    status: 'In Stock'
  },
  {
    id: '36',
    name: 'Harpic Bathroom Cleaner',
    category: 'Household & Cleaning',
    quantity: 40,
    unit: 'bottles',
    price: 95,
    expiry: 'No expiry',
    velocity: 'Low',
    status: 'In Stock'
  },
  {
    id: '37',
    name: 'Scotch Brite Scrubber',
    category: 'Household & Cleaning',
    quantity: 70,
    unit: 'pieces',
    price: 15,
    expiry: 'No expiry',
    velocity: 'Medium',
    status: 'In Stock'
  },
  
  // Frozen Foods
  {
    id: '38',
    name: 'Frozen Peas',
    category: 'Frozen Foods',
    quantity: 45,
    unit: 'packets',
    price: 75,
    expiry: '2024-08-20',
    velocity: 'Medium',
    status: 'In Stock'
  },
  {
    id: '39',
    name: 'Frozen Corn',
    category: 'Frozen Foods',
    quantity: 35,
    unit: 'packets',
    price: 65,
    expiry: '2024-08-25',
    velocity: 'Medium',
    status: 'In Stock'
  },
  
  // Baby Care
  {
    id: '40',
    name: 'Pampers Diapers',
    category: 'Baby Care',
    quantity: 55,
    unit: 'packets',
    price: 450,
    expiry: 'No expiry',
    velocity: 'Medium',
    status: 'In Stock'
  },
  {
    id: '41',
    name: 'Johnson\'s Baby Soap',
    category: 'Baby Care',
    quantity: 40,
    unit: 'bars',
    price: 35,
    expiry: 'No expiry',
    velocity: 'Low',
    status: 'In Stock'
  },
  
  // Pet Care
  {
    id: '42',
    name: 'Pedigree Dog Food',
    category: 'Pet Care',
    quantity: 30,
    unit: 'packets',
    price: 280,
    expiry: '2024-12-31',
    velocity: 'Low',
    status: 'In Stock'
  },
  {
    id: '43',
    name: 'Whiskas Cat Food',
    category: 'Pet Care',
    quantity: 25,
    unit: 'packets',
    price: 120,
    expiry: '2024-12-31',
    velocity: 'Low',
    status: 'In Stock'
  }
];

const mockNotifications = [
  {
    id: '1',
    type: 'expiry',
    message: 'Amul Gold Milk expires in 1 day',
    product: 'Amul Gold Milk',
    severity: 'high',
    createdAt: '2024-01-14T10:30:00Z',
    read: false
  },
  {
    id: '2',
    type: 'low_stock',
    message: 'Fresh Spinach stock is running low',
    product: 'Fresh Spinach',
    severity: 'medium',
    createdAt: '2024-01-14T09:15:00Z',
    read: false
  },
  {
    id: '3',
    type: 'expiry',
    message: 'Britannia Brown Bread expires in 1 day',
    product: 'Britannia Brown Bread',
    severity: 'high',
    createdAt: '2024-01-14T08:45:00Z',
    read: false
  },
  {
    id: '4',
    type: 'low_stock',
    message: 'Curd (Dahi) stock is running low',
    product: 'Curd (Dahi)',
    severity: 'medium',
    createdAt: '2024-01-14T08:30:00Z',
    read: false
  },
  {
    id: '5',
    type: 'expiry',
    message: 'Fresh Onions expire in 2 days',
    product: 'Fresh Onions',
    severity: 'medium',
    createdAt: '2024-01-14T08:15:00Z',
    read: true
  },
  {
    id: '6',
    type: 'restock',
    message: 'Fresh Chicken needs restocking',
    product: 'Fresh Chicken',
    severity: 'low',
    createdAt: '2024-01-13T16:20:00Z',
    read: true
  },
  {
    id: '7',
    type: 'expiry',
    message: 'Paneer expires in 2 days',
    product: 'Paneer',
    severity: 'medium',
    createdAt: '2024-01-13T15:45:00Z',
    read: true
  }
];

// Dashboard API calls
export const getDashboardStats = async () => {
  await delay(500); // Simulate API delay
  return mockDashboardStats;
};

export const getCategoryDistribution = async () => {
  await delay(300);
  return mockCategories;
};

export const getExpiringProducts = async () => {
  await delay(400);
  return mockExpiringProducts;
};

export const getSalesAnalysis = async () => {
  await delay(350);
  return mockSalesAnalysis;
};

// Products API calls
export const getProducts = async (filters = {}) => {
  await delay(600);
  let filteredProducts = [...mockProducts];
    
    // Apply filters
    if (filters.category) {
    filteredProducts = filteredProducts.filter(p => p.category === filters.category);
    }
    
    if (filters.velocity) {
    filteredProducts = filteredProducts.filter(p => p.velocity === filters.velocity);
  }
  
  if (filters.hasExpiry !== undefined) {
    if (filters.hasExpiry) {
      filteredProducts = filteredProducts.filter(p => p.expiry !== 'No expiry');
    } else {
      filteredProducts = filteredProducts.filter(p => p.expiry === 'No expiry');
    }
  }
  
  return filteredProducts;
};

export const createProduct = async (productData) => {
  await delay(800);
  const newProduct = {
    id: Date.now().toString(),
      ...productData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
  };
  mockProducts.push(newProduct);
  return newProduct;
};

export const updateProduct = async (id, productData) => {
  await delay(700);
  const index = mockProducts.findIndex(p => p.id === id);
  if (index !== -1) {
    mockProducts[index] = {
      ...mockProducts[index],
      ...productData,
      updatedAt: new Date().toISOString()
    };
    return mockProducts[index];
  }
  return null;
};

export const deleteProduct = async (id) => {
  await delay(500);
  const index = mockProducts.findIndex(p => p.id === id);
  if (index !== -1) {
    mockProducts.splice(index, 1);
    return { success: true };
  }
  return null;
};

// Forecast API calls
export const getExpiryPredictions = async () => {
  await delay(600);
  const expiringProducts = mockProducts.filter(p => p.expiry !== 'No expiry' && p.expiry !== '2024-12-31');
  
  return expiringProducts.map(product => {
    const currentStock = product.quantity;
    const predictedSales = Math.floor(currentStock * 0.7); // 70% of current stock
    const wasteRisk = currentStock - predictedSales;
    
    let riskLevel = 'Low';
    if (wasteRisk > currentStock * 0.3) riskLevel = 'High';
    else if (wasteRisk > currentStock * 0.1) riskLevel = 'Medium';
    
    return {
      id: product.id,
      product: product.name,
      batch: `BATCH-${product.id}`,
      expiryDate: product.expiry,
      currentStock: currentStock,
      predictedSales: predictedSales,
      wasteRisk: wasteRisk,
      riskLevel: riskLevel
    };
  });
};

export const getStockPredictions = async () => {
  await delay(500);
  const lowStockProducts = mockProducts.filter(p => p.status === 'Low Stock' || p.quantity < 30);
  
  return lowStockProducts.map(product => {
    const weeklyUsage = Math.floor(product.quantity * 0.3); // 30% weekly usage
    const stockOutDate = new Date();
    stockOutDate.setDate(stockOutDate.getDate() + Math.floor(product.quantity / weeklyUsage * 7));
    
    return {
      id: product.id,
      product: product.name,
      currentStock: product.quantity,
      weeklyUsage: weeklyUsage,
      stockOutDate: stockOutDate.toLocaleDateString(),
      recommendedOrder: Math.floor(weeklyUsage * 2), // 2 weeks supply
      confidence: Math.floor(Math.random() * 30) + 70 // 70-100% confidence
    };
  });
};

export const getVelocityAnalysis = async () => {
  await delay(400);
  const highVelocity = mockProducts.filter(p => p.velocity === 'High').map(p => p.name);
  const mediumVelocity = mockProducts.filter(p => p.velocity === 'Medium').map(p => p.name);
  const lowVelocity = mockProducts.filter(p => p.velocity === 'Low').map(p => p.name);
  
  return {
    fast_moving: highVelocity,
    medium_moving: mediumVelocity,
    slow_moving: lowVelocity
  };
};

// Alerts API calls
export const getNotifications = async () => {
  await delay(300);
  return mockNotifications;
};

export const getExpiringSoon = async () => {
  await delay(400);
  return mockExpiringProducts;
};

export const markNotificationAsRead = async (id) => {
  await delay(200);
  const notification = mockNotifications.find(n => n.id === id);
  if (notification) {
    notification.read = true;
  }
  return { success: true };
};

export const markAllNotificationsAsRead = async () => {
  await delay(300);
  mockNotifications.forEach(n => n.read = true);
    return { success: true };
};

export const getAlertSummary = async () => {
  await delay(250);
  return {
    total: mockNotifications.length,
    unread: mockNotifications.filter(n => !n.read).length,
    high: mockNotifications.filter(n => n.severity === 'high').length,
    medium: mockNotifications.filter(n => n.severity === 'medium').length,
    low: mockNotifications.filter(n => n.severity === 'low').length
  };
};

// Subscription functions (simulated)
export const subscribeToProducts = (callback) => {
  // Simulate real-time updates
  const interval = setInterval(() => {
    callback(mockProducts);
  }, 30000); // Update every 30 seconds
  
  return () => clearInterval(interval);
};

export const subscribeToAlerts = (callback) => {
  const interval = setInterval(() => {
    callback(mockNotifications);
  }, 15000); // Update every 15 seconds
  
  return () => clearInterval(interval);
};

export const subscribeToAnalytics = (callback) => {
  const interval = setInterval(() => {
    callback(mockDashboardStats);
  }, 60000); // Update every minute
  
  return () => clearInterval(interval);
}; 