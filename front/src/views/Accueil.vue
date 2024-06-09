<script>
import axios from "axios";
import Parametres from "@/components/Parametres.vue";
import Supprimer from "@/components/Supprimer.vue";

export default {
  name: 'Accueil',
  components: {
    Supprimer,
    Parametres
  },
  data() {
    return {
      showParametres: false,
      firstname: '',
      lastname: '',
      color: '',
      groupTitle: '', // Titre du groupe
      isInGroup: false,
      usersWithoutGroup: [],
      groupUsers: [], // Stocker les utilisateurs du groupe
      isLeader: false,
      title: '',
      groupId: null, // Id du groupe actuel de l'utilisateur
      membersInGroup: []
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


    //Permet de récupérer les informations de l'user et de son groupe
    async fetchUserData() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:3001/api/user', { token });
        const userData = response.data;
        this.firstname = userData.firstname;
        this.lastname = userData.lastname;
        this.color = userData.color;
        this.groupId = userData.id_Groupe;
        this.isInGroup = !!userData.id_Groupe;
        this.groupTitle = userData.title;
        if (this.isInGroup) {
          await this.fetchGroupData(); // Récupérer les utilisateurs du groupe
          console.log(userData.title);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },

    // Permet d'afficher la boucle avec tout les users sans groupe
    async fetchGroupData() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:3001/api/checkgroupe', { token });
        console.log('Group data:', response.data); // Debug: afficher les données du groupe
        this.groupUsers = response.data; // Assurez-vous que la réponse contient une propriété `users`

        // Trouver le titre du groupe actuel de l'utilisateur
        const userGroup = this.groupUsers.find(user => user.id === this.groupId);

      } catch (error) {
        console.error('Error fetching group data:', error);
      }
    },



    async quitterGroupe() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:3001/api/leavegroupe', { token });
        console.log('Response from leaving group:', response.data);

        // Mettez à jour votre vue après avoir quitté le groupe
        this.isInGroup = false; // Par exemple, mettre à jour l'état local
        this.groupTitle = ''; // Réinitialiser le titre du groupe

        // Réactualiser les données
        await this.fetchUserData(); // Mettre à jour les informations de l'utilisateur
        this.checkLeader(); // Vérifier le statut de leader
      } catch (error) {
        console.error('Error leaving group:', error);
      }
    },



    checkLeader() {
      // Récupération du token depuis le local storage
      const token = localStorage.getItem('token');

      // Vérification si le token existe
      if (!token) {
        console.error('Token non trouvé dans le local storage');
        return;
      }

      // Envoi de la requête POST vers l'API
      axios.post('http://localhost:3001/api/checkleader', { token })
          .then(response => {
            // Vérification de la réponse de l'API
            if (response.data.leader === 'oui') {
              this.isLeader = true;
            } else {
              this.isLeader = false;
            }
          })
          .catch(error => {
            console.error('Erreur lors de la requête API checkleader', error);
          });
    },

    async createGroup() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:3001/api/creategroupe', {
          token,
          title: this.groupTitle
        });
        console.log('Response from creating group:', response.data);

        // Mettre à jour l'état local après la création du groupe
        this.isInGroup = true;
        this.groupTitle = response.data.title; // Mettre à jour le titre du groupe
        this.groupId = response.data.id; // Mettre à jour l'id du groupe

        // Réactualiser les données utilisateur
        await this.fetchUserData();
        this.checkLeader();
      } catch (error) {
        console.error('Error creating group:', error);
      }
    },



    // Nouvelle méthode pour supprimer un groupe
    async supprimerGroupe() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:3001/api/deletegroupe', { token });
        console.log('Response from deleting group:', response.data);

        // Mettre à jour l'état local après la suppression
        this.isInGroup = false;
        this.groupTitle = '';
        this.groupId = null;
        this.groupUsers = [];

        // Réactualiser les données utilisateur
        await this.fetchUserData();
        this.checkLeader();
      } catch (error) {
        console.error('Error deleting group:', error);
      }
    },

    async fetchMemberGroupeData() {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          console.error('No token found in localStorage.');
          return;
        }

        const data = { token };
        const url = 'http://localhost:3001/api/membregroupe';

        // Réinitialisation de membersInGroup
        this.membersInGroup = [];

        const response = await axios.post(url, data);
        console.log('Members in group:', response.data); // Debug: afficher les membres du groupe

        // Assurez-vous que la réponse contient une propriété `members`
        if (response.data.members) {
          console.log('Members data:', response.data.members);
          this.membersInGroup = response.data.members;
        } else {
          console.error('Response data does not contain members property:', response.data);
        }
      } catch (error) {
        console.error('Error fetching member data:', error);
      }
    },
  },

  mounted() {
    this.checkToken();
    this.fetchUserData();
    this.checkLeader();
    this.fetchMemberGroupeData();
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
        <div v-if="!isInGroup" class="createGroup flex w-full flex-col gap-4">
          <input v-model="groupTitle" type="text" name="group" id="group" placeholder="Nom du groupe" class="flex w-full outline-0 p-4 rounded bg-neutral-100">
          <button @click="createGroup" class="bg-emerald-500 flex p-4 w-full items-center justify-center text-white rounded">Créer</button>
        </div>



        <div v-else class="flex w-full flex-col h-full gap-4">
<!--          <input type="text" name="group" id="group" placeholder="Nom" class="flex w-full outline-0 p-4 rounded bg-neutral-100">-->
          <div v-if="isLeader" class="list flex w-full overflow-y-auto overflow-x-hidden gap-2 flex-col h-full">
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

          <button v-if="isLeader" @click="supprimerGroupe" class="bg-red-500 flex p-4 w-full items-center justify-center text-white rounded">Supprimer le groupe</button>
          <button v-else @click="quitterGroupe" class="bg-red-500 flex p-4 w-full items-center justify-center text-white rounded">Quitter le groupe</button>
        </div>




      </div>
      <div class="planning flex w-full h-full px-6 flex-col">
        <div v-if="isInGroup" class="flex w-full flex-col gap-2">
          <h1>{{ groupTitle }}</h1>
          <div v-if="membersInGroup && membersInGroup.length > 0">
            <div v-for="member in membersInGroup" :key="member.id" class="member-item flex w-full mb-8 flex-wrap gap-4">
              <h1 class="profil bg-emerald-500 p-2 rounded-full cursor-pointer">
                {{ member.username.substring(0, 2).toUpperCase() }}
              </h1>
            </div>
          </div>
          <div v-else>
            Chargement en cours...
          </div>


        </div>
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
            <td><button id="lun08-09"></button></td>
            <td><button id="mar08-09"></button></td>
            <td><button id="mer08-09"></button></td>
            <td><button id="jeu08-09"></button></td>
            <td><button id="ven08-09"></button></td>
            <td><button id="sam08-09"></button></td>
            <td><button id="dim08-09"></button></td>
          </tr>
          <tr>
            <td>09:00 - 10:00</td>
            <td><button id="lun09-10"></button></td>
            <td><button id="mar09-10"></button></td>
            <td><button id="mer09-10"></button></td>
            <td><button id="jeu09-10"></button></td>
            <td><button id="ven09-10"></button></td>
            <td><button id="sam09-10"></button></td>
            <td><button id="dim09-10"></button></td>
          </tr>
          <tr>
            <td>10:00 - 11:00</td>
            <td><button id="lun10-11"></button></td>
            <td><button id="mar10-11"></button></td>
            <td><button id="mer10-11"></button></td>
            <td><button id="jeu10-11"></button></td>
            <td><button id="ven10-11"></button></td>
            <td><button id="sam10-11"></button></td>
            <td><button id="dim10-11"></button></td>
          </tr>
          <tr>
            <td>11:00 - 12:00</td>
            <td><button id="lun11-12"></button></td>
            <td><button id="mar11-12"></button></td>
            <td><button id="mer11-12"></button></td>
            <td><button id="jeu11-12"></button></td>
            <td><button id="ven11-12"></button></td>
            <td><button id="sam11-12"></button></td>
            <td><button id="dim11-12"></button></td>
          </tr>
          <tr>
            <td>12:00 - 13:00</td>
            <td><button id="lun12-13"></button></td>
            <td><button id="mar12-13"></button></td>
            <td><button id="mer12-13"></button></td>
            <td><button id="jeu12-13"></button></td>
            <td><button id="ven12-13"></button></td>
            <td><button id="sam12-13"></button></td>
            <td><button id="dim12-13"></button></td>
          </tr>
          <tr>
            <td>13:00 - 14:00</td>
            <td><button id="lun13-14"></button></td>
            <td><button id="mar13-14"></button></td>
            <td><button id="mer13-14"></button></td>
            <td><button id="jeu13-14"></button></td>
            <td><button id="ven13-14"></button></td>
            <td><button id="sam13-14"></button></td>
            <td><button id="dim13-14"></button></td>
          </tr>
          <tr>
            <td>14:00 - 15:00</td>
            <td><button id="lun14-15"></button></td>
            <td><button id="mar14-15"></button></td>
            <td><button id="mer14-15"></button></td>
            <td><button id="jeu14-15"></button></td>
            <td><button id="ven14-15"></button></td>
            <td><button id="sam14-15"></button></td>
            <td><button id="dim14-15"></button></td>
          </tr>
          <tr>
            <td>15:00 - 16:00</td>
            <td><button id="lun15-16"></button></td>
            <td><button id="mar15-16"></button></td>
            <td><button id="mer15-16"></button></td>
            <td><button id="jeu15-16"></button></td>
            <td><button id="ven15-16"></button></td>
            <td><button id="sam15-16"></button></td>
            <td><button id="dim15-16"></button></td>
          </tr>
          <tr>
            <td>16:00 - 17:00</td>
            <td><button id="lun16-17"></button></td>
            <td><button id="mar16-17"></button></td>
            <td><button id="mer16-17"></button></td>
            <td><button id="jeu16-17"></button></td>
            <td><button id="ven16-17"></button></td>
            <td><button id="sam16-17"></button></td>
            <td><button id="dim16-17"></button></td>
          </tr>
          <tr>
            <td>17:00 - 18:00</td>
            <td><button id="lun17-18"></button></td>
            <td><button id="mar17-18"></button></td>
            <td><button id="mer17-18"></button></td>
            <td><button id="jeu17-18"></button></td>
            <td><button id="ven17-18"></button></td>
            <td><button id="sam17-18"></button></td>
            <td><button id="dim17-18"></button></td>
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
    max-height: 450px;
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