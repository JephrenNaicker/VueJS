<template>
  <main class="p-5 font-sans">
    <div class="flex gap-5 py-5 overflow-x-auto">
      <div class="bg-gray-100 p-3 rounded-lg min-w-[250px] flex flex-col" v-for="(list, listIndex) in listsArr"
        :key="list.id">
        <h2 class="font-medium mb-2">{{ list.title }}</h2>

        <Draggable :list="list.cards" group="cards" item-key="id ">
          <template #item="{ element }">
            <div class="bg-white p-2 my-2 rounded shadow cursor-pointer" @click="openModal(listIndex,element)">
              <span class="text-sm font-medium">{{ element.title }}</span>
              <p class="text-xs text-gray-400">
                {{ element.description }}
              </p>
            </div>
          </template>
        </Draggable>
        <button
          class="w-full bg-transparent rounded hover:bg-white text-gray-500 p-2 text-left mt-2 text-sm font-medium"
          @click="openModal(listIndex)">
          + Add Card
        </button>
      </div>
    </div>
    <ModalDialogue :is-open="isModalOpen" :card="editCard" :mode="modalMode" @close="closeModal" @save="saveCard">
    </ModalDialogue>
  </main>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import Draggable from 'vuedraggable';
import type { List, Card } from '@/types.ts'
import ModalDialogue from './components/ModalDialogue.vue';


const isModalOpen = ref(false);
const editCard = ref<Card | null>(null);
const editListIndex = ref<number | null>(null);


const modalMode = computed(() => editCard.value !== null ? 'add' : 'edit');

const openModal = (listIndex: number, card?: Card) => {
  editListIndex.value = listIndex;
  isModalOpen.value = true;

  editCard.value = card === undefined ? null : card;
}

const saveCard = ((card: Card) => {
  if (editListIndex.value === null) {
    return;
  }

  if (modalMode.value === 'add') {
    //Adding
    const newId = Math.max(...listsArr.flatMap(list => list.cards.map(c => c.id)));
    listsArr[editListIndex.value].cards.push({
      ...card, id: newId
    })
  }
  else {
    //editing
    const cardIndex = listsArr[editListIndex.value].cards.findIndex((cardOnList => cardOnList.id === card.id));
    if (cardIndex !== -1) {
      listsArr[editListIndex.value].cards[cardIndex] = card;
    }
  }


  closeModal();
})

const closeModal = () => {
  isModalOpen.value = false;
  editListIndex.value = null;
  editCard.value = null;
}

const listsArr = reactive<List[]>([
  {
    id: 1,
    title: 'To Do',
    cards: [
      { id: 1, title: 'Task 1', description: 'Description for Task 1' },
      { id: 2, title: 'Task 2', description: 'Description for Task 2' }
    ]
  },
  {
    id: 2,
    title: 'In Progress',
    cards: [
      { id: 3, title: 'Task 3', description: 'Description for Task 3' },
      { id: 4, title: 'Task 4', description: 'Description for Task 4' }
    ]
  },
  {
    id: 3,
    title: 'Done',
    cards: [{ id: 5, title: 'Task 5', description: 'Description for Task 5' }]
  }
]);
</script>