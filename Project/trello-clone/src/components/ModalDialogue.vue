<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" roles="dialog" aria-modal="true"
        v-if="isOpen" @keydown.esc="emit('close')" ref="modalElement" @click="emit('close')" >
        <div class="bg-white p-5 rounded max-w-md w-full">
            <h2 class="text-xl font-bold mb-4">Add New Card</h2>
            <input type="text" placeholder="Card Title" aria-label="Card Title" class="w-fill p-2 mb-4 broader rounded"
                ref="titleInput"/>
            <textarea name="CardDescription" id="CardDescription" class="w-full p-2 mb-4 border rounded">
        </textarea>
            <div class="flex justify-end gap-2">
                <button class="bg-gray-300 hover:bg-gray-200 text-black px-4 py-2 rounded"
                    @click="emit('close')">Cancel</button>
                <button class="bg-blue-300 hover:bg-blue-200 text-white px-4 py-2 rounded">Save</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'

const modalElement = ref<HTMLDivElement|null>(null);
const {activate, deactivate } = useFocusTrap(modalElement)

const titleInput = ref<HTMLInputElement | null>(null)


const props = defineProps<{
    isOpen: boolean
}>()


const emit = defineEmits<{
    (e: 'close'): void
}>()


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