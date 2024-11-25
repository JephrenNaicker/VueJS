<template>
 <button :class="['text-sm font-medium rounded-full px-3 py-1', styleVariants[styleVariant] ?? styleVariants.default]" 
         @click="$emit('click')">
 <slot></slot>
 </button>
</template>

<script setup>

const styleVariants = {
    default:' border border-gray-200 hover:bg-gray-200 ',
    danger:'bg-red-200 enabled:hover:bg-red-100 text-red-900'
}

defineEmits(['click']);
defineProps({
styleVariant: {
    type:String,
    default: 'default'

}
});
</script>