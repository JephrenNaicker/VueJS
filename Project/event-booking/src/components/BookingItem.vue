<template>
    <SelectionCard>
        <div class="flex justify-between">
            <div>{{ title }}</div>
            <div><component :is="icon" :class = "{'animate-spin': pending}"/></div>
            <RoundButton style-variant="danger" @click="$emit('cancel')">Cancel</RoundButton>
        </div>
    </SelectionCard>
</template>

<script setup>
import { computed } from 'vue';
import RoundButton from './RoundButton.vue';
import SelectionCard from './SelectionCard.vue';
import {RefreshCcwDot,Check} from 'lucide-vue-next'

const props = defineProps({
    title : String,
    status: String,
});
const pending = computed(()=>props.status ==='pending');
const icon = computed(()=>pending.value ? RefreshCcwDot : Check);

defineEmits([
    'cancel']);
</script>