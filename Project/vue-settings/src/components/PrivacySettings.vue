<template>
    <div>
        <h2 class="text-2xl mb-4">Privacy</h2>
        <form class="space-y-4 mx-auto">
            <div class="flex items-center gap-2">
                <label>Search Engine Indexing: </label>
                <input type="checkbox" v-model="privacy.searchEngineIndexing"/>
            </div>

            <div>
                <label>Visibility: </label>
                <select v-model="privacy.visibility">
                    <option value="private">Private</option>
                    <option value="public">Public</option>
                </select>
            </div>
            <button type="submit" class="btn-primary">Save</button>
        </form>
    </div>
</template>


<script setup lang="ts">
import { useSettings } from '@/composables/useSettings';
import { ref } from 'vue';

const {privacy} = useSettings();
</script>