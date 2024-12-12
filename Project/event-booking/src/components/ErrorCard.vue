<template>
 <SectionCard>
            <div class="space-y-4 items-center flex flex-col">
                <div class="text-red-500">
                    <slot/>
                </div>
                <RoundButton v-if="retry" @click="retry" >Retry now</RoundButton>
            </div>
        </SectionCard>
</template>

<script setup>
import RoundButton from './RoundButton.vue';
import SectionCard from './SectionCard.vue';
defineProps = ({
    retry : {
        type:Function,
        require:false
    }

    });
</script>