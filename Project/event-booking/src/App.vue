<template>
  <main class="container mx-auto my-8 space-y-8">
    <h1 class="text-4xl">
      Event Booking App
    </h1>
    <h2 class="text-2xl font-medium">All Events</h2>
    <section class="grid grid-cols-2 gap-8">

      <template v-if="!eventsLoading">
        <EventCard  v-for="(item, index) in events" :key="item.id" :title=item.title :when=item.date
        :description=item.description @register="handleRegistration(item)" />
      </template>
     <template v-else>
      <LoadingEventCard v-for="i in 4" :key="i">

</LoadingEventCard>
     </template>

    </section>

    <h2 class="text-2xl font-medium">Your Bookings</h2>
    <section class="grid grid-cols-1 gap-4">
      <template v-if="!bookingLoading">
        <BookingItem v-for="(item,index) in bookings" :key="item.id" :title="item.eventTitle">
      </BookingItem>
      </template>
      <template v-else>
       <LoadingBookingCard v-for="i in 4" :key="i">

       </LoadingBookingCard>
      </template>
     
    </section>

  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BookingItem from './components/BookingItem.vue';
import EventCard from './components/EventCard.vue';
import LoadingEventCard from './components/LoadingEventCard.vue';
import LoadingBookingCard from './components/LoadingBookingCard.vue';

const events = ref([]);
const eventsLoading = ref(false);
const fetchEvents = async () => {
  
  eventsLoading.value = true;
  try {
    const response = await fetch('http://localhost:3001/events');
    events.value = await response.json();
    console.log(events.value);
  } finally {
    eventsLoading.value = false;
  }
};

const handleRegistration = async (event) => {
  const newBooking = {
    id: Date.now().toString(),
    userId: 1,
    eventId: event.id,
    eventTitle: event.title
  };
  await fetch('http://localhost:3001/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...newBooking,
      status: 'confirmed'
    })
  });
};

const bookings = ref([]);
const bookingLoading = ref(false);

const fetchBooking = async() => 
{
  
  bookingLoading.value= true;
 try {
  const response = await fetch('http://localhost:3001/bookings');
  bookings.value = await response.json();
  console.log(bookings.value);
 } finally {
  bookingLoading.value=false;
 }
}


onMounted(() => 
{
fetchEvents(),
fetchBooking()
});
</script>