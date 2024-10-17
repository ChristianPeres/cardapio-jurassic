<script lang="ts">
import Modal from '@/components/Modal.vue';
import  litrao from "/bebidas/litrao.png"


interface Card {
  title: string;
  nome: string;
  image: string;
  address: string;
  schedule: string;
  phone: string;
  services?: string[];  
}

export default {
  components: {
    Modal
  },
  data() {
    return {
      cards: [
        {
          title: "Bebidas",
          nome: "Litrao",
          image: litrao,
          address: "teste",
          services: ["sla,so to deixando isso aq pra n ficar feio no modal"],
          schedule: 'teste',
          phone: 'teste'
        },
        {
          title: "Bebidas",
          nome: "Litrao",
          image: litrao,
          address: "teste",
          services: ["sla,so to deixando isso aq pra n ficar feio no modal"],
          schedule: 'teste',
          phone: 'teste'
        },
        {
          title: "Bebidas",
          nome: "Litrao",
          image: litrao,
          address: "teste",
          services: ["sla,so to deixando isso aq pra n ficar feio no modal"],
          schedule: 'teste',
          phone: 'teste'
        },
        {
          title: "Bebidas",
          nome: "Litrao",
          image: litrao,
          address: "teste",
          services: ["sla,so to deixando isso aq pra n ficar feio no modal"],
          schedule: 'teste',
          phone: 'teste'
        },
      ] as Card[],
      currentIndex: 0,
      showModal: false,
      selectedCard: null as Card | null,
      isMobile: false,
      startX: 0,
      endX: 0,
      
    };
  },
  computed: {
    maxIndex() {
      return Math.max(this.cards.length - this.visibleCardsCount, 0);
    },
    cardWidth() {
      return this.isMobile ? 100 : 33.33;
    },
    visibleCardsCount() {
      return this.isMobile ? 1 : 3;
    }
  },
  methods: {
    handleResize() {
      this.isMobile = window.matchMedia('(max-width: 640px)').matches;
    },
    nextCard() {
      if (this.currentIndex < this.maxIndex) {
        this.currentIndex += 1;
      }
    },
    prevCard() {
      if (this.currentIndex > 0) {
        this.currentIndex -= 1;
      }
    },
    openModal(card: Card) {
      this.selectedCard = card;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedCard = null;
    },
    // Eventos de toque
    handleTouchStart(e) {
      this.startX = e.touches[0].clientX; // Captura a posição inicial do toque
    },
    handleTouchMove(e) {
      this.endX = e.touches[0].clientX; // Atualiza a posição final do toque conforme o usuário move o dedo
    },
    handleTouchEnd() {
      const threshold = 50; // Define o limite mínimo para considerar um "deslizar"
      if (this.startX - this.endX > threshold) {
        // Se deslizou para a esquerda
        this.nextCard();
      } else if (this.endX - this.startX > threshold) {
        // Se deslizou para a direita
        this.prevCard();
      }
    },
  },
  mounted() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);

    // Adiciona os eventos de toque no contêiner do carrossel
    const carousel = this.$refs.carousel;
    if (carousel) {
      carousel.addEventListener('touchstart', this.handleTouchStart);
      carousel.addEventListener('touchmove', this.handleTouchMove);
      carousel.addEventListener('touchend', this.handleTouchEnd);
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);

    // Remove os eventos de toque
    const carousel = this.$refs.carousel;
    if (carousel) {
      carousel.removeEventListener('touchstart', this.handleTouchStart);
      carousel.removeEventListener('touchmove', this.handleTouchMove);
      carousel.removeEventListener('touchend', this.handleTouchEnd);
    }
  }
};
</script>

<template>
    <main class="w-full md:w-full py-12 relative flex justify-center">
      <div class="relative w-full overflow-hidden">
        <h1 class="md:text-left text-center text-5xl mb-9 md:text-5xl font-semibold text-bg-custom-green mx-4 md:mx-16 text-shadow-md">
            Petiscos Jurassic
        <span class="absolute left-0 w-full h-1 bg-bg-custom-yellow mt-2"></span>
        </h1>

        <div ref="carousel" class="flex items-center gap-2">
          <button
            @click="prevCard"
            :disabled="currentIndex === 0"
            class="z-10 text-5xl text-white rounded-full p-2 hover:bg-gray-200 disabled:opacity-50"
          > 
            &lt;
          </button>
          <div
            class="flex overflow-hidden gap-2"
          >
          <div
              class="flex transition-transform duration-500 ease-in-out"
              :style="{
              transform: `translateX(-${currentIndex * (isMobile ? 100 : 33)}%)`,
              width: `calc(${(100 * (isMobile ? 6 : 4)) / (isMobile ? 6 : 3)}%)`
            }"
            >
        <div
              @click="openModal(card)"
              v-for="(card, index) in cards"
              :key="index"
              class="w-full md:w-1/3 lg:w-1/3 px-4 flex-shrink-0 mx-2 md:mx-0"
              :style="{ width: `${cardWidth}%`,
              margin: `0 auto`
               }"
            >
            <div class="p-0 rounded-lg shadow-lg bg-white overflow-hidden">
              <img
                class="w-full max-w-[500px] h-[300px] object-fill"
                :src="card.image"
                alt=""
              />
                <div class="bg-black-800 p-2  text-sm min-h-[300  px] max-h-[350px] overflow-y-auto md:overflow-hidden">
                  <h3 class="text-xl font-bold text-bg-custom-green ">
                    {{ card.title }}
                  </h3>
                  <h4 class="text-3xl font-bold text-bg-custom-green mb-4">
                    {{ card.nome }}
                  </h4>
                  <p class="text-bg-dark text-base ">{{ card.address }}</p>
                  <p class="text-lg">
                  <span class="font-bold">teste:</span>
                    <br v-if="card.schedule.includes('<br>')" />
                    <span v-html="card.schedule"></span>
                  </p>
                  <p class="mb-4 mt-2 text-lg">Fone: {{ card.phone }}</p>
                  <button
                    @click="openModal(card)"
                    class="flex px-14 bg-bg-button rounded justify-center py-1 gap-2 items-center font-semibold text-white hover:opacity-85 mb-2 mx-auto">
                    
                    <span v-html="icon_mais(20, '#ffff')"></span>
                    Saiba Mais
                  </button>
                </div>
              </div>
          </div>
        </div>
      </div>
      <button
          @click="nextCard"
          :disabled="currentIndex === maxIndex"
          class=" text-5xl text-white rounded-full p-2 hover:bg-gray-100 disabled:opacity-50"
        >
          &gt;
        </button>
                </div>
        </div>
    </main>
    <Modal
      :card="selectedCard"
      :show="showModal"
      @close="closeModal"
    />
</template>

