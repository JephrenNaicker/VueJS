<template>
  <main class="container mx-auto my-8 space-y-8">
    <h1 class="text-4xl">
      Event Booking App
    </h1>
    <h2 class="text-2xl font-medium">All Events</h2>
   <EventList @register="handleRegistration($event)">

   </EventList>

    <h2 class="text-2xl font-medium">Your Bookings</h2>
    <section class="grid grid-cols-1 gap-4">
      <template v-if="!bookingLoading">
        <BookingItem v-for="(item,index) in bookings" :key="item.id" 
        :title="item.eventTitle"
        :status="item.status"
        @cancel="cancelBooking(item.id)">
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
import LoadingBookingCard from './components/LoadingBookingCard.vue';
import EventList from './components/EventList.vue';



const handleRegistration = async (event) => {
 
  if(bookings.value.some(
  b =>b.eventId ===event.id && b.userId ===1 && b.status==='pending'
))
{
  alert('Booking Pending');
  return;
}


  if(bookings.value.some(
  b =>b.eventId ===event.id && b.userId ===1
))
{
  alert('Already Booked');
  return;
}

  const newBooking = {
    id: Date.now().toString(),
    userId: 1,
    eventId: event.id,
    eventTitle: event.title,
    status:'pending'
  };
  
  bookings.value.push(newBooking);
 try {
 const response = await fetch('http://localhost:3001/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...newBooking,
      status: 'confirmed'
    })
  });

  if(response.ok)
  {
    const index = bookings.value.findIndex(b =>b.id===newBooking.id);
    bookings[index] = await response.json();
  }
  else {
    //have a pop up ?
    throw new Error('Failed to confirm booking')
  }
 } catch (error) {
  console.error('failed to confirm booking',error);
  bookings.value = bookings.value.filter(b=>b.id !== newBooking.id);
 }
  
};

const bookings = ref([]);
const bookingLoading = ref(false);

const fetchBooking = async() => 
{
  
  bookingLoading.value = true;
 try {
  const response = await fetch('http://localhost:3001/bookings');
  bookings.value = await response.json();
  console.log(bookings.value);
 } finally {
  bookingLoading.value=false;
 }
}

const findBookingById = (bookingId) =>{
  bookings.value.findIndex(b=>b.id === bookingId);
}

const cancelBooking = async (bookingId) => {
 const index = findBookingById(bookingId);
 const originalBooking = bookings.value[index];

 try {
  bookings.value.splice(index,1);
  const response = await fetch(`http://localhost:3001/bookings/${index}`,{
    method : 'DELETE'
  });

  if(!response.ok)
  {
    throw new Error('Booking could not be cancelled')
  }
 } catch (error) {
  console.error('failed to cancel booking');
  bookings.value.splice(index,0,originalBooking);
 }

};



onMounted(() => 
{
fetchBooking()
});
</script>