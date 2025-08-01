<template>
  <div class="info-page">
    <!-- 🔹 Info Section (default view) -->
    <div class="info-card" v-if="!showContact">
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
        <router-link to="/" class="ui primary button ">
          <i class="home icon"></i> Back to Home
        </router-link>
        <button class="ui primary button active" @click="showContact = true">
          <i class="envelope icon"></i> Contact
        </button>
      </div>
    </div>

    <!-- 🔹 Contact Section (shows after clicking Contact) -->
    <div class="info-card contact-card" v-else>
      <h1>CONTACT</h1>
      <p class="section-sub-heading">Find me? Drop a note!</p>
      <div class="contact-content">
        <div class="contact-info">
          <p>📍 TP HCM, VIETNAM</p>
          <p>📞 Phone: 0333208169</p>
          <p>📧 Email: dauding159@gmail.com</p>
        </div>

          <div class="column column-half contact-form">
                <form @submit.prevent="sendEmail">
                  <div class="row">
                     <div class="column column-half">
                      <input type="text" name="" placeholder="Name" required class="form-control" v-model="form.name">
                         </div>
                       <div class="column column-half">
                     <input type="email" name="" placeholder="Email" required id="" class="form-control" v-model="form.email">
                       </div>
                          </div>
                            <div class="row mt-8">
                                <div class="column column-full">
                    <textarea placeholder="Message" required class="form-control" rows="6" v-model="form.message"></textarea>
                                </div>
                            </div>
                            <button class="btn send mt-16 ui button primary"type="submit":disabled="isSending">
                                        {{ isSending ? `Wait ${cooldown}s...` : 'Send' }}
                                      </button>

                            <button class="ui button basic ml active btn mt-16 back-button" @click="showContact = false">← Back</button>
                        </form>
                    </div>
                   </div>
        </div>
      </div>


</template>



<script>
export default {
  name: 'InfoPage',
  data() {
  return {
    showContact: false,
    form: {
      name: '',
      email: '',
      message: '',
    },
    isSending: false,
    cooldown: 0,
    cooldownInterval: null,
  };
},
methods: {
  async sendEmail() {
  if (this.isSending) return; // prevent double-click

  this.isSending = true;
  this.cooldown = 5; // 5 seconds cooldown

  try {
    const res = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.form),
    });

    const data = await res.json();
    if (data.success) {
      alert('✅ Email sent successfully!');
      this.form = { name: '', email: '', message: '' };
      this.showContact = false;
    } else {
      alert('❌ Failed to send email.');
    }
  } catch (err) {
    console.error(err);
    alert('❌ Server error.');
  }

  this.startCooldown();
},
startCooldown() {
  this.cooldownInterval = setInterval(() => {
    this.cooldown--;
    if (this.cooldown <= 0) {
      clearInterval(this.cooldownInterval);
      this.isSending = false;
    }
  }, 1000);
}

  },
}

</script>



<style scoped>

.back-button{
  width: 100%;
  margin-top: 16px;

}
.mt-8{
    margin-top: 8px 
}

.mt-16{
    margin-top: 16px !important;
}
.row{
    margin-left: -8px;
    margin-right: -8px;
}

.row::after{
    content:"";
    display: block;
    clear: both;
}
.column {
    float: left;
    padding-left: 8px;
    padding-right: 8px;
}
.column-half {
    width: 50%;
}
.column-full {
    width: 100%;
}

.contact-card {
  margin-top: 3rem;
  text-align: left;
}

.contact-content {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 1.5rem;
}

.contact-info {
  flex: 1 1 40%;
  font-size: 1rem;
  color: #333;
}

.contact-info p {
  margin-bottom: 1rem;
}

.contact-form .form-control {
    padding: 10px;
    border: 1px solid #ccc;
    width: 100%;
}
.contact-form .btn {
  background-color: #2185d0;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border-radius: 10px;
  cursor: url('../cursors/link.cur'), auto;
  transition: all 0.2s ease-in-out;
  width: 100%;
}

.contact-form .btn:hover {
  background-color: #1678c2;
  transform: scale(1.05);
}

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
  max-width: 850px;
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
