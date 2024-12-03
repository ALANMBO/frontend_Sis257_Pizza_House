<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin" class="login-form">
      <h2>Iniciar sesión</h2>

      <div class="input-group">
        <label for="username">Usuario</label>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="Ingresa tu usuario"
          required
        />
      </div>

      <div class="input-group">
        <label for="password">Contraseña</label>
        <div class="password-container">
          <input
            :type="passwordVisible ? 'text' : 'password'"
            id="password"
            v-model="password"
            placeholder="Ingresa tu contraseña"
            required
          />
          <i
            class="pi"
            :class="passwordVisible ? 'pi-eye-slash' : 'pi-eye'"
            @click="togglePasswordVisibility"
          ></i>
        </div>
      </div>

      <button type="submit" class="login-button">Iniciar sesión</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      correctUsername: 'MauricioBejarano',
      correctPassword: '123456789',
      passwordVisible: false,
    };
  },
  methods: {
    handleLogin() {
      if (this.username === this.correctUsername && this.password === this.correctPassword) {
        localStorage.setItem('authenticated', 'true');
        this.$router.push({ name: 'home' });
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    },
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    }
  },
};
</script>

<style scoped>
.login-container {
  position: relative;
  width: 100%;
  height: 100vh;
  background: url('/img/pizza1.gif') repeat;
  background-size: 300px 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
  position: relative;
  z-index: 10;
  padding: 30px;
  background-color: rgba(255, 253, 230, 0.95);
  border-radius: 15px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 450px;
}

h2 {
  color: #3a3a3a;
  text-align: center;
  font-family: 'Arial', sans-serif;
  font-size: 26px;
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  color:#000000;
}
input {
  width: 100%;
  padding: 14px;
  border: 2px solid #ffa500;
  border-radius: 8px;
  font-size: 16px;
  margin-top: 5px;
  background-color: #fff5e1;
}

input:focus {
  outline: none;
  border-color: #ff8c00;
  box-shadow: 0 0 5px rgba(255, 140, 0, 0.5);
}

.password-container {
  position: relative;
}

.password-container i {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #ffa500;
}

button {
  padding: 14px;
  background-color: #ff8c00;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

button:hover {
  background-color: #e67e00;
}

button:active {
  background-color: #d85d00;
}
</style>
