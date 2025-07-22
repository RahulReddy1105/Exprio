from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import random
from datetime import datetime, timedelta

app = FastAPI(title="Market Waste Management API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock data models
class Product(BaseModel):
    id: str
    name: str
    category: str
    batch: str
    quantity: int
    price: float
    expiry: str
    status: str
    velocity: str

class DashboardStats(BaseModel):
    total_products: int
    expiring_soon: int
    low_stock: int
    total_value: float

# Comprehensive mock data for Indian supermarket
mock_products = [
    # Dairy Products
    {"id": "1", "name": "Amul Full Cream Milk", "category": "Dairy", "batch": "BATCH001", "quantity": 45, "price": 58.0, "expiry": "2024-01-15", "status": "5 days left", "velocity": "Fast"},
    {"id": "2", "name": "Mother Dairy Curd", "category": "Dairy", "batch": "BATCH002", "quantity": 30, "price": 35.0, "expiry": "2024-01-12", "status": "2 days left", "velocity": "Fast"},
    {"id": "3", "name": "Amul Butter", "category": "Dairy", "batch": "BATCH003", "quantity": 25, "price": 55.0, "expiry": "2024-02-20", "status": "Good", "velocity": "Medium"},
    {"id": "4", "name": "Britannia Cheese Slices", "category": "Dairy", "batch": "BATCH004", "quantity": 20, "price": 120.0, "expiry": "2024-01-18", "status": "8 days left", "velocity": "Medium"},
    
    # Vegetables
    {"id": "5", "name": "Fresh Tomatoes", "category": "Vegetables", "batch": "BATCH005", "quantity": 60, "price": 40.0, "expiry": "2024-01-10", "status": "Expiring today", "velocity": "Fast"},
    {"id": "6", "name": "Onions", "category": "Vegetables", "batch": "BATCH006", "quantity": 80, "price": 30.0, "expiry": "2024-01-25", "status": "Good", "velocity": "Fast"},
    {"id": "7", "name": "Potatoes", "category": "Vegetables", "batch": "BATCH007", "quantity": 100, "price": 25.0, "expiry": "2024-02-15", "status": "Good", "velocity": "Fast"},
    {"id": "8", "name": "Carrots", "category": "Vegetables", "batch": "BATCH008", "quantity": 40, "price": 35.0, "expiry": "2024-01-14", "status": "4 days left", "velocity": "Medium"},
    
    # Fruits
    {"id": "9", "name": "Bananas", "category": "Fruits", "batch": "BATCH009", "quantity": 50, "price": 60.0, "expiry": "2024-01-13", "status": "3 days left", "velocity": "Fast"},
    {"id": "10", "name": "Apples", "category": "Fruits", "batch": "BATCH010", "quantity": 35, "price": 180.0, "expiry": "2024-01-20", "status": "Good", "velocity": "Medium"},
    {"id": "11", "name": "Oranges", "category": "Fruits", "batch": "BATCH011", "quantity": 45, "price": 120.0, "expiry": "2024-01-16", "status": "6 days left", "velocity": "Medium"},
    
    # Bakery
    {"id": "12", "name": "Britannia Brown Bread", "category": "Bakery", "batch": "BATCH012", "quantity": 30, "price": 35.0, "expiry": "2024-01-11", "status": "1 day left", "velocity": "Fast"},
    {"id": "13", "name": "Kellogg's Corn Flakes", "category": "Bakery", "batch": "BATCH013", "quantity": 25, "price": 150.0, "expiry": "2024-03-15", "status": "Good", "velocity": "Slow"},
    {"id": "14", "name": "Britannia Biscuits", "category": "Bakery", "batch": "BATCH014", "quantity": 40, "price": 30.0, "expiry": "2024-02-10", "status": "Good", "velocity": "Medium"},
    
    # Beverages
    {"id": "15", "name": "Coca Cola 2L", "category": "Beverages", "batch": "BATCH015", "quantity": 50, "price": 95.0, "expiry": "2024-06-20", "status": "Good", "velocity": "Fast"},
    {"id": "16", "name": "Sprite 1L", "category": "Beverages", "batch": "BATCH016", "quantity": 35, "price": 65.0, "expiry": "2024-06-15", "status": "Good", "velocity": "Fast"},
    {"id": "17", "name": "Tropicana Orange Juice", "category": "Beverages", "batch": "BATCH017", "quantity": 20, "price": 120.0, "expiry": "2024-01-17", "status": "7 days left", "velocity": "Medium"},
    
    # Snacks
    {"id": "18", "name": "Lay's Classic Chips", "category": "Snacks", "batch": "BATCH018", "quantity": 60, "price": 20.0, "expiry": "2024-04-10", "status": "Good", "velocity": "Fast"},
    {"id": "19", "name": "Kurkure Masala", "category": "Snacks", "batch": "BATCH019", "quantity": 45, "price": 15.0, "expiry": "2024-04-05", "status": "Good", "velocity": "Fast"},
    {"id": "20", "name": "Haldiram's Mixture", "category": "Snacks", "batch": "BATCH020", "quantity": 30, "price": 25.0, "expiry": "2024-03-20", "status": "Good", "velocity": "Medium"},
    
    # Frozen Foods
    {"id": "21", "name": "McCain French Fries", "category": "Frozen Foods", "batch": "BATCH021", "quantity": 25, "price": 180.0, "expiry": "2024-05-15", "status": "Good", "velocity": "Slow"},
    {"id": "22", "name": "Amul Ice Cream Vanilla", "category": "Frozen Foods", "batch": "BATCH022", "quantity": 20, "price": 150.0, "expiry": "2024-04-20", "status": "Good", "velocity": "Medium"},
    
    # Personal Care
    {"id": "23", "name": "Colgate Toothpaste", "category": "Personal Care", "batch": "BATCH023", "quantity": 40, "price": 85.0, "expiry": "2024-08-10", "status": "Good", "velocity": "Slow"},
    {"id": "24", "name": "Dove Soap", "category": "Personal Care", "batch": "BATCH024", "quantity": 35, "price": 45.0, "expiry": "2024-07-15", "status": "Good", "velocity": "Medium"},
    
    # Household
    {"id": "25", "name": "Surf Excel Liquid", "category": "Household", "batch": "BATCH025", "quantity": 30, "price": 120.0, "expiry": "2024-09-20", "status": "Good", "velocity": "Slow"},
    {"id": "26", "name": "Harpic Bathroom Cleaner", "category": "Household", "batch": "BATCH026", "quantity": 25, "price": 95.0, "expiry": "2024-08-25", "status": "Good", "velocity": "Slow"}
]

# Mock notifications
mock_notifications = [
    {"id": "1", "message": "Fresh Tomatoes expiring today - 60 units remaining", "type": "expiry", "priority": "high", "read": False, "timestamp": "2024-01-10T09:00:00"},
    {"id": "2", "message": "Mother Dairy Curd expiring in 2 days - 30 units", "type": "expiry", "priority": "high", "read": False, "timestamp": "2024-01-10T08:30:00"},
    {"id": "3", "message": "Britannia Brown Bread low stock - only 30 units left", "type": "stock", "priority": "medium", "read": False, "timestamp": "2024-01-10T08:00:00"},
    {"id": "4", "message": "Bananas expiring in 3 days - 50 units", "type": "expiry", "priority": "medium", "read": False, "timestamp": "2024-01-10T07:30:00"},
    {"id": "5", "message": "Carrots expiring in 4 days - 40 units", "type": "expiry", "priority": "medium", "read": False, "timestamp": "2024-01-10T07:00:00"},
    {"id": "6", "message": "Britannia Cheese Slices expiring in 8 days - 20 units", "type": "expiry", "priority": "low", "read": False, "timestamp": "2024-01-10T06:30:00"},
    {"id": "7", "message": "Tropicana Orange Juice expiring in 7 days - 20 units", "type": "expiry", "priority": "low", "read": False, "timestamp": "2024-01-10T06:00:00"},
    {"id": "8", "message": "Oranges expiring in 6 days - 45 units", "type": "expiry", "priority": "low", "read": False, "timestamp": "2024-01-10T05:30:00"}
]

# Dashboard endpoints
@app.get("/api/dashboard/stats")
async def get_dashboard_stats():
    expiring_soon = len([p for p in mock_products if "days left" in p["status"] or "Expiring today" in p["status"]])
    low_stock = len([p for p in mock_products if p["quantity"] <= 25])
    total_value = sum(p["quantity"] * p["price"] for p in mock_products)
    
    return {
        "total_products": len(mock_products),
        "expiring_soon": expiring_soon,
        "low_stock": low_stock,
        "total_value": total_value
    }

@app.get("/api/dashboard/categories")
async def get_category_distribution():
    categories = {}
    for product in mock_products:
        cat = product["category"]
        categories[cat] = categories.get(cat, 0) + 1
    return categories

@app.get("/api/dashboard/expiring")
async def get_expiring_products():
    expiring_products = [p for p in mock_products if "days left" in p["status"] or "Expiring today" in p["status"]]
    # Sort by urgency (expiring today first, then by days left)
    expiring_products.sort(key=lambda x: (0 if "Expiring today" in x["status"] else int(x["status"].split()[0]), x["name"]))
    return expiring_products[:5]  # Return top 5 most urgent

@app.get("/api/dashboard/sales")
async def get_sales_analysis():
    return {
        "daily_sales": [12500, 13800, 11200, 14500, 13200, 15800, 16200],
        "weekly_trend": "increasing",
        "top_selling": ["Fresh Tomatoes", "Amul Full Cream Milk", "Onions", "Bananas", "Britannia Brown Bread"]
    }

# Products endpoints
@app.get("/api/products")
async def get_products(hasExpiry: Optional[bool] = None):
    if hasExpiry is None:
        return mock_products
    
    if hasExpiry:
        return [p for p in mock_products if "days left" in p["status"] or "Expiring today" in p["status"]]
    else:
        return [p for p in mock_products if "Good" in p["status"]]

@app.post("/api/products")
async def create_product(product: Product):
    new_product = product.dict()
    new_product["id"] = str(len(mock_products) + 1)
    mock_products.append(new_product)
    return new_product

@app.put("/api/products/{product_id}")
async def update_product(product_id: str, product: Product):
    for i, p in enumerate(mock_products):
        if p["id"] == product_id:
            mock_products[i] = product.dict()
            return mock_products[i]
    raise HTTPException(status_code=404, detail="Product not found")

@app.delete("/api/products/{product_id}")
async def delete_product(product_id: str):
    for i, p in enumerate(mock_products):
        if p["id"] == product_id:
            deleted = mock_products.pop(i)
            return {"message": "Product deleted", "product": deleted}
    raise HTTPException(status_code=404, detail="Product not found")

# Forecast endpoints
@app.get("/api/forecast/expiry")
async def get_expiry_predictions():
    expiring_products = [p for p in mock_products if "days left" in p["status"] or "Expiring today" in p["status"]]
    predictions = []
    
    for product in expiring_products:
        if "Expiring today" in product["status"]:
            days = 0
        else:
            days = int(product["status"].split()[0])
        
        predictions.append({
            "product": product["name"],
            "days_until_expiry": days,
            "confidence": max(0.7, 1.0 - (days * 0.05)),
            "quantity": product["quantity"],
            "category": product["category"]
        })
    
    # Sort by urgency
    predictions.sort(key=lambda x: x["days_until_expiry"])
    return {"predictions": predictions}

@app.get("/api/forecast/stock")
async def get_stock_predictions():
    low_stock_products = [p for p in mock_products if p["quantity"] <= 30]
    predictions = []
    
    for product in low_stock_products:
        # Calculate estimated stock out date based on velocity
        velocity_multiplier = {"Fast": 3, "Medium": 7, "Slow": 14}
        days_until_stockout = (product["quantity"] * velocity_multiplier.get(product["velocity"], 7)) // 10
        
        predictions.append({
            "product": product["name"],
            "stock_out_date": (datetime.now() + timedelta(days=days_until_stockout)).strftime("%Y-%m-%d"),
            "confidence": max(0.6, 1.0 - (product["quantity"] * 0.02)),
            "current_stock": product["quantity"],
            "category": product["category"]
        })
    
    # Sort by urgency
    predictions.sort(key=lambda x: int(x["current_stock"]))
    return {"predictions": predictions}

@app.get("/api/forecast/velocity")
async def get_velocity_analysis():
    fast_moving = [p["name"] for p in mock_products if p["velocity"] == "Fast"]
    medium_moving = [p["name"] for p in mock_products if p["velocity"] == "Medium"]
    slow_moving = [p["name"] for p in mock_products if p["velocity"] == "Slow"]
    
    return {
        "fast_moving": fast_moving,
        "medium_moving": medium_moving,
        "slow_moving": slow_moving
    }

# Alerts endpoints
@app.get("/api/alerts/notifications")
async def get_notifications():
    return mock_notifications

@app.get("/api/alerts/expiring")
async def get_expiring_soon():
    expiring_products = [p for p in mock_products if "days left" in p["status"] or "Expiring today" in p["status"]]
    # Sort by urgency
    expiring_products.sort(key=lambda x: (0 if "Expiring today" in x["status"] else int(x["status"].split()[0]), x["name"]))
    return expiring_products

@app.put("/api/alerts/notifications/{notification_id}/read")
async def mark_notification_as_read(notification_id: str):
    for notification in mock_notifications:
        if notification["id"] == notification_id:
            notification["read"] = True
            return {"message": "Notification marked as read"}
    raise HTTPException(status_code=404, detail="Notification not found")

@app.put("/api/alerts/notifications/read-all")
async def mark_all_notifications_as_read():
    for notification in mock_notifications:
        notification["read"] = True
    return {"message": "All notifications marked as read"}

@app.put("/api/alerts/config")
async def update_alert_config(config: Dict[str, Any]):
    return {"message": "Alert config updated", "config": config}

@app.get("/api/alerts/summary")
async def get_alert_summary():
    unread_count = len([n for n in mock_notifications if not n["read"]])
    expiry_alerts = len([n for n in mock_notifications if n["type"] == "expiry" and not n["read"]])
    stock_alerts = len([n for n in mock_notifications if n["type"] == "stock" and not n["read"]])
    
    return {
        "total_alerts": len(mock_notifications),
        "unread_alerts": unread_count,
        "expiry_alerts": expiry_alerts,
        "stock_alerts": stock_alerts
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
