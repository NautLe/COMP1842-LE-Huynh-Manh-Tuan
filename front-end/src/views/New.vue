<template>
  <div class="word-page">
    <div class="word-card">
      <h1 class="ui header green center aligned">➕ Add New Word</h1>
      <word-form @createOrUpdate="createOrUpdate" />
    </div>
  </div>
</template>

<script>
import WordForm from '../components/WordForm.vue';
import { api } from '../helpers/helpers';

export default {
  name: 'new-word',
  components: {
    WordForm
  },
  methods: {
    async createOrUpdate(word) {
      const res = await api.createWord(word);
      this.flash('Word created successfully!', 'success');
      this.$router.push(`/words/${res._id}`);
    }
  }
};
</script>

<style scoped>
.word-page {

  background-image: url('../assets/3.jpg')!important; 
  background-size: cover;
  background-position: center;

}

.word-card {
  margin: auto;
}
</style>

