<script lang="ts">
import * as icon from '../utils/icons'

export default {
  name: 'Modal',
  props: {
  card: {
    type: Object as PropType<Card | null>,
    required: true,
    default: null  // Adicione um valor padrão
  },
  show: {
    type: Boolean,
    required: true
  }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }
};
</script>

<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center z-50">
  <div class="absolute inset-0 bg-gray-800 opacity-50" @click="$emit('close')"></div>
  <div class="relative bg-[#FAFAFA] flex flex-col md:flex-row shadow-md mt-10 rounded-2xl overflow-hidden w-full md:max-w-7xl h-full max-h-[70vh] md:h-auto md:max-h-[90vh]">
    <div class="text-center md:text-left flex-1 p-4 md:p-8 flex flex-col overflow-y-auto">
      <div class="px-2 md:px-6">
      <h2 class="text-4xl font-bold text-bg-black">{{ card.title }}</h2>
      <h2 class="text-6xl font-bold text-bg-black mb-2">{{ card.nome }}</h2>
    </div>
      <div>
      <ul class="grid grid-cols-1 text-left gap-x-18 list-disc p-6 text-2xl">
        <li v-for="(service, index) in card.services" :key="index" class="service-item mb-4">
            {{ service }}
          </li>
      </ul>
    </div>
    <div class="mt-auto pt-4">
        <div class="flex py-1 gap-2 items-start">
          <span v-html="icon_relogio(25,'black')"></span>
          <p class="text-[#000] font-base text-2xl">
            <span class="font-bold mb-20 ">Horário de funcionamento:</span>
            <br v-if="card.schedule.includes('<br>')" />
            <span v-html="card.horario"></span>
          </p>
        </div>
      </div>
      <button
        @click="$emit('close')"
        class="absolute top-6 right-8 font-bold hover:bg-gray-200 hover:text-black"
      >
        <span v-html="icon_fechar(40, 'black')"></span>
      </button>
    </div>
    <div class="flex justify-center md:justify-center md:flex-1">
        <img class="w-full h-[100%] hidden md:block object-fill rounded-r-lg p-2" :src="card.image" alt="" />
    </div>
    </div>
  </div>
</template>
<style scoped>
body.modal-open {
  overflow: hidden;
}
.modal-content {
  max-height: 80vh;
  overflow-y: auto;
}
</style>