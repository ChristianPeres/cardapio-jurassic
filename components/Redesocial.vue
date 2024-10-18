<template>
  <main class="w-full md:w-5/5 mx-auto py-12 relative">
      <h1 class="text-4xl font-bold text-center mt-4 mb-0 text-bg-custom-green">Nos siga na nossa rede social</h1>
      
      <div class="flex flex-wrap justify-center gap-1 mt-5 text-4xl">
      <div v-for="(midias, idx) in midia" :key="idx" class="flex items-center px-4 py-1 mb-2"> 
              <a class="mt-1 text-white flex justify-center py-1 gap-2 items-center" :href="midias.link">
                  <span v-html="midias.icone(40, '#ffffff')"></span>
                  {{ midias.name }}
              </a>
          </div>  
      </div>
      <p class="text-2xl font-bold text-center mt-4 mb-0 text-bg-custom-green">Aperte nos icones</p>
  </main>
</template>

<script>
import * as icon from '../utils/icons'

export default {
  data(){
      return{
          midia: [
              
              {
                  icone: icon.icon_insta,
                  name: '/@jurassicrockbar',
                  link: 'https://www.instagram.com/jurassicrockbar/'
              },
              {
                  icone: icon.icon_whats,
                  name: '/WhatsApp',
                  link: 'https://chat.whatsapp.com/BAV04g9UE7FKntAcb1n6t7'
              }                         
          ]
      }
  }
}
</script>