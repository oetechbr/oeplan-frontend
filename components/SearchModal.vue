<script setup lang="ts">
const searchTerm = ref('')

const { data: users, status: usersStatus } = await useFetch('https://jsonplaceholder.typicode.com/users', {
  key: 'command-palette-users',
  params: { q: searchTerm },
  transform: (data: { id: number, name: string, email: string }[]) => {
    return data?.map(user => ({ id: user.id, label: user.name, suffix: user.email, avatar: { src: `https://i.pravatar.cc/120?img=${user.id}` } })) || []
  },
  lazy: true
})

const { data: todos, status: todosStatus } = await useFetch('https://jsonplaceholder.typicode.com/todos', {
  key: 'command-palette-todos',
  params: { q: searchTerm },
  transform: (data: { id: number, title: string, completed: boolean }[]) => {
    return data?.map(todo => ({ id: todo.id, label: todo.title, suffix: todo.completed.toString() })) || []
  },
  lazy: true
})

const groups = computed(() => [{
  id: 'users',
  label: searchTerm.value ? `Users matching “${searchTerm.value}”...` : 'Users',
  items: users.value || [],
  ignoreFilter: true
}, {
  id: 'todos',
  label: searchTerm.value ? `Todos matching “${searchTerm.value}”...` : 'Todos',
  items: todos.value || [],
  ignoreFilter: true,
}])
</script>

<template>
  <UModal>
    <UButton variant="outline" icon="i-lucide-search" class="h-min" />

    <template #content>
      <UCommandPalette v-model:search-term="searchTerm" title="Search"
        :loading="usersStatus === 'pending' && todosStatus === 'pending'" :groups="groups" placeholder="Search..."
        class="h-full" />
    </template>
  </UModal>
</template>
