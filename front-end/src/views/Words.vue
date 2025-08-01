<template>
  <div class="words-page">
    <div class="form-container">
      <h1>Words</h1>
      <table class="ui celled compact table">
        <thead>
          <tr>
            <th>English</th>
            <th>German</th>
            <th>Chinese</th>
            <th colspan="3" class="center aligned">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(word, i) in words" :key="i">
            <td>{{ word.english }}</td>
            <td>{{ word.german }}</td>
            <td>{{ word.chinese }}</td>
            <td width="75" class="center aligned">
              <router-link :to="{ name: 'show', params: { id: word._id } }"
              
              >Show</router-link>
            </td>
            <td width="75" class="center aligned">
              <router-link :to="{ name: 'edit', params: { id: word._id } }">Edit</router-link>
            </td>
            <td width="75" class="center aligned">
              <a href="#" @click.prevent="onDestroy(word._id)">Destroy</a>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
  name: 'Words',
  data() {
    return {
      words: {},
    };
  },
  methods: {
    async onDestroy(id) {
      const sure = window.confirm('Are you sure?');
      if (!sure) return;
      await api.deleteWord(id);
      this.flash('Word deleted successfully!', 'success');
      this.words = this.words.filter(word => word._id !== id);
    },
  },
  async mounted() {
    try {
      const data = await api.getWords();
      this.words = data;
    } catch (err) {
      console.error('Failed to fetch words:', err);
    }
  },
};
</script>

<style scoped>
.words-page {
  min-height: 100vh;
  background: linear-gradient(to bottom right, #dfe9f3, #ffffff);
  display: flex;
  justify-content: center;
  padding: 4rem 1rem;
  background-image: url('../assets/Summer2.png') ; 
  
  background-size: cover;
  background-position: center;
  position: relative;
  cursor: url('../cursors/point.cur'), auto;
}

.form-container {
  background-color: rgba(255, 255, 255, 0.9);
  border-bottom: 2px solid rgb(0, 0, 0);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 2.5rem 3rem;
 
  max-width: 100%;
  cursor: url('../cursors/point.cur'), auto;
  border-left: solid 2px rgb(0, 0, 0);
  margin: 0 auto;
  
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

table {
  font-size: 1rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 0 1px rgba(34, 36, 38, 0.15);
}
table.ui.table {
  font-size: 1rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
}

.ui.table thead {
  background-color: #0016ff;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.ui.table thead th {
  padding: 14px 10px;
  font-weight: 600;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  border: none;
  border-bottom: 2px solid #ccc;
}

.ui.table tbody td {
  padding: 12px 10px;
  border-bottom: 1px solid #e0e0e0;
  background-color: rgba(255, 255, 255, 0.95);
  color: #333;
}

.ui.table tbody tr:hover {
  background-color: #f0f8ff !important;
  cursor: url('../cursors/link.cur'), auto;
}

.ui.table td a {
  color: #007bff;
  text-decoration: none;
  transition: color 0.2s ease-in-out;
}

.ui.table td a:hover {
  color: #0056b3;
  text-decoration: underline;
}

.ui.table th,
.ui.table td {
  text-align: center;
  padding: 12px;
}

.ui.table tr:hover {
  background-color: #f0f8ff;
  cursor: url('../cursors/link.cur'), auto;
}

a {
  color: #3b82f6;
  font-weight: bold;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
  cursor: url('../cursors/link.cur'), auto;
}

.ui.buttons,
a,
input,
.ui.table thead th,
label {
  cursor: url('../cursors/point.cur'), auto;
}



.table{
  cursor: url('../cursors/point.cur'), auto;
}

h1{
  border-bottom: 4px solid #636363;
}
</style>

