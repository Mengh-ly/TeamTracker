<template>
  <div class="list flex w-full overflow-y-auto overflow-x-hidden gap-2 flex-col h-full">
    <div v-for="user in groupUsers" :key="user.id" class="embed flex w-full items-center justify-between p-2 border rounded">
      <div class="flex items-center gap-2">
        <h1 class="profil bg-emerald-500 p-2 rounded-full cursor-pointer">{{ user.firstname.charAt(0).toUpperCase() + user.lastname.charAt(0).toUpperCase() }}</h1>
        <span>{{ user.firstname }} {{ user.lastname }}</span>
      </div>
      <button class="bg-emerald-500 p-2 rounded text-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user-plus">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Accueil',
  data() {
    return {
      groupUsers: [] // Stocker les utilisateurs du groupe
    }
  },
  methods: {
    async fetchGroupData() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:3001/api/checkgroupe', { token });
        console.log('Group data:', response.data); // Debug: afficher les données du groupe
        this.groupUsers = response.data; // Assurez-vous que la réponse contient une propriété `users`
        console.log('Group users:', this.groupUsers); // Debug: afficher les utilisateurs du groupe
      } catch (error) {
        console.error('Error fetching group data:', error);
      }
    }
  },
  mounted() {
    this.fetchGroupData();
  }
}
</script>

<style>
/* Ajoutez vos styles CSS ici */
</style>
