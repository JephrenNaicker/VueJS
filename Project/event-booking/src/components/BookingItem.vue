<template>
    <SelectionCard>
        <div class="flex justify-between">
            <div>{{ title }}</div>
            <div>{{ status }}</div>
            <RoundButton style-variant="danger" @click="$emit('cancel')">Cancel</RoundButton>
        </div>
    </SelectionCard>
</template>

<script setup>
import RoundButton from './RoundButton.vue';
import SelectionCard from './SelectionCard.vue';

defineProps({
    title : String,
    status: String,
});

defineEmits([
    'cancel']);
</script>