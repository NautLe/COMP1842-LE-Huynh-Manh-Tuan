<template>
  <div id="app">
    <div class="ui inverted segment navbar fixed-menu">
      <div class="ui center aligned container">
        <div class="ui large secondary inverted pointing menu compact">
          
          <router-link to="/words" exact class="item">
            <i class="comment outline icon"></i> Words
          </router-link>
          <router-link to="/words/new" class="item">
            <i class="plus circle icon"></i> New
          </router-link>
          <router-link to="/test" class="item">
            <i class="graduation cap icon"></i> Test
          </router-link>
          <router-link to="/info" class="item">
            <i class="info circle icon"></i>Info
          </router-link>
        </div>
      </div>
    </div>

    <div style="height: 55px;"></div>

    <flash-message class="myFlash"></flash-message>

    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>


<script>
export default {
  name: 'app'
};
</script>

<style>
#app > div.navbar {
  margin-bottom: 1.5em;
}
.myFlash {
  width: 250px;
  margin: 10px;
  position: absolute;
  top: 50px;
  right: 0;
}
input {
  width: 300px;
}
div.label {
  width: 120px;
}
div.input {
  margin-bottom: 10px;
}
button.ui.button {
  margin-top: 15px;
  display: block;
}

html, body, #app {
  margin: 0 !important;
  padding: 0 !important;
  width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
  box-sizing: border-box;
  background-color: transparent; 
}
.ui.segment.navbar {
  margin: 0 !important;
  border-radius: 0 !important;
  padding-top: 0 !important;
}
.ui.inverted.segment.navbar {
  padding-top: 0 !important;
}
.fixed-menu {
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; 
  border-radius: 0 !important;
  margin: 0 !important;
  padding: 1rem 0;
}

body {
  cursor: url('./cursors/link.cur'), auto;
  
}
body:hover {
    cursor: url('./cursors/link.cur'), auto;
}
.positive.button:hover {
    cursor: url('./cursors/link.cur'), auto;
}
.word-page {
  margin: auto;
  display: flex;
  justify-content: center;
  background: url('./assets/4.jpg') center center / cover no-repeat;
  cursor: url('./cursors/point.cur'), auto;
  min-height: calc(100vh - 55px)
  
  
}

.word-card {
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 500px;
  margin: auto;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.mt {
  margin-top: 1.5em;
}
.mb-1 {
  margin-bottom: 1em;
}
.button-group .button {
  width: 100%;
  margin-bottom: 1em;
}

</style>

