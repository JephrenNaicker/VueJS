<template>
  <SelectionCard>
    <template #header>
      {{ title }}
    </template>
    <template #default>
      {{ when }}
    </template>

    <template #footer>
      <div class="space-y-4">
      <p>{{ description }}</p>
      <div class="flex justify-end">
        <RoundButton label="Register" @click="$emit('register')">
          Register
        </RoundButton>
      </div>
      </div>
    </template>

  </SelectionCard>


</template>

<script setup>
import RoundButton from './RoundButton.vue';
import SelectionCard from './SelectionCard.vue';
defineProps({
  title: String,
  when: String,
  description: String
});

defineEmits(['register'])
</script>