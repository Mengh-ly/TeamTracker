<script>
import axios from "axios";
import Parametres from "@/components/Parametres.vue";
import Supprimer from "@/components/Supprimer.vue";
export default {
  name: 'Accueil',
  components:{
    Supprimer,
    Parametres
  },
  data() {
    return {
      showParametres: false,
      firstname: '',
      lastname: '',
      color:'',
      groupTitle: ''
    }
  },
  methods: {
    toggleParametres() {
      this.showParametres = !this.showParametres;
    },
    checkToken() {
      const token = localStorage.getItem('token');
      if (!token) {
        this.$router.push('/');
      }
    },
    async fetchUserData() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:3001/api/user', { token });
        const userData = response.data;
        this.firstname = userData.firstname;
        this.lastname = userData.lastname;
        this.color = userData.color;
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },
    async createGroup() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:3001/api/creategroupe', {
          token: token,
          title: this.groupTitle
        });
        console.log('Group created:', response.data);
        // Ajoutez ici la logique pour traiter la réponse si nécessaire
      } catch (error) {
        console.error('Error creating group:', error);
      }
    }
  },
  created() {
    this.checkToken();
    this.fetchUserData();
  }
}
</script>


<template>
<!--  <Supprimer></Supprimer>-->
  <Parametres v-if="showParametres"></Parametres>
  <div class="flex w-full p-6 flex-col h-dvh bg-white gap-2 relative items-center overflow-y-hidden">
    <nav class="flex w-full p-4 px-6 justify-between items-center">
      <h1 class="">TeamTracker</h1>
      <h1 class="profil p-2 rounded-full cursor-pointer" :style="{ backgroundColor: color }" @click="toggleParametres">{{ firstname.charAt(0) }}{{ lastname.charAt(0) }}</h1>
    </nav>
    <hr class="w-full flex border-neutral-300">
    <div class="flex w-full flex-row  h-dvh">
      <div class="sidebar border-r flex w-full h-full p-6 flex-col">
        <div class="createGroup flex w-full flex-col gap-4">
          <input v-model="groupTitle" type="text" name="group" id="group" placeholder="Nom du groupe" class="flex w-full outline-0 p-4 rounded bg-neutral-100">
          <button @click="createGroup" class="bg-emerald-500 flex p-4 w-full items-center justify-center text-white rounded">Créer</button>
        </div>



        <div class="flex w-full flex-col h-full gap-4">
          <input type="text" name="group" id="group" placeholder="Nom" class="flex w-full outline-0 p-4 rounded bg-neutral-100">
          <div class="list flex w-full overflow-y-auto overflow-x-hidden gap-2 flex-col h-full">
            <div class="embed flex w-full items-center justify-between p-2 border rounded">
              <div class="flex items-center gap-2">
                <h1 class="profil bg-emerald-500 p-2 rounded-full cursor-pointer">HD</h1>
                <span>Hervé Duong</span>
              </div>
              <button class="bg-emerald-500 p-2 rounded text-white"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-plus"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg></button>
            </div>
            <div class="embed flex w-full items-center justify-between p-2 border rounded">
              <div class="flex items-center gap-2">
                <h1 class="profil bg-emerald-500 p-2 rounded-full cursor-pointer">HD</h1>
                <span>Hervé Duong</span>
              </div>
              <button class="bg-emerald-500 p-2 rounded text-white"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-plus"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg></button>
            </div>
            <div class="embed flex w-full items-center justify-between p-2 border rounded">
              <div class="flex items-center gap-2">
                <h1 class="profil bg-emerald-500 p-2 rounded-full cursor-pointer">HD</h1>
                <span>Hervé Duong</span>
              </div>
              <button class="bg-emerald-500 p-2 rounded text-white"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-plus"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg></button>
            </div>
            <div class="embed flex w-full items-center justify-between p-2 border rounded">
              <div class="flex items-center gap-2">
                <h1 class="profil bg-emerald-500 p-2 rounded-full cursor-pointer">HD</h1>
                <span>Hervé Duong</span>
              </div>
              <button class="bg-emerald-500 p-2 rounded text-white"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-plus"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg></button>
            </div>
            <div class="embed flex w-full items-center justify-between p-2 border rounded">
              <div class="flex items-center gap-2">
                <h1 class="profil bg-emerald-500 p-2 rounded-full cursor-pointer">HD</h1>
                <span>Hervé Duong</span>
              </div>
              <button class="bg-emerald-500 p-2 rounded text-white"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-plus"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg></button>
            </div>
            <div class="embed flex w-full items-center justify-between p-2 border rounded">
              <div class="flex items-center gap-2">
                <h1 class="profil bg-emerald-500 p-2 rounded-full cursor-pointer">HD</h1>
                <span>Hervé Duong</span>
              </div>
              <button class="bg-emerald-500 p-2 rounded text-white"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-plus"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg></button>
            </div>
            <div class="embed flex w-full items-center justify-between p-2 border rounded">
              <div class="flex items-center gap-2">
                <h1 class="profil bg-emerald-500 p-2 rounded-full cursor-pointer">HD</h1>
                <span>Hervé Duong</span>
              </div>
              <button class="bg-emerald-500 p-2 rounded text-white"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-plus"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg></button>
            </div>
            <div class="embed flex w-full items-center justify-between p-2 border rounded">
              <div class="flex items-center gap-2">
                <h1 class="profil bg-emerald-500 p-2 rounded-full cursor-pointer">HD</h1>
                <span>Hervé Duong</span>
              </div>
              <button class="bg-emerald-500 p-2 rounded text-white"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-plus"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg></button>
            </div>
            <div class="embed flex w-full items-center justify-between p-2 border rounded">
              <div class="flex items-center gap-2">
                <h1 class="profil bg-emerald-500 p-2 rounded-full cursor-pointer">HD</h1>
                <span>Hervé Duong</span>
              </div>
              <button class="bg-emerald-500 p-2 rounded text-white"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-plus"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg></button>
            </div>
            <div class="embed flex w-full items-center justify-between p-2 border rounded">
              <div class="flex items-center gap-2">
                <h1 class="profil bg-emerald-500 p-2 rounded-full cursor-pointer">HD</h1>
                <span>Hervé Duong</span>
              </div>
              <button class="bg-emerald-500 p-2 rounded text-white"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-plus"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg></button>
            </div>
            <div class="embed flex w-full items-center justify-between p-2 border rounded">
              <div class="flex items-center gap-2">
                <h1 class="profil bg-emerald-500 p-2 rounded-full cursor-pointer">HD</h1>
                <span>Hervé Duong</span>
              </div>
              <button class="bg-emerald-500 p-2 rounded text-white"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-plus"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg></button>
            </div>
            <div class="embed flex w-full items-center justify-between p-2 border rounded">
              <div class="flex items-center gap-2">
                <h1 class="profil bg-emerald-500 p-2 rounded-full cursor-pointer">HD</h1>
                <span>Hervé Duong</span>
              </div>
              <button class="bg-emerald-500 p-2 rounded text-white"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-plus"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg></button>
            </div>
            <div class="embed flex w-full items-center justify-between p-2 border rounded">
              <div class="flex items-center gap-2">
                <h1 class="profil bg-emerald-500 p-2 rounded-full cursor-pointer">HD</h1>
                <span>Hervé Duong</span>
              </div>
              <button class="bg-emerald-500 p-2 rounded text-white"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-plus"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg></button>
            </div>
          </div>
          <button class="bg-emerald-500 flex p-4 w-full items-center justify-center text-white rounded">Ajouter</button>
          <button class="bg-red-500 flex p-4 w-full items-center justify-center text-white rounded">Supprimer le groupe</button>
        </div>




      </div>
      <div class="planning flex w-full h-full px-6 flex-col">
<!--        <div class="flex w-full flex-col gap-2">-->
<!--          <h1>Charles Peguy Marseille : Votre équipe</h1>-->
<!--          <div class="flex w-full mb-8 flex-wrap gap-4">-->
<!--            <h1 class="profil bg-emerald-500 p-2 rounded-full cursor-pointer">HD</h1>-->
<!--            <h1 class="profil bg-emerald-500 p-2 rounded-full cursor-pointer">LG</h1>-->
<!--            <h1 class="profil bg-emerald-500 p-2 rounded-full cursor-pointer">BB</h1>-->
<!--            <h1 class="profil bg-emerald-500 p-2 rounded-full cursor-pointer">DU</h1>-->
<!--          </div>-->
<!--        </div>-->
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

  .list{
    max-height: 500px;
  }

  .profil{
    min-width: 40px;
    align-items: center;
    display: flex;
    justify-content: center;
  }

  td button:hover{
    background: #10B981;
  }

  td button{
    display: flex;
    width: 100%;
    height: 50px;
  }
</style>