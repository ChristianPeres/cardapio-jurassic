<script setup lang="ts">
import Petiscos from './components/Petiscos.vue';
</script>

<template>
<div class="flex flex-col justify-center items-center max-w-screen-xl mx-auto">
  <div class="w-full flex flex-col justify-center items-center">
    <section>
      <home />
    </section>
    <section class="w-full flex justify-center items-center">
      <Bebidas />
    </section>
    <section class="w-full flex justify-center items-center">
      <Modal />
    </section>
    <section class="w-full flex justify-center items-center">
      <Petiscos />
    </section>
    <section class="w-full flex justify-center items-center">
      <Redesocial />
    </section>
  </div>
</div>
</template>
<style scoped>

</style>