

<template>
  <main class="container mx-auto my-8 space-y-8">
   <h1 class="text-4xl">
    Event Booking App
   </h1>
   <h2 class="text-2xl font-medium">All Events</h2>
<section class="grid grid-cols-2 gap-8">
  <EventCard v-for="(item,Index) in allEventArray" :key="item.id" 
   title= {{ item.title }}
  when= {{ item.when }}
  description= {{ item.description }}
  @register="console.log('Register')"/>

</section>
   <h2 class="text-2xl font-medium">Your Bookings</h2>
   <section class="grid grid-cols-1 gap-4">
    <BookingItem v-for="(i in 8)" :key="i">

   </BookingItem>
   </section>
  
  </main>
</template>

<script setup>
import BookingItem from './components/BookingItem.vue';
import EventCard from './components/EventCard.vue';
const allEventArray = ref([]);

allEventArray =({
id:1,
title:'Rail Conference',
when :'2024-05-20',
description :'Join Us on this insightful talks'
},
{
  id:2,
title:'Vue Conference',
when :'2024-11-01',
description :'Join Us on this insightful talks' 
},
{
id:3,
title:'PHP Conference',
when :'2024-11-20',
description :'Join Us on this insightful talks'
}
,
{
id:4,
title:'Rust Conference',
when :'2024-07-05',
description :'Join Us on this insightful talks'
});


return allEventArray
</script>