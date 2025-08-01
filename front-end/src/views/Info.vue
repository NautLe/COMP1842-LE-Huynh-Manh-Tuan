<template>
  <div class="info-page">
    <div class="info-card">
      <h1> About </h1>
      <p class="intro-text">
        Welcome to <strong>Vocabulary Builder</strong> 
      </p>

      <ul class="features-list">
        <li>🧠 Take vocabulary tests between
            <span class="lang-badge">English</span>,
            <span class="lang-badge">German</span>, and
            <span class="lang-badge">Chinese.</span>
            </li>

        <li>🌐 Choose your test language direction with a smart interface.</li>
        <li>📈 See your progress with timed questions and feedback.</li>
        <li>📋 Manage your word list with edit and delete options.</li>
      </ul>
      
        <div class="buttons">
            <router-link to="/" class="ui primary button">
            <i class="home icon"></i> Back to Home
            </router-link>
        
                   </div>
            </div>
            </div>
       
</template>

<script>
export default {
  name: 'InfoPage',
};
</script>

<style scoped>
.info-page {
  min-height: 100vh;
  background: url('../assets/Summer2.png') no-repeat center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: url('../cursors/point.cur'), auto;
  padding: 2rem;
}
#contact {
  margin-top: 3rem;
  padding: 2rem;
  border-top: 1px solid #ccc;
  text-align: left;
}

.section-heading {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: #1f1f1f;
}

.section-sub-heading {
  color: #555;
  margin-bottom: 2rem;
  font-size: 1rem;
}

.contact-content {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.contact-info {
  flex: 1 1 40%;
  font-size: 1rem;
  color: #333;
}

.contact-info p {
  margin-bottom: 1rem;
}

.contact-form {
  flex: 1 1 55%;
}

.form-control {
  width: 100%;
  padding: 0.7rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
}

.btn {
  background-color: #2185d0;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.btn:hover {
  background-color: #1678c2;
  transform: scale(1.05);
}

.info-card {
  max-width: 650px;
  background: rgba(255, 255, 255, 0.96);
  border-radius: 20px;
  padding: 3rem 2.5rem;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border-left: 2px solid #000;
  border-bottom: 2px solid #000;
  animation: fadeIn 0.4s ease-in-out;
  cursor: url('../cursors/point.cur'), auto;
}

@keyframes fadeIn {
  from {
    transform: translateY(12px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

h1 {
  font-size: 2.4rem;
  margin-bottom: 1rem;
  color: #1f1f1f;
}

.intro-text {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.features-list {
  text-align: left;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #444;
  padding-left: 0;
  margin-bottom: 2rem;
}

.features-list li {
  margin-bottom: 1rem;
  list-style: none;
  display: flex;
  align-items: flex-start;
}

.lang-badge {
  color: #0016ff;
  margin: 0 4px;
  font-weight: 600;
  display: inline-block;
}


.buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.ui.button {
  font-size: 1rem;
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
}

.ui.button:hover {
  transform: scale(1.05);
  cursor: url('../cursors/point.cur'), auto;
}
</style>
