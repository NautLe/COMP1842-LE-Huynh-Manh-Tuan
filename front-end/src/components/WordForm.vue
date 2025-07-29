<template>
  <form @submit.prevent="onSubmit" class="ui form">
    <p v-if="errorsPresent" class="ui red message">Please fill out all fields!</p>

    <div class="field">
      <label><i class="united kingdom flag"></i> English</label>
      <input v-model="form.english" type="text" placeholder="Enter English word" />
    </div>

    <div class="field">
      <label><i class="germany flag"></i> German</label>
      <input v-model="form.german" type="text" placeholder="Enter German word" />
    </div>

    <div class="field">
      <label><i class="china flag"></i> Chinese</label>
      <input v-model="form.chinese" type="text" placeholder="Enter Chinese word" />
    </div>

    <div class="button-group mt">
  <button class="ui button primary" type="submit">
    💾 Save Changes
  </button>
  <router-link to="/words" class="ui button basic ml">
    ← Back to Words
  </router-link>
</div>
  </form>
</template>

<script>
export default {
  props: {
    word: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      form: {
        english: '',
        german: '',
        chinese: ''
      },
      errorsPresent: false
    };
  },
  watch: {
    word: {
      immediate: true,
      handler(newVal) {
        this.form = { ...newVal };
      }
    }
  },
  methods: {
    onSubmit() {
      if (!this.form.english || !this.form.german || !this.form.chinese) {
        this.errorsPresent = true;
        return;
      }
      this.errorsPresent = false;
      this.$emit('createOrUpdate', this.form);
    }
  }
};
</script>

<style scoped>

.ui.form {
  display: flex;
  flex-direction: column;
  
  
}

.ml {
  margin-left: 1em;
}
.button-group .button {
  width: 100%;
  margin-bottom: 1em;
}
body {
  overflow: hidden !important;
}
</style>
