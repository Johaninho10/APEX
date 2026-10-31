export interface Category {
  id: string;
  name: string;
  type: "INCOME" | "EXPENSE";
  icon_family: string;
  icon_name: string;
  background: string;
  foreground: string;
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: Category;
}

interface Transactions {
  transactions: Transaction[];
}

interface Categories {
  categories: Category[]
}

export interface Store {
  transactions: Transactions;
  categories: Categories
}
