<template>
    <template v-if="error">
       <ErrorCard :retry="fetchEvents"> Could not load events at the moment. Please try again</ErrorCard>
    </template>
    <template v-else>
        <section class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <template v-if="!loading">
                <template v-if="events.length">
                    <EventCard v-for="(item, index) in events" :key="item.id" :title=item.title :when=item.date
                        :description=item.description @register="handleRegistration(item)" />

                </template>
                <template v-else>
                    <div class="col-span-2">
                        No Event Yet
                    </div>
                </template>

            </template>
            <template v-else>
                <LoadingEventCard v-for="i in 4" :key="i">

                </LoadingEventCard>
            </template>

        </section>
    </template>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import LoadingEventCard from './LoadingEventCard.vue';
import EventCard from './EventCard.vue';
import useBookings from '@/composables/useBookings';
import ErrorCard from './ErrorCard.vue';


const events = ref([]);
const loading = ref(false);
const error = ref(null);
const {handleRegistration } = useBookings();

const fetchEvents = async () => {

    loading.value = true;
    try {
        const response = await fetch('http://localhost:3001/events');
        events.value = await response.json();
        console.log(events.value);
    } catch (e) {
        error.value = e;
    }
    finally {
        loading.value = false;
    }
};

onMounted(() => { fetchEvents() });//check here

</script>