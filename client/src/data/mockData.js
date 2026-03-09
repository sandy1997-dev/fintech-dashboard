export const MOCK_CATEGORIES = [
  { id: 1, name: 'Housing', icon: 'home', color: '#6366f1', type: 'expense' },
  { id: 2, name: 'Food & Dining', icon: 'utensils', color: '#f59e0b', type: 'expense' },
  { id: 3, name: 'Transport', icon: 'car', color: '#10b981', type: 'expense' },
  { id: 4, name: 'Entertainment', icon: 'film', color: '#ec4899', type: 'expense' },
  { id: 5, name: 'Healthcare', icon: 'heart', color: '#ef4444', type: 'expense' },
  { id: 6, name: 'Shopping', icon: 'shopping-bag', color: '#8b5cf6', type: 'expense' },
  { id: 7, name: 'Utilities', icon: 'zap', color: '#14b8a6', type: 'expense' },
  { id: 8, name: 'Salary', icon: 'briefcase', color: '#22c55e', type: 'income' },
  { id: 9, name: 'Freelance', icon: 'code', color: '#3b82f6', type: 'income' },
  { id: 10, name: 'Investments', icon: 'trending-up', color: '#f97316', type: 'income' },
];

export const MOCK_TRANSACTIONS = [
  { id: 1, category_id: 8, category_name: 'Salary', icon: 'briefcase', color: '#22c55e', amount: 5200, type: 'income', description: 'Monthly salary', merchant: 'Acme Corp', date: '2024-01-31' },
  { id: 2, category_id: 1, category_name: 'Housing', icon: 'home', color: '#6366f1', amount: 1450, type: 'expense', description: 'Rent', merchant: 'Landlord', date: '2024-01-01' },
  { id: 3, category_id: 2, category_name: 'Food & Dining', icon: 'utensils', color: '#f59e0b', amount: 68.50, type: 'expense', description: 'Weekly groceries', merchant: 'Whole Foods', date: '2024-01-28' },
  { id: 4, category_id: 3, category_name: 'Transport', icon: 'car', color: '#10b981', amount: 45.00, type: 'expense', description: 'Uber rides', merchant: 'Uber', date: '2024-01-27' },
  { id: 5, category_id: 4, category_name: 'Entertainment', icon: 'film', color: '#ec4899', amount: 29.99, type: 'expense', description: 'Streaming services', merchant: 'Netflix', date: '2024-01-25' },
  { id: 6, category_id: 9, category_name: 'Freelance', icon: 'code', color: '#3b82f6', amount: 1800, type: 'income', description: 'Design project', merchant: 'Client XY', date: '2024-01-22' },
  { id: 7, category_id: 6, category_name: 'Shopping', icon: 'shopping-bag', color: '#8b5cf6', amount: 124.99, type: 'expense', description: 'Winter jacket', merchant: 'Zara', date: '2024-01-20' },
  { id: 8, category_id: 7, category_name: 'Utilities', icon: 'zap', color: '#14b8a6', amount: 87.50, type: 'expense', description: 'Electric + internet', merchant: 'Utilities Co', date: '2024-01-15' },
  { id: 9, category_id: 5, category_name: 'Healthcare', icon: 'heart', color: '#ef4444', amount: 55.00, type: 'expense', description: 'Doctor visit', merchant: 'City Clinic', date: '2024-01-10' },
  { id: 10, category_id: 2, category_name: 'Food & Dining', icon: 'utensils', color: '#f59e0b', amount: 42.80, type: 'expense', description: 'Restaurant dinner', merchant: 'The Grand', date: '2024-01-08' },
];

export const MOCK_SUMMARY = { total_income: 7000, total_expenses: 1963.78, transaction_count: 10 };

export const MOCK_BY_CATEGORY = [
  { name: 'Housing', color: '#6366f1', icon: 'home', total: 1450 },
  { name: 'Food & Dining', color: '#f59e0b', icon: 'utensils', total: 421.30 },
  { name: 'Shopping', color: '#8b5cf6', icon: 'shopping-bag', total: 124.99 },
  { name: 'Utilities', color: '#14b8a6', icon: 'zap', total: 87.50 },
  { name: 'Healthcare', color: '#ef4444', icon: 'heart', total: 55.00 },
  { name: 'Transport', color: '#10b981', icon: 'car', total: 45.00 },
  { name: 'Entertainment', color: '#ec4899', icon: 'film', total: 29.99 },
];

export const MOCK_TREND = [
  { label: 'Aug', income: 5200, expenses: 3800 },
  { label: 'Sep', income: 6100, expenses: 4100 },
  { label: 'Oct', income: 5800, expenses: 3600 },
  { label: 'Nov', income: 7200, expenses: 4500 },
  { label: 'Dec', income: 6800, expenses: 5200 },
  { label: 'Jan', income: 7000, expenses: 1963 },
];

export const MOCK_BUDGETS = [
  { id: 1, category_id: 1, category_name: 'Housing', icon: 'home', color: '#6366f1', amount: 1500, spent: 1450 },
  { id: 2, category_id: 2, category_name: 'Food & Dining', icon: 'utensils', color: '#f59e0b', amount: 500, spent: 421.30 },
  { id: 3, category_id: 3, category_name: 'Transport', icon: 'car', color: '#10b981', amount: 100, spent: 45.00 },
  { id: 4, category_id: 4, category_name: 'Entertainment', icon: 'film', color: '#ec4899', amount: 80, spent: 29.99 },
  { id: 5, category_id: 6, category_name: 'Shopping', icon: 'shopping-bag', color: '#8b5cf6', amount: 200, spent: 124.99 },
];
