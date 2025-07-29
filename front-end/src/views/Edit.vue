<template>
  <div class="word-page">
    <div class="word-card">
      <h1 class="ui header black center aligned">Edit Word</h1>
      <word-form @createOrUpdate="createOrUpdate" :word="this.word" />
    </div>
  </div>
</template>

<script>
import WordForm from '@/components/WordForm.vue';
import { api } from '../helpers/helpers';

export default {
  name: 'Edit',
  components: {
    'word-form': WordForm
  },
  data() {
    return {
      word: {}
    };
  },
  async mounted() {
    const result = await api.getWord(this.$route.params.id);
    this.word = result;
  },
  methods: {
    createOrUpdate: async function (word) {
      await api.updateWord(word);
      this.flash('Word updated successfully!', 'success');
      this.$router.push(`/words/${word._id}`);
    }
  }
};

</script>





