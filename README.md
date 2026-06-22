# 💰 Budget Tracker

A full-stack web application designed to help users track their daily expenses, visualize spending habits, and manage their finances with ease.

## 🚀 Features

- **Full CRUD Operations:** Create, Read, Update, and Delete transactions.
- **Smart Visualization:** Dynamic expense charting to see where your money goes.
- **Category Categorization:** Automatic icon generation based on spending category (Groceries,Work,Bills,etc.).
- **Responsive Design:** Clean, modern interface optimized for desktop and mobile.
- **Real-time Updates:** Automatic dashboard refreshing after every transaction.

## 🛠️ Tech Stack

### Frontend

- **Framework:** React.js
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Data Fetching:** Axios

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)

## 📦 Installation & Setup

### Prerequisites

- Node.js installed
- MongoDB Atlas account (or local MongoDB instance)

## Local Setup

1. **Clone the repository:**
```bash
git clone <your-repo-url>
cd budget-tracker
```

2. **Install Dependencies:**
```bash
cd client && npm install
cd ../server && npm install
```

3. **Configure Environment Variables:**
Create an `.env` file in your `server/` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

4. **Start the Application:**
- **Start Backend:** `cd server && npm run dev`
- **Start Frontend:** `cd client && npm run dev`

## 💡 How to Use

1. Enter your **Category** (e.g., "Groceries", "Rent") and **Amount** in the form.
2. Click **"Save Transaction"** to add it to your history.
3. Use the **Edit (pencil icon)** to update an existing entry or the **Trash (icon)** to remove it.
4. Your **Total Spent** is automatically calculated and updated at the bottom of the activity list.

---

*Built with passion by Whitney Gunter.*