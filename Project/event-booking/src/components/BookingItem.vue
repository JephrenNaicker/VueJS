<template>
    <SelectionCard>
        <div class="flex justify-between">
            <div>{{ title }}</div>
            <RoundButton style-variant="danger">Cancel</RoundButton>
        </div>
    </SelectionCard>
</template>

<script setup>
import RoundButton from './RoundButton.vue';
import SelectionCard from './SelectionCard.vue';

defineProps({
    title : String
});
</script>