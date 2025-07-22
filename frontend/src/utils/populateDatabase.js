// Simple script to populate Firestore database
// Run this from your frontend directory after installing firebase

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

// Your Firebase config.
const firebaseConfig =. //your api key

// Dummy data
const dummyData = {
  products: [
    {
      id: "prod_001",
      name: "Bananas",
      category: "Fresh Produce",
      batch: "BAN-2024-001",
      quantity: 85,
      unit: "kg",
      price: "$2.49",
      pricePerUnit: "$2.49/kg",
      expiry: "2024-01-25",
      status: "3 days left",
      velocity: "Fast",
      supplier: "Fresh Fruits Co.",
      location: "Produce Section",
      minStock: 30,
      maxStock: 120,
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-20T14:45:00Z"
    },
    {
      id: "prod_002",
      name: "Whole Milk",
      category: "Dairy & Eggs",
      batch: "MILK-2024-002",
      quantity: 45,
      unit: "liters",
      price: "$3.99",
      pricePerUnit: "$3.99/liter",
      expiry: "2024-01-23",
      status: "1 day left",
      velocity: "Fast",
      supplier: "Dairy Farm Ltd.",
      location: "Dairy Section",
      minStock: 20,
      maxStock: 80,
      createdAt: "2024-01-10T08:15:00Z",
      updatedAt: "2024-01-20T16:20:00Z"
    },
    {
      id: "prod_003",
      name: "White Bread",
      category: "Bakery",
      batch: "BREAD-2024-003",
      quantity: 25,
      unit: "loaves",
      price: "$2.99",
      pricePerUnit: "$2.99/loaf",
      expiry: "2024-01-22",
      status: "Expired",
      velocity: "Fast",
      supplier: "Local Bakery",
      location: "Bakery Section",
      minStock: 15,
      maxStock: 50,
      createdAt: "2024-01-12T09:00:00Z",
      updatedAt: "2024-01-20T11:30:00Z"
    },
    {
      id: "prod_004",
      name: "Chicken Breast",
      category: "Meat & Poultry",
      batch: "CHICKEN-2024-004",
      quantity: 35,
      unit: "kg",
      price: "$8.99",
      pricePerUnit: "$8.99/kg",
      expiry: "2024-01-24",
      status: "2 days left",
      velocity: "Fast",
      supplier: "Premium Meats",
      location: "Meat Section",
      minStock: 20,
      maxStock: 60,
      createdAt: "2024-01-14T07:45:00Z",
      updatedAt: "2024-01-20T13:15:00Z"
    },
    {
      id: "prod_005",
      name: "Spinach",
      category: "Fresh Produce",
      batch: "SPINACH-2024-005",
      quantity: 15,
      unit: "kg",
      price: "$3.49",
      pricePerUnit: "$3.49/kg",
      expiry: "2024-01-21",
      status: "Expired",
      velocity: "Medium",
      supplier: "Green Valley Farms",
      location: "Produce Section",
      minStock: 10,
      maxStock: 40,
      createdAt: "2024-01-16T12:00:00Z",
      updatedAt: "2024-01-20T15:45:00Z"
    }
  ],
  analytics: [
    {
      id: "analytics_001",
      date: "2024-01-20",
      totalSales: 149.28,
      totalProducts: 25,
      lowStockItems: 4,
      expiringItems: 6,
      topSellingCategory: "Beverages",
      revenue: 149.28,
      customers: 14,
      averageTransactionValue: 10.66
    }
  ],
  alerts: [
    {
      id: "alert_001",
      type: "low_stock",
      productId: "prod_005",
      productName: "Spinach",
      message: "Spinach is running low (15 kg remaining)",
      severity: "warning",
      createdAt: "2024-01-20T15:30:00Z",
      isRead: false
    },
    {
      id: "alert_002",
      type: "expiry",
      productId: "prod_003",
      productName: "White Bread",
      message: "White Bread has expired",
      severity: "danger",
      createdAt: "2024-01-20T14:15:00Z",
      isRead: false
    }
  ],
  categories: [
    {
      id: "cat_001",
      name: "Fresh Produce",
      description: "Fresh fruits, vegetables, and herbs",
      productCount: 6,
      totalValue: 2396.50
    },
    {
      id: "cat_002",
      name: "Dairy & Eggs",
      description: "Milk, cheese, yogurt, eggs, and dairy products",
      productCount: 4,
      totalValue: 2097.50
    },
    {
      id: "cat_003",
      name: "Bakery",
      description: "Fresh bread, pastries, and baked goods",
      productCount: 1,
      totalValue: 74.75
    }
  ]
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function populateDatabase() {
  try {
    console.log('🚀 Starting to populate Firestore with dummy data...\n');

    // Populate Products
    console.log('📦 Adding products...');
    for (const product of dummyData.products) {
      await setDoc(doc(db, 'products', product.id), product);
      console.log(`  ✅ Added: ${product.name} (${product.quantity} ${product.unit})`);
    }

    // Populate Analytics
    console.log('\n📊 Adding analytics data...');
    for (const analytics of dummyData.analytics) {
      await setDoc(doc(db, 'analytics', analytics.id), analytics);
      console.log(`  ✅ Added: Analytics for ${analytics.date} - $${analytics.totalSales}`);
    }

    // Populate Alerts
    console.log('\n🚨 Adding alerts...');
    for (const alert of dummyData.alerts) {
      await setDoc(doc(db, 'alerts', alert.id), alert);
      console.log(`  ✅ Added: ${alert.message}`);
    }

    // Populate Categories
    console.log('\n📂 Adding categories...');
    for (const category of dummyData.categories) {
      await setDoc(doc(db, 'categories', category.id), category);
      console.log(`  ✅ Added: ${category.name} (${category.productCount} products)`);
    }

    console.log('\n🎉 Successfully populated Firestore with dummy data!');
    console.log('\n📋 Summary:');
    console.log(`  • ${dummyData.products.length} products`);
    console.log(`  • ${dummyData.analytics.length} analytics entries`);
    console.log(`  • ${dummyData.alerts.length} alerts`);
    console.log(`  • ${dummyData.categories.length} categories`);

    console.log('\n🔗 Your application is now connected to the dummy database!');
    console.log('💡 You can now test your frontend with realistic data.');

  } catch (error) {
    console.error('❌ Error populating database:', error);
  }
}

// Export for use in components
export default populateDatabase; 
