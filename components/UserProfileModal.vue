<script setup lang="ts">
import { UAvatar, UButton, UCard, UContainer, UInput, UModal, USelect, UTooltip } from '#components';
import { reactive, ref, watch } from 'vue';

const colorMode = useColorMode()
const { state, update, getError, logout } = useAuth();
const toast = useToast()
const router = useRouter()

const isOpen = ref(false);
const isEditing = ref(false);

interface ThemeOption {
    label: string;
    value: string;
}

const themeOptions: ThemeOption[] = [
    { label: 'Claro', value: 'light' },
    { label: 'Escuro', value: 'dark' },
    { label: 'Sistema', value: 'system' },
];

function handleThemeToggle(value: ThemeOption) {
    colorMode.preference = value.value;
}

const themeMode = ref(themeOptions.find(o => o.value === colorMode.preference));

function getThemeIcon(theme: string) {
    switch (theme) {
        case 'dark':
            return 'mdi:moon-and-stars'
        case 'light':
            return 'mdi:white-balance-sunny'
        default:
            return "mdi:laptop";
    }
}

// Form model
const form = reactive({
    first_name: '',
    last_name: '',
    birth_date: '',
    phone: '',
    gender: '',
});

// Sync form with user data when modal opens
watch(isOpen, (value) => {
    if (value && state.value.user) {
        form.first_name = state.value.user.first_name;
        form.last_name = state.value.user.last_name;
        form.birth_date = state.value.user.birth_date;
        form.phone = state.value.user.phone ?? '';
        form.gender = state.value.user.gender ?? '';
        isEditing.value = false;
    }
});

async function updateUser() {
    await update(form)

    const error = getError()
    if (error) {
        toast.add({ title: 'Algo deu errado!', description: 'Não foi possível atualizar as informações', color: 'error' })
        isEditing.value = false;
        return;
    }

    toast.add({ title: 'Tudo certo!', description: 'Dados atualizados com sucesso!', color: 'success' })
    isEditing.value = false;
};

async function logoutUser() {
    await logout();
    router.push("/login/");
}
</script>

<template>
    <div class="flex items-start gap-4">
        <UButton color="primary" variant="ghost" @click="isOpen = true">
            <UAvatar :src="state.user?.avatar_url" :alt="`${state.user?.first_name} ${state.user?.last_name}`"
                size="md" />
        </UButton>
    </div>

    <UModal v-model:open="isOpen" title="Perfil do usuário" description="Informações do usuário">
        <template #header>
            <div class="flex items-center justify-between w-full gap-4">
                <div class="flex items-center gap-4">
                    <UAvatar :src="state.user?.avatar_url" :alt="`${state.user?.first_name} ${state.user?.last_name}`"
                        size="lg" />
                    <div>
                        <div class="font-semibold text-lg">
                            {{ state.user?.first_name }} {{ state.user?.last_name }}
                        </div>
                        <div class="flex items-center gap-1 text-xs text-muted">
                            <span>{{ state.user?.email }}</span>
                            <UTooltip v-if="state.user?.email_verified" class="text-success flex items-center"
                                text="Verificado">
                                <Icon name="mdi:verified" size="14" />
                            </UTooltip>
                        </div>
                    </div>
                </div>

                <div class="flex gap-2">
                    <ClientOnly v-if="!colorMode?.forced && !isEditing">
                        <USelectMenu v-model="themeMode" :items="themeOptions" :search-input="false"
                            class="oe-ring-primary text-primary w-30" @update:model-value="handleThemeToggle">
                            <template #item="{ item }">
                                <div class="flex gap-2 justify-between w-full cursor-pointer">
                                    <div class="flex gap-2 w-full">
                                        <UIcon :name="getThemeIcon(item.value)" />
                                        {{ item.label }}
                                    </div>
                                    <UIcon v-if="item.value === colorMode.preference" name="mdi:check" />
                                </div>
                            </template>
                        </USelectMenu>
                    </ClientOnly>
                    <UButton :icon="isEditing ? 'mdi:close' : 'mdi:edit'" variant="outline"
                        @click="isEditing = !isEditing" />
                    <UButton v-if="!isEditing" icon="mdi:logout" variant="outline" @click="logoutUser" />
                </div>
            </div>
        </template>

        <template #body>
            <UContainer class="p-0 sm:p-0 lg:px-0">
                <div class="space-y-6">
                    <!-- Personal Info -->
                    <UCard>
                        <template #header>
                            <h3 class="text-lg font-semibold">Informações Pessoais</h3>
                        </template>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div>
                                <span>Nome</span>
                                <div v-if="!isEditing" class="text-sm text-muted">
                                    {{ state.user!.first_name }} {{ state.user!.last_name }}
                                </div>
                                <div v-else class="flex gap-2">
                                    <UInput v-model="form.first_name" placeholder="Nome" />
                                    <UInput v-model="form.last_name" placeholder="Sobrenome" />
                                </div>
                            </div>
                            <div>
                                <span>Data de Nascimento</span>
                                <div v-if="!isEditing" class="text-sm text-muted">
                                    {{ new Date(state.user!.birth_date).toLocaleDateString() }}
                                </div>
                                <div v-else>
                                    <UInput v-model="form.birth_date" type="date" />
                                </div>
                            </div>
                            <div>
                                <span>Telefone</span>
                                <div v-if="!isEditing" class="text-sm text-muted">
                                    {{ state.user?.phone || '---' }}
                                </div>
                                <div v-else>
                                    <UInput v-model="form.phone" placeholder="Telefone" />
                                </div>
                            </div>
                            <div>
                                <span>Gênero</span>
                                <div v-if="!isEditing" class="text-sm text-muted">
                                    {{ state.user?.gender || '---' }}
                                </div>
                                <div v-else>
                                    <USelect v-model="form.gender" placeholder="Selecione" :items="[
                                        { label: 'Masculino', value: 'Male' },
                                        { label: 'Feminino', value: 'Famale' },
                                        { label: 'Outro', value: 'Other' },
                                    ]" />
                                </div>
                            </div>
                        </div>
                    </UCard>

                    <!-- Work Info -->
                    <UCard>
                        <template #header>
                            <h3 class="text-lg font-semibold">Trabalho</h3>
                        </template>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div>
                                <span>Posição</span>
                                <div class="text-sm text-muted">
                                    {{ state.user?.title_position || '---' }}
                                </div>
                            </div>
                            <div>
                                <span>Departamento</span>
                                <div class="text-sm text-muted">
                                    {{ state.user?.department || '---' }}
                                </div>
                            </div>
                        </div>
                    </UCard>
                </div>
            </UContainer>
        </template>

        <template #footer>
            <div class="flex justify-end w-full gap-2">
                <UButton v-if="isEditing" loading-auto color="primary" variant="solid" @click="updateUser">
                    Salvar
                </UButton>
                <UButton v-if="isEditing" color="primary" variant="outline" @click="isEditing = false">
                    Cancelar
                </UButton>
                <UButton v-else color="primary" variant="solid" @click="isOpen = false">
                    Fechar
                </UButton>
            </div>
        </template>
    </UModal>
</template>
