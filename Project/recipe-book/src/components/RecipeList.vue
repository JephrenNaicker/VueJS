<template>
    <div>
        <nav v-if="recipes.length > 0">
      <ul>
        <li v-for="recipe in recipes" key:recipe.id>
          <RouterLink :to="{name:'recipe', params:{id:recipe.id}}">
            {{ recipe.name }}
          </RouterLink>
        </li>
        <!-- <li>
          <RouterLink :to="{name:'not-found', }">
              Error
          </RouterLink>
        </li> -->
      </ul>
    </nav>
    <div v-else>
    No recipe Found
    </div>
    </div>
</template>

<script setup lang="ts">

import { RouterLink } from 'vue-router';
import { useRecipeStore, type Recipe } from '@/stores/recipe';
import { ref } from 'vue';

defineProps<{
    recipes: Recipe[]
}>();

</script>