import { createClient } from '@supabase/supabase-js'
import { faker } from '@faker-js/faker'

const runSeeder = {
  seedAccounts: false,
  seedCategories: false,
  seedTransactions: true
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_PUBLISHABLE_KEY
)

/** SEED ACCOUNTS */
const seedAccounts = async (numEntries) => {
  console.log('Seeding accounts...')

  const accounts = []

  // Generate accounts
  for (let i = 0; i < numEntries; i++) {
    const accountName = faker.finance.accountName() + ` (...${faker.number.int({ min: 1000, max: 9999 })})`

    accounts.push({
      name: accountName,
      institution: faker.company.name(),
      account_type: faker.helpers.arrayElement(['checking', 'savings', 'credit_card', 'investment', 'loan', 'other']),
      avatar_url: faker.image.avatar(),
      balance: parseFloat(faker.finance.amount(-5000, 20000, 2))
    })
  }

  // Insert accounts
  const { error } = await supabase.from('accounts').insert(accounts)

  if (error) {
    console.error('Error inserting account:', error)
  }

  console.log('Accounts seeding completed.')
}

if (runSeeder.seedAccounts) await seedAccounts(10)

/** SEED CATEGORIES */
const seedCategories = async () => {
  console.log('Seeding categories...')

  // Define categories
  const categories = [
    'Food/Drink',
    'Groceries',
    'Home',
    'Rent/Mortgage',
    'Shopping',
    'Transportation',
    'Utilities'
  ].map(name => ({ name, slug: faker.helpers.slugify(name).toLowerCase() }))

  // Insert categories
  const { error } = await supabase.from('categories').insert(categories)

  if (error) {
    console.error('Error inserting category:', error)
  }

  console.log('Categories seeding completed.')
}

if (runSeeder.seedCategories) await seedCategories(10)

/** SEED TRANSACTIONS */
const seedTransactions = async (numEntries) => {
  console.log('Seeding transactions...')
  const transactions = []

  // Create array of company names for descriptions
  const companyNames = Array.from({ length: 6 }, () => faker.company.name())

  // Fetch existing account IDs
  const { data: accountsData, error: accountsError } = await supabase.from('accounts').select('id')
  if (accountsError) {
    console.error('Error fetching accounts:', accountsError)
    return
  }

  // Fetch existing category IDs
  const { data: categoriesData, error: categoriesError } = await supabase.from('categories').select('id')
  if (categoriesError) {
    console.error('Error fetching categories:', categoriesError)
    return
  }

  // Generate transactions
  for (let i = 0; i < numEntries; i++) {
    const transaction_date = faker.date.past(1).toISOString().split('T')[0]
    const transactionDateObj = new Date(transaction_date)
    const postDateObj = new Date(transactionDateObj)
    postDateObj.setDate(transactionDateObj.getDate() + faker.number.int({ min: 0, max: 8 }))
    const post_date = postDateObj.toISOString().split('T')[0]

    transactions.push({
      account_id: faker.helpers.arrayElement(accountsData).id,
      category_id: faker.helpers.arrayElement(categoriesData).id,
      amount: parseFloat(faker.finance.amount({ min: 1, max: 500, dec: 2 })) * -1,
      description: faker.helpers.arrayElement(companyNames),
      memo: faker.lorem.sentence(),
      transaction_date: transaction_date,
      post_date: post_date
    })
  }

  // // Insert transactions
  const { error } = await supabase.from('transactions').insert(transactions)

  if (error) {
    console.error('Error inserting transaction:', error)
  }

  console.log('Transactions seeding completed.')
}

if (runSeeder.seedTransactions) await seedTransactions(20)
