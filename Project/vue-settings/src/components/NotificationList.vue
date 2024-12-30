<template>
    <Teleport to="body">
        <ol class="notification-list">
            <li v-for="note in notifications" :key="note.id"  class="notification-item">
                <div class=" text-sm font-semibold">
                    {{ note.message }}
        <button @click="removeNotification(note.id)" class="notification-ack-button">

        </button>
                </div>
            </li>
        </ol>

    </Teleport>
</template>

<script lang="ts">
import { useNotifications } from '@/composables/useNotifications';



const {notifications,removeNotification} = useNotifications();


</script>