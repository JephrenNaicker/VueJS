import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddRecipeView from '@/views/AddRecipeView.vue'

import RecipeView from '@/views/RecipeView.vue'
import FavoritesView from '@/views/FavoritesView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import EditRecipeView from '@/views/EditRecipeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      alias:['/home'] 
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: FavoritesView
    },
    //redirect
    {
      path: '/favorites',
      redirect: 'favorites'
    },
    {
      path: '/add-recipe',
      name: 'add-recipe',
      component: AddRecipeView
    }
    ,
    {
      path: '/recipe/:id',
      name: 'recipe',
      component: RecipeView,
      alias:'/meal/:id'
    },
    {
      path: '/recipe/:id/edit',
      name: 'edit-recipe',
      component: EditRecipeView,
      
    },
    {
      path: '/:pathMatch(.*)',
      name: 'not-found',
      component: NotFoundView
    }


  ],
})

export default router
