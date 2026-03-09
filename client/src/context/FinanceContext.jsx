import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { subDays, format, startOfMonth, endOfMonth } from 'date-fns'
import api from '../utils/api'

const FinanceContext = createContext(null)

// Generate realistic mock data for demo / when API is unavailable
function generateMockTransactions() {
  const categories = [
    { id: 'housing', name: 'Housing', color: '#C8FF00', icon: '🏠' },
    { id: 'food', name: 'Food & Dining', color: '#FF4D6D', icon: '🍔' },
    { id: 'transport', name: 'Transport', color: '#00C2FF', icon: '🚗' },
    { id: 'shopping', name: 'Shopping', color: '#FFB800', icon: '🛍️' },
    { id: 'health', name: 'Health', color: '#00FFB3', icon: '💊' },
    { id: 'entertainment', name: 'Entertainment', color: '#B44DFF', icon: '🎬' },
    { id: 'income', name: 'Income', color: '#C8FF00', icon: '💰' },
    { id: 'utilities', name: 'Utilities', color: '#FF8C00', icon: '⚡' },
  ]

  const merchants = {
    food: ['Whole Foods', 'Chipotle', 'Starbucks', 'DoorDash', 'Trader Joe\'s', 'McDonald\'s'],
    transport: ['Uber', 'Lyft', 'Shell Gas', 'MTA Transit', 'Parking.com'],
    shopping: ['Amazon', 'Target', 'Nike', 'Apple Store', 'Zara', 'IKEA'],
    health: ['CVS Pharmacy', 'Planet Fitness', 'Walgreens', 'Kaiser Permanente'],
    entertainment: ['Netflix', 'Spotify', 'AMC Theaters', 'Steam', 'HBO Max'],
    utilities: ['Con Edison', 'AT&T', 'Comcast', 'Water Dept'],
    housing: ['Landlord LLC', 'Chase Mortgage', 'Home Depot'],
    income: ['Employer Direct Deposit', 'Freelance Payment', 'Dividend'],
  }

  const txns = []
  for (let i = 0; i < 90; i++) {
    const date = subDays(new Date(), i)
    const numTxns = Math.floor(Math.random() * 4) + 1
    for (let j = 0; j < numTxns; j++) {
      const isIncome = Math.random() < 0.08
      const cat = isIncome ? categories[6] : categories[Math.floor(Math.random() * 6)]
      const merchant = merchants[cat.id][Math.floor(Math.random() * merchants[cat.id].length)]
      const amount = isIncome
        ? (Math.random() * 3000 + 1000)
        : (Math.random() * 200 + 5)
      txns.push({
        id: `txn-${i}-${j}`,
        date: format(date, 'yyyy-MM-dd'),
        merchant,
        category: cat,
        amount: parseFloat(amount.toFixed(2)),
        type: isIncome ? 'income' : 'expense',
        note: '',
      })
    }
  }
  return txns.sort((a, b) => new Date(b.date) - new Date(a.date))
}

function generateMockBudgets() {
  return [
    { id: 'b1', category: 'food', limit: 600, spent: 423 },
    { id: 'b2', category: 'transport', limit: 200, spent: 156 },
    { id: 'b3', category: 'shopping', limit: 400, spent: 512 },
    { id: 'b4', category: 'health', limit: 150, spent: 89 },
    { id: 'b5', category: 'entertainment', limit: 100, spent: 97 },
    { id: 'b6', category: 'utilities', limit: 250, spent: 198 },
    { id: 'b7', category: 'housing', limit: 2000, spent: 1850 },
  ]
}

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState([])
  const [budgets, setBudgets] = useState([])
  const [loading, setLoading] = useState(true)
  const [usingMockData, setUsingMockData] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState(new Date())

  const CATEGORIES = [
    { id: 'housing', name: 'Housing', color: '#C8FF00', icon: '🏠' },
    { id: 'food', name: 'Food & Dining', color: '#FF4D6D', icon: '🍔' },
    { id: 'transport', name: 'Transport', color: '#00C2FF', icon: '🚗' },
    { id: 'shopping', name: 'Shopping', color: '#FFB800', icon: '🛍️' },
    { id: 'health', name: 'Health', color: '#00FFB3', icon: '💊' },
    { id: 'entertainment', name: 'Entertainment', color: '#B44DFF', icon: '🎬' },
    { id: 'income', name: 'Income', color: '#C8FF00', icon: '💰' },
    { id: 'utilities', name: 'Utilities', color: '#FF8C00', icon: '⚡' },
  ]

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [txRes, budRes] = await Promise.all([
        api.get('/transactions'),
        api.get('/budgets'),
      ])
      setTransactions(txRes.data)
      setBudgets(budRes.data)
      setUsingMockData(false)
    } catch {
      setTransactions(generateMockTransactions())
      setBudgets(generateMockBudgets())
      setUsingMockData(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  // Derived stats
  const monthStart = startOfMonth(selectedMonth)
  const monthEnd = endOfMonth(selectedMonth)
  const monthlyTxns = transactions.filter(t => {
    const d = new Date(t.date)
    return d >= monthStart && d <= monthEnd
  })

  const monthlyIncome = monthlyTxns
    .filter(t => t.type === 'income')
    .reduce((s, t) => s + t.amount, 0)

  const monthlyExpenses = monthlyTxns
    .filter(t => t.type === 'expense')
    .reduce((s, t) => s + t.amount, 0)

  const netSavings = monthlyIncome - monthlyExpenses
  const savingsRate = monthlyIncome > 0 ? (netSavings / monthlyIncome) * 100 : 0

  // Spending by category this month
  const spendingByCategory = CATEGORIES
    .filter(c => c.id !== 'income')
    .map(cat => ({
      ...cat,
      total: monthlyTxns
        .filter(t => t.type === 'expense' && t.category?.id === cat.id)
        .reduce((s, t) => s + t.amount, 0)
    }))
    .filter(c => c.total > 0)
    .sort((a, b) => b.total - a.total)

  // Daily spending for last 30 days
  const dailySpending = []
  for (let i = 29; i >= 0; i--) {
    const day = subDays(new Date(), i)
    const dayStr = format(day, 'yyyy-MM-dd')
    const dayTxns = transactions.filter(t => t.date === dayStr && t.type === 'expense')
    dailySpending.push({
      date: day,
      label: format(day, 'MMM d'),
      amount: dayTxns.reduce((s, t) => s + t.amount, 0),
    })
  }

  // Monthly trend last 6 months
  const monthlyTrend = []
  for (let i = 5; i >= 0; i--) {
    const d = new Date()
    d.setMonth(d.getMonth() - i)
    const mStart = startOfMonth(d)
    const mEnd = endOfMonth(d)
    const mTxns = transactions.filter(t => {
      const td = new Date(t.date)
      return td >= mStart && td <= mEnd
    })
    monthlyTrend.push({
      label: format(d, 'MMM'),
      income: mTxns.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0),
      expenses: mTxns.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0),
    })
  }

  const addTransaction = async (txn) => {
    try {
      const res = await api.post('/transactions', txn)
      setTransactions(prev => [res.data, ...prev])
    } catch {
      const mockTxn = { ...txn, id: `mock-${Date.now()}` }
      setTransactions(prev => [mockTxn, ...prev])
    }
  }

  const deleteTransaction = async (id) => {
    try {
      await api.delete(`/transactions/${id}`)
    } catch {}
    setTransactions(prev => prev.filter(t => t.id !== id))
  }

  const updateBudget = async (budgetData) => {
    try {
      const res = await api.put(`/budgets/${budgetData.id}`, budgetData)
      setBudgets(prev => prev.map(b => b.id === budgetData.id ? res.data : b))
    } catch {
      setBudgets(prev => prev.map(b => b.id === budgetData.id ? budgetData : b))
    }
  }

  return (
    <FinanceContext.Provider value={{
      transactions,
      budgets,
      loading,
      usingMockData,
      selectedMonth,
      setSelectedMonth,
      CATEGORIES,
      // Derived
      monthlyTxns,
      monthlyIncome,
      monthlyExpenses,
      netSavings,
      savingsRate,
      spendingByCategory,
      dailySpending,
      monthlyTrend,
      // Actions
      addTransaction,
      deleteTransaction,
      updateBudget,
      refresh: fetchData,
    }}>
      {children}
    </FinanceContext.Provider>
  )
}

export function useFinance() {
  const ctx = useContext(FinanceContext)
  if (!ctx) throw new Error('useFinance must be used within FinanceProvider')
  return ctx
}
