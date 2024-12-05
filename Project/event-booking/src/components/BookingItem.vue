<template>
    <SectionCard>
        <div class="flex justify-between">
            <div>{{ title }}</div>
            <div><component :is="icon" :class="{ 'animate-spin': pending }" /></div>
            <RoundButton style-variant="danger" @click="$emit('cancel')">Cancel</RoundButton>
        </div>
    </SectionCard>
</template>

<script setup>
import { computed } from 'vue';
import RoundButton from './RoundButton.vue';
import SectionCard from './SectionCard.vue';
import {LoaderCircle,Check} from 'lucide-vue-next'
   //RefreshCcwDot
const props = defineProps({
    title : String,
    status: String,
});
const pending = computed(() => props.status === 'pending');
const icon = computed(() => (pending.value ? LoaderCircle : Check));

defineEmits(['cancel']);
</script>