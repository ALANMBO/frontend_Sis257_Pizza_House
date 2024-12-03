<script setup lang="ts"></script>

<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-logo">
        <img src="/img/logoph.jpg" alt="PizzaHouse Logo" />
      </div>
      <div class="footer-links">
        <div class="footer-column">
          <h3>Legal</h3>
          <ul>
            <li><a href="#">Aviso Legal</a></li>
            <li><a href="#">Bases de la promoción Multipagos</a></li>
            <li><a href="#">Bases de la promoción Pizza House</a></li>
            <li><a href="#">Política de Privacidad</a></li>
            <li><a href="#">Reglamento de programa Pizza House</a></li>
            <li><a href="#">Bases de la promoción Regístrate Compra y Gana</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>Pizza House</h3>
          <ul>
            <li><a href="#">Nuestra Historia</a></li>
            <li><a href="#">Localizador de Tiendas</a></li>
            <li><a href="#">Contacto</a></li>
            <li><a href="#">Contáctanos</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>Ubicación</h3>
          <p>
            Av. Principal  #123<br />
            Ciudad Sucre, País Bolivia<br />
            Tel: (123) 456-7890<br />
            Email: contacto@pizzahouse.com
          </p>
        </div>
      </div>
      <div class="footer-version">
        <p>Versión 1.0.0</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="sub-footer-text">&copy; Derechos reservados a Pizza House 2024</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #000000;
  padding: 20px 0;
  color: #fff;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.footer-logo img {
  max-width: 150px;
  margin-left: 10px;
  opacity: 0.5;
}

.footer-links {
  display: flex;
  gap: 30px;
}

.footer-column {
  display: flex;
  flex-direction: column;
}

.footer-column h3 {
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: bold;
}

.footer-column ul {
  list-style: none;
  padding: 0;
}

.footer-column ul li {
  margin: 5px 0;
}

.footer-column ul li a {
  color: #fff;
  text-decoration: none;
  font-size: 14px;
}

.footer-column ul li a:hover {
  text-decoration: underline;
}

.footer-column p {
  font-size: 14px;
  line-height: 1.6;
  color: white;
}

.footer-version {
  font-size: 12px;
  color: white;
}

.footer-bottom {
  background-color: #000000;
  padding: 10px 0;
  text-align: center;
}

.sub-footer-text {
  margin: 0;
  font-size: 14px;
  color: white;
}
</style>
