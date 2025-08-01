<template>
  <div class="word-page">
    <div class="word-card">
      <h1 class="ui header black center aligned"> Word Details</h1>

      <div class="ui form">
        <div class="field">
          <label><i class="united kingdom flag"></i> English</label>
          <input type="text" readonly :value="word.english" />
        </div>

        <div class="field">
          <label><i class="germany flag"></i> German</label>
          <input type="text" readonly :value="word.german" />
        </div>

        <div class="field">
          <label><i class="china flag"></i> Chinese</label>
          <input type="text" readonly :value="word.chinese" />
        </div>
      </div>

      <div class="button-group mt">
        <router-link :to="`/words/${word._id}/edit`" class="ui primary button fluid mb-1">
          ✏️ Edit Word
        </router-link>
        <router-link to="/words" class="ui button basic ml active">
          ← Back to Words
        </router-link>
      </div>

      </div>
    </div>
  
</template>

<script>
import { api } from '../helpers/helpers';

export default {
  name: 'Show',
  data() {
    return {
      word: {}
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    try {
      const result = await api.getWord(id);
      this.word = result;
    } catch (error) {
      console.error('Failed to fetch word:', error);
    }
  }
};
</script>

<style scoped>


.ui.form .field {
  margin-bottom: 1.2em;
}


.button-group .button {
  width: 100%;
  margin-bottom: 1em;
}

input[readonly] {
  background-color: #f5f5f5 !important;
  cursor: default;
} 
</style>
