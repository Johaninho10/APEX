export interface Transaction {
  id: string;
  title: string;
  amount: number;
  iconFamily: string;
  iconName: string;
  backgroundColor: string;
  foregroundColor: string;
}

export const transactions: Transaction[] = [
  {
    id: "1",
    title: "Salary",
    amount: 450000,
    iconFamily: "MaterialIcons",
    iconName: "payments",
    backgroundColor: "#DCFCE7",
    foregroundColor: "#16A34A",
  },
  {
    id: "2",
    title: "Groceries",
    amount: -38500,
    iconFamily: "MaterialIcons",
    iconName: "shopping-cart",
    backgroundColor: "#FEF3C7",
    foregroundColor: "#D97706",
  },
  {
    id: "3",
    title: "Transport",
    amount: -12000,
    iconFamily: "Ionicons",
    iconName: "car-outline",
    backgroundColor: "#DBEAFE",
    foregroundColor: "#2563EB",
  },
  {
    id: "4",
    title: "Freelance",
    amount: 125000,
    iconFamily: "MaterialIcons",
    iconName: "work-outline",
    backgroundColor: "#E0E7FF",
    foregroundColor: "#4F46E5",
  },
  {
    id: "5",
    title: "Restaurant",
    amount: -18500,
    iconFamily: "Ionicons",
    iconName: "restaurant-outline",
    backgroundColor: "#FCE7F3",
    foregroundColor: "#DB2777",
  },
  {
    id: "6",
    title: "Internet",
    amount: -15000,
    iconFamily: "Feather",
    iconName: "wifi",
    backgroundColor: "#CFFAFE",
    foregroundColor: "#0891B2",
  },
  {
    id: "7",
    title: "Rent",
    amount: -150000,
    iconFamily: "MaterialIcons",
    iconName: "home",
    backgroundColor: "#F3E8FF",
    foregroundColor: "#9333EA",
  },
  {
    id: "8",
    title: "Sells",
    amount: 75000,
    iconFamily: "Ionicons",
    iconName: "cash-outline",
    backgroundColor: "#DCFCE7",
    foregroundColor: "#16A34A",
  },
  {
    id: "9",
    title: "Electicity",
    amount: -22000,
    iconFamily: "MaterialIcons",
    iconName: "bolt",
    backgroundColor: "#FEF9C3",
    foregroundColor: "#CA8A04",
  },
  {
    id: "10",
    title: "Netflix",
    amount: -6500,
    iconFamily: "Ionicons",
    iconName: "tv-outline",
    backgroundColor: "#FEE2E2",
    foregroundColor: "#DC2626",
  },
  {
    id: "11",
    title: "Prime",
    amount: 50000,
    iconFamily: "Feather",
    iconName: "gift",
    backgroundColor: "#EDE9FE",
    foregroundColor: "#7C3AED",
  },
  {
    id: "12",
    title: "Pharmacy",
    amount: -9500,
    iconFamily: "MaterialIcons",
    iconName: "local-pharmacy",
    backgroundColor: "#CCFBF1",
    foregroundColor: "#0F766E",
  },
];

export interface Category {
  id: string;
  name: string;
  type: "income" | "expense";
  iconFamily: string;
  iconName: string;
  backgroundColor: string;
  foregroundColor: string;
}

export const categories: Category[] = [
  // Dépenses
  {
    id: "food",
    name: "Food",
    type: "expense",
    iconFamily: "MaterialIcons",
    iconName: "restaurant",
    backgroundColor: "#FEF3C7",
    foregroundColor: "#D97706",
  },
  {
    id: "transport",
    name: "car",
    type: "expense",
    iconFamily: "MaterialIcons",
    iconName: "directions-car",
    backgroundColor: "#DBEAFE",
    foregroundColor: "#2563EB",
  },
  {
    id: "shopping",
    name: "Shopping",
    type: "expense",
    iconFamily: "MaterialIcons",
    iconName: "shopping-bag",
    backgroundColor: "#FCE7F3",
    foregroundColor: "#DB2777",
  },
  {
    id: "bills",
    name: "Bills",
    type: "expense",
    iconFamily: "MaterialIcons",
    iconName: "receipt-long",
    backgroundColor: "#EDE9FE",
    foregroundColor: "#7C3AED",
  },
  {
    id: "home",
    name: "Rent",
    type: "expense",
    iconFamily: "MaterialIcons",
    iconName: "home",
    backgroundColor: "#DCFCE7",
    foregroundColor: "#16A34A",
  },
  {
    id: "health",
    name: "Health",
    type: "expense",
    iconFamily: "MaterialIcons",
    iconName: "medical-services",
    backgroundColor: "#FEE2E2",
    foregroundColor: "#DC2626",
  },
  {
    id: "fun",
    name: "Fun",
    type: "expense",
    iconFamily: "MaterialIcons",
    iconName: "movie",
    backgroundColor: "#E0E7FF",
    foregroundColor: "#4F46E5",
  },

  // Revenus
  {
    id: "salary",
    name: "Salary",
    type: "income",
    iconFamily: "MaterialIcons",
    iconName: "payments",
    backgroundColor: "#DCFCE7",
    foregroundColor: "#16A34A",
  },
  {
    id: "freelance",
    name: "Freelance",
    type: "income",
    iconFamily: "MaterialIcons",
    iconName: "work",
    backgroundColor: "#DBEAFE",
    foregroundColor: "#2563EB",
  },
  {
    id: "bonus",
    name: "Bonus",
    type: "income",
    iconFamily: "MaterialIcons",
    iconName: "card-giftcard",
    backgroundColor: "#FEF3C7",
    foregroundColor: "#D97706",
  },
  {
    id: "other-income",
    name: "Other",
    type: "income",
    iconFamily: "MaterialIcons",
    iconName: "add-circle",
    backgroundColor: "#E0F2FE",
    foregroundColor: "#0284C7",
  },
];