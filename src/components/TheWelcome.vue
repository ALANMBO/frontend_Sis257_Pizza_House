<template>
  <div class="content">
    <section class="descripcion">
      <div class="descripcion-container">
        <img src="/img/PorqueElegirnos.jpg" alt="Pizza House" class="descripcion-image" />
        <div class="descripcion-text">
          <h2>Bienvenidos a Pizza House</h2>
          <p>
            En Pizza House nos especializamos en ofrecer las mejores pizzas, hechas con los
            ingredientes más frescos y de alta calidad. Nuestra misión es brindar una experiencia
            única en cada bocado, desde nuestras pizzas clásicas hasta las más innovadoras, para
            satisfacer todos los gustos. Nos esforzamos por ofrecer un menú que se adapte a todas
            las preferencias y necesidades dietéticas, garantizando que cada pizza sea una obra
            maestra deliciosa y que cada cliente se sienta como en casa.
          </p>
        </div>
      </div>
    </section>

    <section class="productos">
      <h2 class="section-title">Nuestros Productos</h2>
      <div class="product-list">
        <div class="category-item">
          <img src="/img/pizzaP1.jpeg" alt="Pizza 1" class="product-image" />
          <h3 class="product-name">Pizza Margherita</h3>
          <p class="product-description">
            Deliciosa pizza con tomate, mozzarella y albahaca fresca.
          </p>
          <h3 class="category-name">45 Bs</h3>
          <!-- Botón con icono de carrito de PrimeIcons -->
          <button class="add-to-cart-btn">
            <i class="pi pi-cart-plus"></i> Agregar al carrito
          </button>
        </div>
        <div class="category-item">
          <img src="/img/pizzaP2.jpg" alt="Pizza 2" class="product-image" />
          <h3 class="product-name">Pizza Pepperoni</h3>
          <p class="product-description">
            Pizza con salsa de tomate, mozzarella y abundante pepperoni.
          </p>
          <h3 class="category-name">38 Bs</h3>
          <!-- Botón con icono de carrito de PrimeIcons -->
          <button class="add-to-cart-btn">
            <i class="pi pi-cart-plus"></i> Agregar al carrito
          </button>
        </div>
        <div class="category-item">
          <img src="/img/pizzaP3.jpg" alt="Pizza 3" class="product-image" />
          <h3 class="product-name">Pizza Cuatro Quesos</h3>
          <p class="product-description">
            Combinación de mozzarella, cheddar, gorgonzola y parmesano.
          </p>
          <h3 class="category-name">70 Bs</h3>
          <!-- Botón con icono de carrito de PrimeIcons -->
          <button class="add-to-cart-btn">
            <i class="pi pi-cart-plus"></i> Agregar al carrito
          </button>
        </div>
      </div>
    </section>

    <!-- Descripción debajo de productos -->
    <section class="descripcion-bajo-productos">
      <div class="descripcion-bajo-container">
        <img src="/img/pizza1.gif" alt="Pizza House" class="descripcion-bajo-image" />
        <div class="descripcion-bajo-text">
          <h2>¿Por qué elegirnos?</h2>
          <p>
            En Pizza House no solo nos apasiona hacer las mejores pizzas, sino que también nos
            comprometemos con la satisfacción total de nuestros clientes. Ya sea que disfrutes de
            una pizza clásica o que prefieras algo innovador, nuestro menú tiene opciones para todos
            los gustos. Además, ofrecemos un ambiente acogedor donde podrás disfrutar con tu familia
            y amigos, haciendo que cada visita sea especial.
          </p>
        </div>
      </div>
    </section>

    <section class="categorias">
      <h2 class="section-title">Explorar Nuestras Categorías</h2>
      <div class="horizontal-categories">
        <div class="horizontal-category" @click="mostrarOfertas = !mostrarOfertas">
          <h3>Pizzas</h3>
        </div>
        <div class="horizontal-category" @click="mostrarBebidas = !mostrarBebidas">
          <h3>Bebidas</h3>
        </div>
        <div class="horizontal-category" @click="mostrarPollo = !mostrarPollo">
          <h3>Pollo</h3>
        </div>
        <div class="horizontal-category" @click="mostrarCervezas = !mostrarCervezas">
          <h3>Cervezas</h3>
        </div>
        <div class="horizontal-category" @click="mostrarPostres = !mostrarPostres">
          <h3>Postres</h3>
        </div>
      </div>
      <!-- Mostrar las categorías de ofertas de Pizzas -->
      <div v-if="mostrarOfertas" class="category-list">
        <div class="category-item">
          <img src="/img/pizzaCategoria1.jpg" alt="Categoria 1" class="category-image" />
          <h3 class="category-name">Pizzas Deliciosas</h3>
          <h3 class="category-name">115 Bs</h3>
          <!-- Botón con icono de carrito de PrimeIcons -->
          <button class="add-to-cart-btn">
            <i class="pi pi-cart-plus"></i> Agregar al carrito
          </button>
        </div>
        <div class="category-item">
          <img src="/img/pizzaCategoria2.jpg" alt="Categoria 2" class="category-image" />
          <h3 class="category-name">Pizzas Especiales</h3>
          <h3 class="category-name">75 Bs</h3>
          <!-- Botón con icono de carrito de PrimeIcons -->
          <button class="add-to-cart-btn">
            <i class="pi pi-cart-plus"></i> Agregar al carrito
          </button>
        </div>
        <div class="category-item">
          <img src="/img/pizzaCategoria3.jpeg" alt="Categoria 3" class="category-image" />
          <h3 class="category-name">Pizzas Cuatro Quesos</h3>
          <h3 class="category-name">100 Bs</h3>
          <!-- Botón con icono de carrito de PrimeIcons -->
          <button class="add-to-cart-btn">
            <i class="pi pi-cart-plus"></i> Agregar al carrito
          </button>
        </div>
      </div>

      <!-- Mostrar las categorías de ofertas de Bebidas -->
      <div v-if="mostrarBebidas" class="category-list">
        <div class="category-item">
          <img src="/img/frutasB.avif" alt="Categoria 1" class="category-image" />
          <h3 class="category-name">Batido de frutas</h3>
          <h3 class="category-name">10 Bs</h3>
          <!-- Botón con icono de carrito de PrimeIcons -->
          <button class="add-to-cart-btn">
            <i class="pi pi-cart-plus"></i> Agregar al carrito
          </button>
        </div>
        <div class="category-item">
          <img src="/img/gaseosaB2.webp" alt="Categoria 2" class="category-image" />
          <h3 class="category-name">Bebidas Gasosas</h3>
          <h3 class="category-name">20 Bs</h3>
          <!-- Botón con icono de carrito de PrimeIcons -->
          <button class="add-to-cart-btn">
            <i class="pi pi-cart-plus"></i> Agregar al carrito
          </button>
        </div>
        <div class="category-item">
          <img src="/img/naturalesB3.jpeg" alt="Categoria 3" class="category-image" />
          <h3 class="category-name">Jugos Naturales</h3>
          <h3 class="category-name">15 Bs</h3>
          <!-- Botón con icono de carrito de PrimeIcons -->
          <button class="add-to-cart-btn">
            <i class="pi pi-cart-plus"></i> Agregar al carrito
          </button>
        </div>
      </div>
    </section>

    <!-- Mostrar las categorías de ofertas de mostrarPollo -->
    <div v-if="mostrarPollo" class="category-list">
      <div class="category-item">
        <img src="/img/pollo.webp" alt="Categoria 1" class="category-image" />
        <h3 class="category-name">Alitas x12 PZ</h3>
        <h3 class="category-name">79 Bs</h3>
        <!-- Botón con icono de carrito de PrimeIcons -->
        <button class="add-to-cart-btn"><i class="pi pi-cart-plus"></i> Agregar al carrito</button>
      </div>
      <div class="category-item">
        <img src="/img/pollo.webp" alt="Categoria 2" class="category-image" />
        <h3 class="category-name">Alitas x6 PZ</h3>
        <h3 class="category-name">47 Bs</h3>
        <!-- Botón con icono de carrito de PrimeIcons -->
        <button class="add-to-cart-btn"><i class="pi pi-cart-plus"></i> Agregar al carrito</button>
      </div>
      <div class="category-item">
        <img src="/img/nuggets.jpeg" alt="Categoria 3" class="category-image" />
        <h3 class="category-name">Nuggets x12 PZ</h3>
        <h3 class="category-name">37 Bs</h3>
        <!-- Botón con icono de carrito de PrimeIcons -->
        <button class="add-to-cart-btn"><i class="pi pi-cart-plus"></i> Agregar al carrito</button>
      </div>
    </div>

    <!-- Mostrar las categorías de ofertas de mostrarCervezas -->
    <div v-if="mostrarCervezas" class="category-list">
      <div class="category-item">
        <img src="/img/fourloko.jpeg" alt="Categoria 1" class="category-image" />
        <h3 class="category-name">Four loko</h3>
        <h3 class="category-name">41 Bs</h3>
        <!-- Botón con icono de carrito de PrimeIcons -->
        <button class="add-to-cart-btn"><i class="pi pi-cart-plus"></i> Agregar al carrito</button>
      </div>
      <div class="category-item">
        <img src="/img/cerveza1.jpeg" alt="Categoria 2" class="category-image" />
        <h3 class="category-name">Cerveza Corona</h3>
        <h3 class="category-name">39 Bs</h3>
        <!-- Botón con icono de carrito de PrimeIcons -->
        <button class="add-to-cart-btn"><i class="pi pi-cart-plus"></i> Agregar al carrito</button>
      </div>
      <div class="category-item">
        <img src="/img/cerveza-huari.webp" alt="Categoria 3" class="category-image" />
        <h3 class="category-name">Cerveza Huari</h3>
        <h3 class="category-name">29 Bs</h3>
        <!-- Botón con icono de carrito de PrimeIcons -->
        <button class="add-to-cart-btn"><i class="pi pi-cart-plus"></i> Agregar al carrito</button>
      </div>
    </div>

    <!-- Mostrar las categorías de ofertas de  mostrarPostres -->
    <div v-if="mostrarPostres" class="category-list">
      <div class="category-item">
        <img src="/img/familiar.jpg" alt="Categoria 1" class="category-image" />
        <h3 class="category-name">Brownie de Chocolate Familiar</h3>
        <h3 class="category-name">50 Bs</h3>
        <!-- Botón con icono de carrito de PrimeIcons -->
        <button class="add-to-cart-btn"><i class="pi pi-cart-plus"></i> Agregar al carrito</button>
      </div>
      <div class="category-item">
        <img src="/img/personal.jpeg" alt="Categoria 2" class="category-image" />
        <h3 class="category-name">Brownie de Chocolate Personal</h3>
        <h3 class="category-name">25 Bs</h3>
        <!-- Botón con icono de carrito de PrimeIcons -->
        <button class="add-to-cart-btn"><i class="pi pi-cart-plus"></i> Agregar al carrito</button>
      </div>
      <div class="category-item">
        <img src="/img/pay.jpeg" alt="Categoria 3" class="category-image" />
        <h3 class="category-name">Pay de Limon</h3>
        <h3 class="category-name">18 Bs</h3>
        <!-- Botón con icono de carrito de PrimeIcons -->
        <button class="add-to-cart-btn"><i class="pi pi-cart-plus"></i> Agregar al carrito</button>
      </div>
    </div>

    <section class="ventas">
      <h2 class="section-title">Ofertas de Venta</h2>
      <div class="sales-list">
        <div class="category-item">
          <img src="/img/combo2.jpeg" alt="Oferta 1" class="sale-image" />
          <h3 class="sale-title">Combo 2 Pizzas</h3>
          <p class="sale-description">Compra 2 pizzas y obtén un 10% de descuento.</p>
          <h3 class="category-name">40 Bs</h3>
          <!-- Botón con icono de carrito de PrimeIcons -->
          <button class="add-to-cart-btn">
            <i class="pi pi-cart-plus"></i> Agregar al carrito
          </button>
        </div>
        <div class="category-item">
          <img src="/img/PIZZA-FAMILIAR.jpg" alt="Oferta 2" class="sale-image" />
          <h3 class="sale-title">Pizza Familiar</h3>
          <p class="sale-description">Pizza tamaño familiar con 3 ingredientes a elección.</p>
          <h3 class="category-name">26 Bs</h3>
          <!-- Botón con icono de carrito de PrimeIcons -->
          <button class="add-to-cart-btn">
            <i class="pi pi-cart-plus"></i> Agregar al carrito
          </button>
        </div>
      </div>
    </section>
    <section class="ubicacion">
  <h2 class="section-title">Visítanos</h2>
  <div class="map-container">
    <iframe
      src="https://www.google.com/maps?q=Sucre,+Bolivia&output=embed"
      width="100%" height="400" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0">
    </iframe>
  </div>
</section>


  </div>
</template>

<script>
export default {
  data() {
    return {
      mostrarOfertas: false,
      mostrarBebidas: false,
      mostrarPollo: false,
      mostrarCervezas: false,
      mostrarPostres: false
    }
  }
}
</script>

<style scoped>
.ubicacion {
  text-align: center;
  margin-top: 30px;
}

.map-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
}

.category-item {
  margin-bottom: 20px;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
}

.add-to-cart-btn {
  background-color: green;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin-top: 10px;
  width: 150px;
}

.add-to-cart-btn i {
  margin-right: 8px;
}
.add-to-cart-btn:hover {
  background-color: darkgreen;
}
.content {
  padding: 20px;
}
.categorias .section-title {
  color: white;
}

.section-title {
  text-align: center;
  font-size: 2rem;
  margin-top: 60px;
  margin-bottom: 20px;
  color: white;
}

.productos .section-title {
  color: white;
}

.descripcion-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
}

.descripcion-image {
  width: 40%;
  border-radius: 10px;
  margin-bottom: 80px;
}

.descripcion-text {
  width: 55%;
}

.descripcion-text h2 {
  font-size: 2rem;
  margin-bottom: 10px;
  color: white;
}

.descripcion-text p {
  font-size: 1.3rem;
  color: white;
  line-height: 1.6;
}

.descripcion-bajo-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
}

.descripcion-bajo-image {
  width: 40%;
  border-radius: 10px;
  margin-bottom: 40px;
}

.descripcion-bajo-text {
  width: 55%;
}

.descripcion-bajo-text h2 {
  font-size: 2rem;
  margin-bottom: 10px;
  color: white;
}

.descripcion-bajo-text p {
  font-size: 1.3rem;
  color: white;
  line-height: 1.6;
}

.product-list,
.category-list,
.sales-list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
}

.product-item,
.category-item,
.sale-item {
  background-color: #f4f4f4;
  border-radius: 10px;
  padding: 10px;
  width: 300px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

.product-item img,
.category-item img,
.sale-item img {
  width: 100%;
  border-radius: 10px;
}

.product-name,
.category-name,
.sale-title {
  font-size: 1.2rem;
  margin-top: 10px;
  color: black;
}

.product-price,
.sale-price {
  font-size: 1.5rem;
  margin-top: 5px;
  font-weight: bold;
  color: #2ecc71;
}

.product-description,
.sale-description {
  font-size: 1rem;
  margin-top: 5px;
}

.product-item:hover,
.category-item:hover,
.sale-item:hover {
  transform: translateY(-10px);
}

.horizontal-categories {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 30px;
}

.horizontal-category {
  background-color: #f7a634;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
}

.horizontal-category:hover {
  background-color: #474141;
}

.category-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 20px;
}

.category-item {
  text-align: center;
}

.category-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}
</style>
