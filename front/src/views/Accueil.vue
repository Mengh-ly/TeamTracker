<script>
import Parametres from "@/components/Parametres.vue";

  export default {
    name:'Accueil',
    components:{
      Parametres
    },
    data() {
      return {
        showParametres: false
      }
    },
    methods: {
      toggleParametres() {
        this.showParametres = !this.showParametres;
      }
    }
  }
</script>

<template>
  <Parametres v-if="showParametres"></Parametres>
  <div class="flex w-full p-6 flex-col h-dvh bg-white gap-2 relative items-center">
    <nav class="flex w-full p-4 px-6 justify-between items-center">
      <h1 class="">TeamTracker</h1>
      <h1 class="profil bg-emerald-500 p-2 rounded-full cursor-pointer" @click="toggleParametres">HD</h1>
    </nav>
    <hr class="w-full flex border-neutral-300">
    <div class="flex w-full flex-row h-full">
      <div class="sidebar border-r flex w-full h-full p-6 flex-col">
        <div class="createGroup flex w-full flex-col gap-4">
          <input type="text" name="group" id="group" placeholder="Nom du groupe" class="flex w-full outline-0 p-4 rounded bg-neutral-100">
          <button class="bg-emerald-500 flex p-4 w-full items-center justify-center text-white rounded">Créer</button>
        </div>
      </div>
      <div class="planning flex w-full h-full px-6 flex-col">
        <div class="flex w-full mb-8"></div>
        <table>
          <thead>
          <tr>
            <th>Heure</th>
            <th>Lundi</th>
            <th>Mardi</th>
            <th>Mercredi</th>
            <th>Jeudi</th>
            <th>Vendredi</th>
            <th>Samedi</th>
            <th>Dimanche</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>08:00 - 09:00</td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
          </tr>
          <tr>
            <td>09:00 - 10:00</td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
          </tr>
          <tr>
            <td>10:00 - 11:00</td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
          </tr>
          <tr>
            <td>11:00 - 12:00</td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
          </tr>
          <tr>
            <td>12:00 - 13:00</td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
          </tr>
          <tr>
            <td>13:00 - 14:00</td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
          </tr>
          <tr>
            <td>14:00 - 15:00</td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
          </tr>
          <tr>
            <td>15:00 - 16:00</td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
          </tr>
          <tr>
            <td>16:00 - 17:00</td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
          </tr>
          <tr>
            <td>17:00 - 18:00</td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
            <td><button></button></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .sidebar{
    max-width: 400px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid #ddd;
    text-align: center;
    height: 50px;
    padding: 0;
    width: 12.5%; /* Égalité de largeur pour 8 colonnes (100% / 8 = 12.5%) */
  }

  button:hover{
    background: #10B981;
  }

  td button{
    display: flex;
    width: 100%;
    height: 50px;
  }
</style>