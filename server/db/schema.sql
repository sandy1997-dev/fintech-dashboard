-- Users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categories
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  icon VARCHAR(50),
  color VARCHAR(20),
  type VARCHAR(10) CHECK (type IN ('income', 'expense')) NOT NULL
);

-- Transactions
CREATE TABLE IF NOT EXISTS transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES categories(id),
  amount DECIMAL(12, 2) NOT NULL,
  type VARCHAR(10) CHECK (type IN ('income', 'expense')) NOT NULL,
  description TEXT,
  merchant VARCHAR(100),
  date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Budgets
CREATE TABLE IF NOT EXISTS budgets (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES categories(id),
  amount DECIMAL(12, 2) NOT NULL,
  period VARCHAR(10) CHECK (period IN ('monthly', 'yearly')) DEFAULT 'monthly',
  month INTEGER,
  year INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Default categories insert (called after user creation)
CREATE OR REPLACE FUNCTION create_default_categories(p_user_id INTEGER)
RETURNS VOID AS $$
BEGIN
  INSERT INTO categories (user_id, name, icon, color, type) VALUES
    (p_user_id, 'Housing', 'home', '#6366f1', 'expense'),
    (p_user_id, 'Food & Dining', 'utensils', '#f59e0b', 'expense'),
    (p_user_id, 'Transport', 'car', '#10b981', 'expense'),
    (p_user_id, 'Entertainment', 'film', '#ec4899', 'expense'),
    (p_user_id, 'Healthcare', 'heart', '#ef4444', 'expense'),
    (p_user_id, 'Shopping', 'shopping-bag', '#8b5cf6', 'expense'),
    (p_user_id, 'Utilities', 'zap', '#14b8a6', 'expense'),
    (p_user_id, 'Salary', 'briefcase', '#22c55e', 'income'),
    (p_user_id, 'Freelance', 'code', '#3b82f6', 'income'),
    (p_user_id, 'Investments', 'trending-up', '#f97316', 'income');
END;
$$ LANGUAGE plpgsql;
