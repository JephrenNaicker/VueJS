<template>
    <div>
        <h2 class="text-2xl mb-4">Notification</h2>
        <form class="space-y-4 mx-auto"  @submit.prevent="save">
            <div class="flex items-center gap-2">
                <label>Email notifications: </label>
                <input type="checkbox" v-model="notifications.email"/>
            </div>
  
            <div class="flex items-center gap-2">
                <label>SMS Notifications: </label>
                <input type="checkbox" v-model="notifications.sms"/>
            </div>
            <button type="submit" class="btn-primary">Save</button>
        </form>
    </div>
</template>


<script setup lang="ts">
import { useNotifications } from '@/composables/useNotifications';
import { useSettings } from '@/composables/useSettings';
import { ref } from 'vue';

const {notifications} = useSettings();
const{addNotification} =useNotifications();
const save = ()=>
{
    addNotification(`Settings was saved`);
}
</script>