<script setup lang="ts">
import { badge } from '#build/ui'
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const toast = useToast()

const open = ref(false)

const links = [[{
  label: 'Home',
  icon: 'i-lucide-house',
  to: '/',
  onSelect: () => {
    open.value = false
  }
}, {
  label: 'Budgeting',
  to: '/budgeting',
  icon: 'i-lucide-wallet',
  defaultOpen: false,
  type: 'trigger',
  children: [{
    label: 'Overview',
    to: '/budgeting',
    exact: true,
    onSelect: () => {
      open.value = false
    }
  }, {
    label: 'Accounts',
    to: '/budgeting/accounts',
    onSelect: () => {
      open.value = false
    }
  }, {
    label: 'Transactions',
    to: '/budgeting/transactions',
    onSelect: () => {
      open.value = false
    }
  }, {
    label: 'Cash Flow',
    to: '/budgeting/cash-flow',
    onSelect: () => {
      open.value = false
    }
  }, {
    label: 'Reports',
    to: '/budgeting/reports',
    onSelect: () => {
      open.value = false
    }
  }, {
    label: 'Budget',
    to: '/budgeting/budget',
    onSelect: () => {
      open.value = false
    }
  }, {
    label: 'Recurring',
    to: '/budgeting/recurring',
    onSelect: () => {
      open.value = false
    }
  }, {
    label: 'Investments',
    to: '/budgeting/investments',
    onSelect: () => {
      open.value = false
    }
  }, {
    label: '20k Spending',
    to: '/budgeting/20k-spending',
    onSelect: () => {
      open.value = false
    }
  }, {
    label: 'Savings Sectioning',
    to: '/budgeting/savings-sectioning',
    onSelect: () => {
      open.value = false
    }
  }, {
    label: 'Statement Uploader',
    to: '/budgeting/statement-uploader',
    onSelect: () => {
      open.value = false
    }
  }]
}, {
  label: 'Freelance',
  to: '/freelance',
  icon: 'i-lucide-briefcase',
  defaultOpen: false,
  type: 'trigger',
  children: [{
    label: 'Overview',
    to: '/freelance',
    exact: true,
    onSelect: () => {
      open.value = false
    }
  }, {
    label: 'Earnings',
    to: '/freelance/earnings',
    onSelect: () => {
      open.value = false
    }
  }, {
    label: 'Tasks',
    to: '/freelance/tasks',
    onSelect: () => {
      open.value = false
    }
  }, {
    label: 'Clients',
    to: '/freelance/clients',
    onSelect: () => {
      open.value = false
    }
  }, {
    label: 'Invoice Generator',
    to: '/freelance/invoice-generator',
    onSelect: () => {
      open.value = false
    }
  }, {
    label: 'Time Tracker',
    to: '/freelance/time-tracker',
    onSelect: () => {
      open.value = false
    }
  }]
}, {
  label: 'Gardening',
  to: '/gardening',
  icon: 'i-lucide-sprout',
  defaultOpen: false,
  type: 'trigger',
  children: [{
    label: 'Overview',
    to: '/gardening',
    exact: true,
    onSelect: () => {
      open.value = false
    }
  }, {
    label: 'Inventory',
    to: '/gardening/inventory',
    onSelect: () => {
      open.value = false
    }
  }, {
    label: 'Calendar',
    to: '/gardening/calendar',
    onSelect: () => {
      open.value = false
    }
  }, {
    label: 'Tasks',
    to: '/gardening/tasks',
    onSelect: () => {
      open.value = false
    }
  }]
}, {
  label: 'Backup',
  to: '/',
  icon: 'i-lucide-database',
  defaultOpen: false,
  type: 'trigger',
  children: [{
    label: 'Inbox',
    to: '/inbox',
    badge: '4',
    onSelect: () => {
      open.value = false
    }
  }, {
    label: 'Customer',
    to: '/customers',
    onSelect: () => {
      open.value = false
    }
  }]
}, {
  label: 'Settings',
  to: '/settings',
  icon: 'i-lucide-settings',
  defaultOpen: true,
  type: 'trigger',
  children: [{
    label: 'General',
    to: '/settings',
    exact: true,
    onSelect: () => {
      open.value = false
    }
  }, {
    label: 'Members',
    to: '/settings/members',
    onSelect: () => {
      open.value = false
    }
  }, {
    label: 'Notifications',
    to: '/settings/notifications',
    onSelect: () => {
      open.value = false
    }
  }, {
    label: 'Security',
    to: '/settings/security',
    onSelect: () => {
      open.value = false
    }
  }]
}], [{
  label: 'Feedback',
  icon: 'i-lucide-message-circle',
  to: 'https://github.com/nuxt-ui-templates/dashboard',
  target: '_blank'
}, {
  label: 'Help & Support',
  icon: 'i-lucide-info',
  to: 'https://github.com/nuxt-ui-templates/dashboard',
  target: '_blank'
}]] satisfies NavigationMenuItem[][]

const groups = computed(() => [{
  id: 'links',
  label: 'Go to',
  items: links.flat()
}, {
  id: 'code',
  label: 'Code',
  items: [{
    id: 'source',
    label: 'View page source',
    icon: 'i-simple-icons-github',
    to: `https://github.com/nuxt-ui-templates/dashboard/blob/main/app/pages${route.path === '/' ? '/index' : route.path}.vue`,
    target: '_blank'
  }]
}])

onMounted(async () => {
  const cookie = useCookie('cookie-consent')
  if (cookie.value === 'accepted') {
    return
  }

  toast.add({
    title: 'We use first-party cookies to enhance your experience on our website.',
    duration: 0,
    close: false,
    actions: [{
      label: 'Accept',
      color: 'neutral',
      variant: 'outline',
      onClick: () => {
        cookie.value = 'accepted'
      }
    }, {
      label: 'Opt out',
      color: 'neutral',
      variant: 'ghost'
    }]
  })
})
</script>

<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar
      id="default"
      v-model:open="open"
      collapsible
      resizable
      class="bg-elevated/25"
      :ui="{ footer: 'lg:border-t lg:border-default' }"
    >
      <template #header="{ collapsed }">
        <TeamsMenu :collapsed="collapsed" />
      </template>

      <template #default="{ collapsed }">
        <UDashboardSearchButton :collapsed="collapsed" class="bg-transparent ring-default" />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[0]"
          orientation="vertical"
          tooltip
          popover
        />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[1]"
          orientation="vertical"
          tooltip
          class="mt-auto"
        />
      </template>

      <template #footer="{ collapsed }">
        <UserMenu :collapsed="collapsed" />
      </template>
    </UDashboardSidebar>

    <UDashboardSearch :groups="groups" />

    <slot />

    <NotificationsSlideover />
  </UDashboardGroup>
</template>
