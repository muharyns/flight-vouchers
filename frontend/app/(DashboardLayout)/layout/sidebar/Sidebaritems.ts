import { uniqueId } from 'lodash'

export interface ChildItem {
  id?: number | string
  name?: string
  icon?: any
  children?: ChildItem[]
  item?: any
  url?: any
  color?: string
  disabled?: boolean
  subtitle?: string
  badge?: boolean
  badgeType?: string
  isPro?: boolean
}

export interface MenuItem {
  heading?: string
  name?: string
  icon?: any
  id?: number
  to?: string
  items?: MenuItem[]
  children?: ChildItem[]
  url?: any
  disabled?: boolean
  subtitle?: string
  badgeType?: string
  badge?: boolean
  isPro?: boolean
}

const SidebarContent: MenuItem[] = [
  {
    heading: 'Voucher Generator',
    children: [
      {
        name: "Generate Voucher",
        icon: 'solar:ticker-star-linear',
        id: uniqueId(),
        url: "/",
        isPro: false
      }
    ],
  },

]

export default SidebarContent
