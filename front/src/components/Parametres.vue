<template>
  <div class="widget flex fixed z-10 top-0 right-0 mt-24 mr-12 rounded p-4 w-full bg-neutral-100 flex-col border-neutral-200 border gap-4">
    <span>{{ lastname }} {{ firstname }}</span>
    <hr class="border border-neutral-200">
    <span>{{ email }}</span>
    <a class="flex text-white w-full p-2 bg-red-500 rounded items-center justify-center cursor-pointer" @click="logout">Déconnexion</a>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Parametres',
  data() {
    return {
      firstname: '',
      lastname: '',
      email: ''
    };
  },
  methods: {
    async fetchUserData() {
      try {
        const token = localStorage.getItem('token'); // Assurez-vous que le token est stocké dans le localStorage
        const response = await axios.post('http://localhost:3001/api/user', { token });
        const userData = response.data;
        this.firstname = userData.firstname;
        this.lastname = userData.lastname;
        this.email = userData.email;
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },
    async logout(){
      localStorage.removeItem("token");
      location.reload();
    }
  },
  created() {
    this.fetchUserData();
  }
}
</script>

<style scoped>
.widget{
  max-width: 300px;
}
</style>