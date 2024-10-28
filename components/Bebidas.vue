<script lang="ts">
import Modal from "@/components/Modal.vue";
import litrao from "/bebidas/litrao.png";
import longneck from "/bebidas/longneck.jpeg";
import seiscentos from "/bebidas/seiscentos.jpeg";
import drinks2 from "/bebidas/drinks2.jpeg";

interface Card {
  title: string;
  nome: string;
  image: string;
  address: string;
  schedule: string;
  services?: string[];
  horario: string;
}

export default {
  components: {
    Modal,
  },
  data() {
    return {
      cards: [
        {
          title: "Bebidas",
          nome: "Litrao",
          image: litrao,
          address: "Av. Samaúma, 1181 - Monte das Oliveiras",
          services: [
            "Antartica R$ 15,00",
            "Skol R$ 15,00",
            "Bohemia R$ 15,00",
            "Amstel R$ 15,00",
          ],
          schedule: "R$ 15,00 ",
          horario: " das 18h ás 03h",
        },
        {
          title: "Bebidas",
          nome: "600ml",
          image: seiscentos,
          address: "Av. Samaúma, 1181 - Monte das Oliveiras",
          services: ["Antártica original R$ 15,00", "Spaten R$ 15,00"],
          schedule: "R$ 15,00",
          horario: "das 18h ás 03h",
        },
        {
          title: "Bebidas",
          nome: "Long Neck",
          image: longneck,
          address: "Av. Samaúma, 1181 - Monte das Oliveiras",
          services: [
            "Heineken R$ 13,00",
            "Corona R$ 13,00",
            "budweiser R$ 10,00",
            "Skarloff Ice R$ 10,00",
          ],
          schedule: "10,00 R$",
          horario: "Bar aberto das 18h ás 03h",
        },
        {
          title: "Bebidas",
          nome: "Drinks",
          image: drinks2,
          address: "Av. Samaúma, 1181 - Monte das Oliveiras",
          services: [
            "Caipirinha R$ 13,00",
            "Caipiroska R$ 15,00",
            "Caipifruta R$ 20,00",
            "Gin Tonica R$ 25,00",
            "Gin Tropical R$ 35,00",

          ],
          schedule: "R$ 13,00",
          horario: "Bar aberto das 18h ás 03h",
        },
      ] as Card[],
      isMobile: false,
      currentIndex: 0,
      isNavigating: false,
      startX: null,
      endX: null,
      isMoving: false,
      showModal: false,
      selectedCard: null,
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
    },
  },
  methods: {
    handleResize() {
      this.isMobile = window.matchMedia("(max-width: 640px)").matches;
    },

    nextCard() {
      if (this.currentIndex < this.maxIndex && !this.isNavigating) {
        this.isNavigating = true;
        this.currentIndex += 1;
        setTimeout(() => {
          this.isNavigating = false;
        }, 300);
      }
    },

    prevCard() {
      if (this.currentIndex > 0 && !this.isNavigating) {
        this.isNavigating = true;
        this.currentIndex -= 1;
        setTimeout(() => {
          this.isNavigating = false;
        }, 300);
      }
    },

    openModal(card, event) {
      // Só abre o modal se não houver movimento de swipe
      if (!this.isMoving) {
        if (event) {
          event.stopPropagation();
          event.preventDefault();
        }
        this.selectedCard = card;
        this.showModal = true;
      }
    },

    closeModal() {
      this.showModal = false;
      this.selectedCard = null;
    },

    // Eventos de toque
    handleTouchStart(e) {
      this.startX = e.touches[0].clientX;
      this.isMoving = false; // Reset do estado de movimento
    },

    handleTouchMove(e) {
      this.endX = e.touches[0].clientX;
      this.isMoving = true; // Indica que houve movimento
    },

    handleTouchEnd() {
      const threshold = 50;
      if (this.isMoving) {
        // Só processa o swipe se houve movimento
        if (this.startX - this.endX > threshold) {
          this.nextCard();
        } else if (this.endX - this.startX > threshold) {
          this.prevCard();
        }
      }
      // Reset dos valores
      this.startX = null;
      this.endX = null;
      this.isMoving = false;
    },
  },

  mounted() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);

    const carousel = this.$refs.carousel;
    if (carousel) {
      carousel.addEventListener("touchstart", this.handleTouchStart);
      carousel.addEventListener("touchmove", this.handleTouchMove);
      carousel.addEventListener("touchend", this.handleTouchEnd);
    }
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);

    const carousel = this.$refs.carousel;
    if (carousel) {
      carousel.removeEventListener("touchstart", this.handleTouchStart);
      carousel.removeEventListener("touchmove", this.handleTouchMove);
      carousel.removeEventListener("touchend", this.handleTouchEnd);
    }
  },
  
};
</script>

<template>
  <main class="w-full md:w-full py-12 relative flex justify-center">
    <div class="relative w-full overflow-hidden">
      <h1
        class="md:text-left text-center text-5xl mb-9 md:text-5xl font-semibold text-bg-custom-green mx-4 md:mx-16 text-shadow-md"
      >
        Bebidas Jurassic
        <span
          class="absolute left-0 w-full h-1 bg-bg-custom-yellow mt-2"
        ></span>
      </h1>

      <div ref="carousel" class="flex items-center gap-2">
        <button
          @click="prevCard"
          :disabled="currentIndex === 0"
          class="z-10 text-5xl text-white rounded-full p-2 hover:bg-gray-200 disabled:opacity-50"
        >
          &lt;
        </button>
        <div class="flex overflow-hidden gap-2">
          <div
            class="flex transition-transform duration-500 ease-in-out"
            :style="{
              transform: `translateX(-${
                currentIndex * (isMobile ? 100 : 33)
              }%)`,
              width: `calc(${
                (100 * (isMobile ? 6 : 4)) / (isMobile ? 6 : 3)
              }%)`,
            }"
          >
            <div
              @click.stop="openModal(card, $event)"
              v-for="(card, index) in cards"
              :key="index"
              class="w-full md:w-1/3 lg:w-1/3 px-4 flex-shrink-0 mx-2 md:mx-0"
              :style="{ width: `${cardWidth}%`, margin: `0 auto` }"
            >
              <div class="p-0 rounded-lg shadow-lg bg-white overflow-hidden">
                <img
                  class="w-full max-w-[500px] h-[350px] object-fill"
                  :src="card.image"
                  alt=""
                />
                <div
                  class="bg-black-800 p-2 text-sm min-h-[300 px] max-h-[350px] overflow-y-auto md:overflow-hidden"
                >
                  <h3 class="text-xl font-bold text-bg-black">
                    {{ card.title }}
                  </h3>
                  <h4 class="text-3xl font-bold text-bg-black mb-4">
                    {{ card.nome }}
                  </h4>
                  <p class="text-bg-dark text-base mb-6">{{ card.address }}</p>
                  <p class="text-lg mb-4">
                    <span class="font-bold">Valor: </span>
                    <br v-if="card.schedule.includes('<br>')" />
                    <span v-html="card.schedule"></span>
                  </p>
                  <button
                    @click="openModal(card, $event)"
                    class="flex px-16 bg-bg-button rounded justify-center py-2 gap-2 items-center font-semibold text-white hover:opacity-85 mb-2 mx-auto"
                  >
                    <span v-html="icon_mais(20, '#ffff')"></span>
                    Aperte aqui
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          @click="nextCard"
          :disabled="currentIndex === maxIndex"
          class="text-5xl text-white rounded-full p-2 hover:bg-gray-100 disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    </div>
  </main>
  <Modal :card="selectedCard" :show="showModal" @close="closeModal" />
</template>

