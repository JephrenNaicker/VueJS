<template>
   <div>
      Add Recipe
   </div>
   <form @submit.prevents="addRecipe">
      <button type="submit">Add</button>
   </form>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';


const router = useRouter();
//we adding a new path for each recipe added
const addRecipe = ()=>{
   router.push({name:'recipe',
   params:{
   id: 1
   }})
}

</script>