<template>
  <div class="widget flex fixed z-10 top-0 right-0 mt-24 mr-12 rounded p-4 w-full bg-neutral-100 flex-col border-neutral-200 border gap-4">
    <span>Hervé Duong</span>
    <hr class="border border-neutral-200">
    <span>mon.email@gmail.com</span>
    <a href="" class="flex text-white w-full p-2 bg-red-500 rounded items-center justify-center">Déconnexion</a>
  </div>
</template>

<script>
export default {
  name: 'Parametres',
}
</script>

<style scoped>
.widget{
  max-width: 300px;
}
</style>