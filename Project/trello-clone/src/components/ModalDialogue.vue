<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" roles="dialog" aria-modal="true"
        v-if="isOpen" @keydown.esc="emit('close')" ref="modalElement" @click.self="emit('close')">
        <div class="bg-white p-5 rounded max-w-md w-full">
            <h2 class="text-xl font-bold mb-4">{{ mode === 'add' ? 'Edit Card' : 'Add New Card' }}</h2>
            <input v-model="localCard.title" type="text" placeholder="Card Title" aria-label="Card Title"
                class="w-fill p-2 mb-4 broader rounded" ref="titleInput" />
            <textarea v-model="localCard.description" name="CardDescription" id="CardDescription"
                class="w-full p-2 mb-4 border rounded">
        </textarea>
            <div class="flex justify-end gap-2">
                <button class="bg-gray-300 hover:bg-gray-200 text-black px-4 py-2 rounded"
                    @click="emit('close')">Cancel</button>
                <button class="bg-blue-300 hover:bg-blue-200 text-white px-4 py-2 rounded"
                    @click="emit('save', localCard)">
                    {{ mode === 'add' ? 'Save' : 'Add' }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import type { Card } from '@/types';

const modalElement = ref<HTMLDivElement | null>(null);
const { activate, deactivate } = useFocusTrap(modalElement)

const titleInput = ref<HTMLInputElement | null>(null)


const props = defineProps<{
    isOpen: boolean,
    card: Card | null,
    mode: 'add' | 'edit'
}>()


const emit = defineEmits<{
    (e: 'close'): void,
    (e: 'save', card: Card): void
}>()

const localCard = ref<Card>({
    id: 0,
    title: '',
    description: ''
});

watch(() => props.card, (newCard) => {
    if (newCard) {
        localCard.value = { ...newCard }
    }
    else {
        localCard.value = { id: 0, title: '', description: '' }
    }
});


watch(() => props.isOpen, async (isOpen) => {
    if (isOpen) {
        await nextTick()
        activate()
        titleInput.value?.focus()
    } else {
        deactivate()
    }
})


</script>