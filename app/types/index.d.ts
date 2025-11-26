import type { AvatarProps } from '@nuxt/ui'

export type accountType = 'checking' | 'savings' | 'credit card' | 'investment' | 'loan'

export interface Account
{
  id: number
  name: string
  balance: number
  institution: string
  type: accountType
  avatar?: AvatarProps
}

export type transactionType = 'Sale' | 'Refund' | 'Withdrawal' | 'Payment' | 'Deposit'
export interface Transaction
{
  id: number
  dateTransation: Date
  datePosted: Date
  description: sting
  category: string
  amount: number
  type: transactionType
  accountId: number
  memo?: string
}

// From Template
export type UserStatus = 'subscribed' | 'unsubscribed' | 'bounced'
export type SaleStatus = 'paid' | 'failed' | 'refunded'

export interface User
{
  id: number
  name: string
  email: string
  avatar?: AvatarProps
  status: UserStatus
  location: string
}

export interface Mail
{
  id: number
  unread?: boolean
  from: User
  subject: string
  body: string
  date: string
}

export interface Member
{
  name: string
  username: string
  role: 'member' | 'owner'
  avatar: AvatarProps
}

export interface Stat
{
  title: string
  icon: string
  value: number | string
  variation: number
  formatter?: ( value: number ) => string
}

export interface Sale
{
  id: string
  date: string
  status: SaleStatus
  email: string
  amount: number
}

export interface Notification
{
  id: number
  unread?: boolean
  sender: User
  body: string
  date: string
}

export type Period = 'daily' | 'weekly' | 'monthly'

export interface Range
{
  start: Date
  end: Date
}
