// ============================================================================
// TRAZO ESPACIO GRÁFICO (@trazo.grafica) - Lógica Principal, Tienda & Panel Admin
// ============================================================================

const WHATSAPP_NUMBER = "5493585104732";
const STORAGE_KEYS = {
  PRODUCTS: "trazo_products_v4",
  CATEGORIES: "trazo_categories_v1",
  CART: "trazo_cart_v1",
  REVIEWS: "trazo_reviews_v2",
  OWNER_AUTH: "trazo_owner_logged_in",
  MP_CONFIG: "trazo_mp_config_v1"
};

// Credenciales del Login Escondido (pueden editarse aquí)
const OWNER_CREDENTIALS = {
  user: "admin",
  pass: "trazo2026"
};

const INITIAL_CATEGORIES = [
  "Kits Emprendedores",
  "Papelería & Tarjetas",
  "Stickers & Pines",
  "Fotoimanes & Eventos",
  "Corporativo & Sublimación"
];

// Catálogo inicial basado en el Instagram real de @trazo.grafica
const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Kit Esencial Emprendedor",
    category: "Kits Emprendedores",
    price: 35000,
    badge: "Ideal para empezar",
    image: "assets/img/kit-esencial.jpg?v=10",
    mpLink: "",
    description: "Incluye 50 stickers con tu logo + 10 imanes (5x5 cm) + 10 pines circulares (3.2 mm) + 20 tarjetas personales (8x5 cm). Ideal para pequeños negocios que quieren fortalecer su imagen."
  },
  {
    id: 2,
    name: "Kit Comercial Profesional",
    category: "Kits Emprendedores",
    price: 65000,
    badge: "Más elegido",
    image: "assets/img/kit-comercial.jpg?v=10",
    mpLink: "",
    description: "Incluye 100 stickers personalizados + 20 imanes (5x5 cm) + 20 pines circulares (3.2 mm) + 40 tarjetas personales (8x5 cm). Para locales y empresas que quieren promocionarse."
  },
  {
    id: 3,
    name: "Kit Corporativo Premium + Box",
    category: "Kits Emprendedores",
    price: 95000,
    badge: "Diseño sin cargo",
    image: "assets/img/kit-corporativo.jpg?v=10",
    mpLink: "",
    description: "Incluye 200 stickers personalizados + 30 imanes (5x5 cm) + 30 pines circulares (3.2 mm) + 100 tarjetas personales (8x5 cm) + Diseño y asesoramiento sin cargo."
  },
  {
    id: 4,
    name: "Tarjetas para tu Marca & Agradecimiento (x100 u.)",
    category: "Papelería & Tarjetas",
    price: 18500,
    badge: "Papel 300gr",
    image: "assets/img/tarjetas-marca.jpg?v=10",
    mpLink: "",
    description: "Mensajes que acompañan tu emprendimiento ('¡Gracias por tu compra!', tarjetas personales, fechas especiales). Impresión full color en papel ilustración 300gr."
  },
  {
    id: 5,
    name: "Planchas de Stickers Troquelados (x5 planchas)",
    category: "Stickers & Pines",
    price: 14000,
    badge: "Listos para usar",
    image: "assets/img/planchas-stickers.jpg?v=10",
    mpLink: "",
    description: "Potenciá tu marca con planchas de stickers autoadhesivos troquelados con la forma de tu logo o ilustraciones. Resistentes y de colores vibrantes."
  },
  {
    id: 6,
    name: "Pines Publicitarios / Prendedores 55mm (Pack x20)",
    category: "Stickers & Pines",
    price: 22000,
    badge: "Personalizados",
    image: "assets/img/pines-personalizados.jpg?v=10",
    mpLink: "",
    description: "Pines metálicos con alfiler de alta resistencia y acabado brillante. Ideales para marcas, clubes, eventos, egresados o acciones promocionales."
  },
  {
    id: 7,
    name: "Fotoimanes Personalizados Calidad Premium (Pack x15)",
    category: "Fotoimanes & Eventos",
    price: 19500,
    badge: "Papel fotográfico",
    image: "assets/img/fotoimanes.jpg?v=10",
    mpLink: "",
    description: "Nos enviás tus fotos por WhatsApp y las imprimimos en papel fotográfico premium laminado sobre imán completo. Ideales para regalos, viajes, cumpleaños y souvenirs."
  },
  {
    id: 8,
    name: "Tags Colgantes para Indumentaria y Marcas (x100 u.)",
    category: "Papelería & Tarjetas",
    price: 16800,
    badge: "Con perforación",
    image: "assets/img/tags-colgantes.jpg?v=10",
    mpLink: "",
    description: "Etiquetas colgantes en cartulina de alto gramaje con perforación lista para cordón o precinto. Dale identidad profesional a tus prendas y productos."
  },
  {
    id: 9,
    name: "Brochures y Revistas Corporativas",
    category: "Corporativo & Sublimación",
    price: 42000,
    badge: "Empresas",
    image: "assets/img/brochures-revistas.jpg?v=10",
    mpLink: "",
    description: "Revistas y catálogos editoriales que comunican la identidad, trayectoria y servicios de tu empresa con terminación profesional."
  },
  {
    id: 10,
    name: "Folletos Corporativos Trípticos / Dípticos (x100 u.)",
    category: "Corporativo & Sublimación",
    price: 28000,
    badge: "Full Color",
    image: "assets/img/folletos-corporativos.jpg?v=10",
    mpLink: "",
    description: "Folletería comercial impresa doble faz full color en papel ilustración, doblada y lista para entregar en ferias, comercios o visitas técnicas."
  },
  {
    id: 11,
    name: "Stand Creativo · Tatuajes Temporales para Eventos",
    category: "Fotoimanes & Eventos",
    price: 24500,
    badge: "Eventos",
    image: "assets/img/tatuajes-temporales.jpg?v=10",
    mpLink: "",
    description: "Pack de tatuajes temporales personalizados listos para activar con agua, más cartel instructivo para casamientos, fiestas de 15, cumpleaños y eventos de marca."
  },
  {
    id: 12,
    name: "Pack Papeles Transfer para Sublimar Prendas",
    category: "Corporativo & Sublimación",
    price: 15900,
    badge: "Línea textil",
    image: "assets/img/papeles-sublimacion.jpg?v=10",
    mpLink: "",
    description: "Papeles específicos para sublimar tus prendas con transferencia nítida y colores intensos que cumplen con los más altos estándares."
  }
];

// Reseñas reales inspiradas en los clientes del feed de @trazo.grafica
const INITIAL_REVIEWS = [
  {
    id: 1,
    author: "El Mundo de Patalín",
    location: "Río Cuarto",
    product: "Planchas de Stickers + Pines",
    stars: 5,
    comment: "Las planchas de stickers y los pines quedaron impecables. Los colores súper nítidos y listos para despegar. Nuestros clientes destacan cada detalle del packaging."
  },
  {
    id: 2,
    author: "El Colono Construcciones",
    location: "Córdoba",
    product: "Brochures Corporativos & Pines",
    stars: 5,
    comment: "Excelente asesoramiento y calidad de impresión en los brochures institucionales, las cajas de presentación y los pines identificatorios para todo nuestro equipo."
  },
  {
    id: 3,
    author: "Niñato Kids",
    location: "Río Cuarto",
    product: "Tags Colgantes & Tarjetas",
    stars: 5,
    comment: "Los tags colgantes para nuestras prendas le dieron un salto de calidad enorme a la marca. Muy prolijos, puntuales y atentos en cada detalle."
  },
  {
    id: 4,
    author: "Valentina M.",
    location: "Envío a Buenos Aires",
    product: "Fotoimanes Personalizados",
    stars: 5,
    comment: "Les envié las fotos por WhatsApp y en pocos días recibí los fotoimanes con una presentación excelente. Calidad fotográfica real."
  }
];

// Estado en memoria
let products = [];
let categories = [];
let cart = [];
let reviews = [];
let currentCategory = "todos";
let isOwnerLoggedIn = false;
let uploadedBase64Image = "";
let mpConfig = {
  publicKey: "",
  alias: "trazo.grafica.mp"
};

// Formateador de moneda ARS ($35.000)
function formatARS(amount) {
  return "$" + Number(amount || 0).toLocaleString("es-AR");
}

// Inicialización al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  loadStateFromStorage();
  renderCategoriesUI();
  renderProducts();
  renderReviews();
  updateCartUI();
  updateOwnerUI();
  setupSecretLogoClick();

  // Atajo de teclado oculto para el dueño: Alt + A
  window.addEventListener("keydown", (e) => {
    if (e.altKey && (e.key === "a" || e.key === "A")) {
      e.preventDefault();
      handleSecretAccess();
    }
  });

  // También permite abrir el login oculto si la URL termina en #admin
  if (window.location.hash === "#admin") {
    handleSecretAccess();
  }
});

function loadStateFromStorage() {
  try {
    localStorage.removeItem("trazo_products_v1");
    localStorage.removeItem("trazo_products_v2");
    localStorage.removeItem("trazo_products_v3");

    const savedProds = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    products = savedProds ? JSON.parse(savedProds) : [...INITIAL_PRODUCTS];

    // Asegurar que las imágenes locales usen la versión HD (?v=10)
    products.forEach((p) => {
      if (p.image && p.image.startsWith("assets/img/")) {
        p.image = p.image.split("?")[0] + "?v=10";
      }
    });

    const savedCats = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    categories = savedCats ? JSON.parse(savedCats) : [...INITIAL_CATEGORIES];

    // Asegurar que cualquier categoría usada por algún producto exista en la lista
    products.forEach((p) => {
      if (p.category && !categories.includes(p.category)) {
        categories.push(p.category);
      }
    });

    const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
    cart = savedCart ? JSON.parse(savedCart) : [];
    cart.forEach((item) => {
      if (item.image && item.image.startsWith("assets/img/")) {
        item.image = item.image.split("?")[0] + "?v=10";
      }
    });

    const savedReviews = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    reviews = savedReviews ? JSON.parse(savedReviews) : [...INITIAL_REVIEWS];

    isOwnerLoggedIn = localStorage.getItem(STORAGE_KEYS.OWNER_AUTH) === "true";

    const savedMp = localStorage.getItem(STORAGE_KEYS.MP_CONFIG);
    if (savedMp) {
      mpConfig = JSON.parse(savedMp);
    }
  } catch (err) {
    products = [...INITIAL_PRODUCTS];
    categories = [...INITIAL_CATEGORIES];
    cart = [];
    reviews = [...INITIAL_REVIEWS];
  }
}

function saveProductsToStorage() {
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
}

function saveCategoriesToStorage() {
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
}

function saveCartToStorage() {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
}

// ============================================================================
// RENDERIZADO DEL MÓDULO DE PRODUCTOS
// ============================================================================
function filterByCategory(category, btnEl) {
  currentCategory = category;
  const pills = document.querySelectorAll(".cat-pill");
  pills.forEach((pill) => {
    if (pill.dataset.cat === category) {
      pill.classList.add("active");
    } else {
      pill.classList.remove("active");
    }
  });
  renderProducts();
}

function renderProducts() {
  const grid = document.getElementById("productsGrid");
  const searchQuery = (document.getElementById("searchInput")?.value || "").toLowerCase().trim();
  const sortCriteria = document.getElementById("sortSelect")?.value || "featured";

  let filtered = products.filter((p) => {
    const matchesCategory = currentCategory === "todos" || p.category === currentCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery) ||
      p.description.toLowerCase().includes(searchQuery) ||
      p.category.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  if (sortCriteria === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortCriteria === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortCriteria === "name-asc") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align:center; padding:3rem; background:#FFF; border-radius:16px; border:1.5px dashed var(--border-light);">
        <h3 style="margin-bottom:0.5rem;">No se encontraron productos para esta búsqueda</h3>
        <p style="color:var(--ink-muted); margin-bottom:1rem;">Probá buscando otro término o seleccionando la categoría "Todos".</p>
        <button class="btn btn-secondary" onclick="filterByCategory('todos')">Ver todos los productos</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered
    .map(
      (prod) => `
      <article class="product-card">
        <div class="product-img-wrap">
          <img src="${prod.image}" alt="${escapeHtml(prod.name)}" onerror="this.src='assets/img/combo-favoritos.jpg'" />
          ${
            isOwnerLoggedIn
              ? `
            <div class="owner-card-Tools">
              <button class="owner-icon-btn" onclick="startEditProduct(${prod.id})" title="Editar producto">Editar</button>
              <button class="owner-icon-btn delete" onclick="deleteProduct(${prod.id})" title="Eliminar producto">Eliminar</button>
            </div>
          `
              : ""
          }
        </div>
        <div class="product-body">
          <div class="product-meta-row">
            <span class="product-category">${escapeHtml(prod.category)}</span>
            ${prod.badge ? `<span class="product-badge">${escapeHtml(prod.badge)}</span>` : ""}
          </div>
          <h3 class="product-title">${escapeHtml(prod.name)}</h3>
          <p class="product-desc">${escapeHtml(prod.description)}</p>
          <div class="product-footer">
            <div class="product-price-row">
              <span class="product-price">${formatARS(prod.price)}</span>
            </div>
            <div class="product-actions">
              <button class="btn-card btn-card-add" onclick="addToCart(${prod.id})">
                Agregar
              </button>
              <button class="btn-card btn-card-mp" onclick="buyNowWithMP(${prod.id})">
                Comprar ahora
              </button>
            </div>
          </div>
        </div>
      </article>
    `
    )
    .join("");
}

// ============================================================================
// CARRITO DE COMPRAS & INTEGRACIÓN CON MERCADO PAGO
// ============================================================================
function addToCart(productId) {
  const prod = products.find((p) => p.id === productId);
  if (!prod) return;

  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: prod.id,
      name: prod.name,
      price: prod.price,
      image: prod.image,
      mpLink: prod.mpLink || "",
      qty: 1
    });
  }

  saveCartToStorage();
  updateCartUI();
  showToast(`"${prod.name}" agregado al carrito`);
}

function quickBuyKit(kitProductId) {
  addToCart(kitProductId);
  toggleCart(true);
}

function buyNowWithMP(productId) {
  const prod = products.find((p) => p.id === productId);
  if (!prod) return;

  const existing = cart.find((item) => item.id === productId);
  if (!existing) {
    cart.push({
      id: prod.id,
      name: prod.name,
      price: prod.price,
      image: prod.image,
      mpLink: prod.mpLink || "",
      qty: 1
    });
    saveCartToStorage();
    updateCartUI();
  }
  openMercadoPagoCheckout(prod.mpLink);
}

function changeCartQty(productId, delta) {
  const index = cart.findIndex((item) => item.id === productId);
  if (index === -1) return;

  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  saveCartToStorage();
  updateCartUI();
}

function updateCartUI() {
  const countEl = document.getElementById("cartCount");
  const container = document.getElementById("cartItemsContainer");
  const totalEl = document.getElementById("cartTotalValue");

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  if (countEl) countEl.textContent = totalItems;
  if (totalEl) totalEl.textContent = formatARS(totalAmount);

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:3rem 1rem; color:var(--ink-muted);">
        <p style="font-weight:600; color:var(--ink-black);">Tu carrito está vacío</p>
        <p style="font-size:0.86rem; margin-top:0.35rem;">Seleccioná un producto del catálogo para iniciar tu pedido.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = cart
    .map(
      (item) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${escapeHtml(item.name)}" onerror="this.src='assets/img/combo-favoritos.jpg'" />
        <div class="cart-item-info">
          <div class="cart-item-title">${escapeHtml(item.name)}</div>
          <div class="cart-item-price">${formatARS(item.price)} c/u · Subtotal: <strong>${formatARS(item.price * item.qty)}</strong></div>
          <div class="qty-controls">
            <button class="qty-btn" onclick="changeCartQty(${item.id}, -1)">−</button>
            <span style="font-size:0.84rem; font-weight:700;">${item.qty}</span>
            <button class="qty-btn" onclick="changeCartQty(${item.id}, 1)">+</button>
          </div>
        </div>
      </div>
    `
    )
    .join("");
}

function toggleCart(open) {
  const drawer = document.getElementById("cartDrawer");
  const backdrop = document.getElementById("cartBackdrop");
  if (open) {
    drawer.classList.add("open");
    backdrop.classList.add("open");
  } else {
    drawer.classList.remove("open");
    backdrop.classList.remove("open");
  }
}

// ============================================================================
// FLUJO MERCADO PAGO (SDK V2 / LINK DE PAGO / CHECKOUT PRO)
// ============================================================================
let activeDirectMpLink = "";

function openMercadoPagoCheckout(customMpLink = "") {
  if (cart.length === 0) {
    showToast("Agregá al menos un producto al carrito primero");
    return;
  }

  toggleCart(false);
  activeDirectMpLink = customMpLink || (cart.length === 1 ? cart[0].mpLink : "");

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingText =
    document.getElementById("shippingMethod")?.value === "envio"
      ? "Modalidad: Envío a domicilio / Correo (Todo el país)"
      : "Modalidad: Retiro en Estudio Trazo (Río Cuarto)";

  const summaryEl = document.getElementById("mpOrderSummary");
  summaryEl.innerHTML = `
    <div style="margin-bottom:0.5rem; font-weight:700;">Detalle del pedido:</div>
    <ul style="padding-left:1.1rem; margin-bottom:0.75rem;">
      ${cart
        .map(
          (i) =>
            `<li>${i.qty}x ${escapeHtml(i.name)} — <strong>${formatARS(i.price * i.qty)}</strong></li>`
        )
        .join("")}
    </ul>
    <div style="font-size:0.82rem; color:var(--ink-muted); margin-bottom:0.5rem;">${shippingText}</div>
    <div style="display:flex; justify-content:space-between; font-size:1.1rem; font-weight:800; padding-top:0.5rem; border-top:1px solid var(--border-light);">
      <span>Total a abonar:</span>
      <span style="color:var(--mp-blue);">${formatARS(totalAmount)}</span>
    </div>
  `;

  document.getElementById("mpAliasDisplay").textContent = mpConfig.alias || "trazo.grafica.mp";
  document.getElementById("mpModal").classList.add("open");
}

function triggerMercadoPagoRedirect() {
  if (activeDirectMpLink && activeDirectMpLink.startsWith("http")) {
    window.open(activeDirectMpLink, "_blank", "noopener");
    return;
  }

  if (mpConfig.publicKey && window.MercadoPago) {
    showToast("Iniciando preferencia de Mercado Pago...");
  }

  navigator.clipboard?.writeText(mpConfig.alias || "trazo.grafica.mp");
  showToast("Alias copiado. Abriendo Mercado Pago...");
  window.open("https://www.mercadopago.com.ar/", "_blank", "noopener");
}

function checkoutViaWhatsApp(alreadyPaid = false) {
  if (cart.length === 0) {
    showToast("Tu carrito está vacío");
    return;
  }

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping =
    document.getElementById("shippingMethod")?.value === "envio"
      ? "Envío a domicilio / Correo (Todo el país)"
      : "Retiro en Río Cuarto";

  const lines = cart.map((i) => `- ${i.qty}x ${i.name} (${formatARS(i.price * i.qty)})`).join("\n");
  const header = alreadyPaid
    ? "Hola Trazo Espacio Gráfico. Ya realicé el pago por Mercado Pago de mi pedido web:"
    : "Hola Trazo Espacio Gráfico. Quiero realizar el siguiente pedido desde la web:";

  const text = `${header}\n\n${lines}\n\nTotal: ${formatARS(totalAmount)}\nEntrega: ${shipping}\n\nEnvío a continuación mis archivos para coordinar el diseño.`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener");
}

// ============================================================================
// LOGIN ESCONDIDO Y PANEL DE ADMINISTRACIÓN (CRUD DE PRODUCTOS)
// ============================================================================
function setupSecretLogoClick() {
  const logo = document.getElementById("brandLogoSecret");
  if (!logo) return;

  let clicks = 0;
  let timer = null;
  logo.addEventListener("click", (e) => {
    clicks++;
    clearTimeout(timer);
    if (clicks >= 3) {
      e.preventDefault();
      clicks = 0;
      handleSecretAccess();
    } else {
      timer = setTimeout(() => {
        clicks = 0;
      }, 650);
    }
  });
}

function handleSecretAccess() {
  if (isOwnerLoggedIn) {
    openAdminPanel();
  } else {
    document.getElementById("loginError").style.display = "none";
    document.getElementById("loginModal").classList.add("open");
  }
}

function submitOwnerLogin(event) {
  event.preventDefault();
  const user = document.getElementById("loginUser").value.trim();
  const pass = document.getElementById("loginPass").value.trim();

  if (user === OWNER_CREDENTIALS.user && pass === OWNER_CREDENTIALS.pass) {
    isOwnerLoggedIn = true;
    localStorage.setItem(STORAGE_KEYS.OWNER_AUTH, "true");
    closeModal("loginModal");
    updateOwnerUI();
    renderProducts();
    openAdminPanel();
    showToast("Sesión de administrador iniciada");
  } else {
    document.getElementById("loginError").style.display = "block";
  }
}

function logoutOwner() {
  isOwnerLoggedIn = false;
  localStorage.removeItem(STORAGE_KEYS.OWNER_AUTH);
  closeModal("adminModal");
  updateOwnerUI();
  renderProducts();
  showToast("Sesión de administrador cerrada");
}

function updateOwnerUI() {
  const pill = document.getElementById("adminStatusBtn");
  const topAddBtn = document.getElementById("ownerAddProductTopBtn");

  if (isOwnerLoggedIn) {
    pill?.classList.add("active");
    if (topAddBtn) topAddBtn.style.display = "inline-flex";
  } else {
    pill?.classList.remove("active");
    if (topAddBtn) topAddBtn.style.display = "none";
  }
}

function openAdminPanel() {
  if (!isOwnerLoggedIn) {
    handleSecretAccess();
    return;
  }
  document.getElementById("mpPublicKeyInput").value = mpConfig.publicKey || "";
  document.getElementById("mpAliasInput").value = mpConfig.alias || "trazo.grafica.mp";
  renderCategoriesUI();
  renderAdminTable();
  document.getElementById("adminModal").classList.add("open");
}

// ============================================================================
// GESTIÓN DE CATEGORÍAS (AGREGAR, EDITAR Y ELIMINAR CATEGORÍAS)
// ============================================================================
function renderCategoriesUI() {
  // 1. Renderizar las píldoras de filtro en el catálogo público
  const pillsContainer = document.getElementById("categoryPills");
  if (pillsContainer) {
    if (currentCategory !== "todos" && !categories.includes(currentCategory)) {
      currentCategory = "todos";
    }
    const allBtn = `<button class="cat-pill ${currentCategory === "todos" ? "active" : ""}" data-cat="todos" onclick="filterByCategory('todos', this)">Todos</button>`;
    const catBtns = categories
      .map((cat) => {
        const isActive = currentCategory === cat ? "active" : "";
        const safeJsCat = cat.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
        return `<button class="cat-pill ${isActive}" data-cat="${escapeHtml(cat)}" onclick="filterByCategory('${safeJsCat}', this)">${escapeHtml(cat)}</button>`;
      })
      .join("");
    pillsContainer.innerHTML = allBtn + catBtns;
  }

  // 2. Renderizar el selector <select id="prodCategory"> del formulario de productos
  const selectEl = document.getElementById("prodCategory");
  if (selectEl) {
    const previousValue = selectEl.value;
    selectEl.innerHTML = categories
      .map((cat) => `<option value="${escapeHtml(cat)}">${escapeHtml(cat)}</option>`)
      .join("");
    if (previousValue && categories.includes(previousValue)) {
      selectEl.value = previousValue;
    }
  }

  // 3. Renderizar también el selector del Cotizador a Medida (#qProduct) o la lista del Admin
  const adminCatList = document.getElementById("adminCategoriesList");
  if (adminCatList) {
    adminCatList.innerHTML = categories
      .map((cat, idx) => {
        const count = products.filter((p) => p.category === cat).length;
        return `
          <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-white); padding:0.4rem 0.65rem; border-radius:8px; border:1px solid var(--border-light); font-size:0.8rem;">
            <span><strong>${escapeHtml(cat)}</strong> <span style="color:var(--ink-muted); font-size:0.74rem;">(${count})</span></span>
            <div style="display:flex; gap:0.3rem;">
              <button type="button" class="owner-icon-btn" style="padding:0.2rem 0.45rem; font-size:0.72rem;" onclick="editCategoryFromAdmin(${idx})">Editar</button>
              <button type="button" class="owner-icon-btn delete" style="padding:0.2rem 0.45rem; font-size:0.72rem;" onclick="deleteCategoryFromAdmin(${idx})">Eliminar</button>
            </div>
          </div>
        `;
      })
      .join("");
  }
}

function addCategoryFromAdmin() {
  const input = document.getElementById("newCategoryInput");
  const newCat = (input?.value || "").trim();
  if (!newCat) {
    showToast("Escribí el nombre de la categoría para agregarla");
    return;
  }

  if (categories.some((c) => c.toLowerCase() === newCat.toLowerCase())) {
    showToast("Esa categoría ya existe");
    return;
  }

  categories.push(newCat);
  saveCategoriesToStorage();
  renderCategoriesUI();

  // Seleccionar automáticamente la nueva categoría en el formulario de producto
  const selectEl = document.getElementById("prodCategory");
  if (selectEl) selectEl.value = newCat;

  input.value = "";
  showToast(`Categoría "${newCat}" agregada`);
}

function editCategoryFromAdmin(index) {
  const oldCat = categories[index];
  if (!oldCat) return;

  const updated = prompt(`Editar nombre de la categoría "${oldCat}":`, oldCat);
  if (updated === null) return;

  const cleanName = updated.trim();
  if (!cleanName || cleanName === oldCat) return;

  if (categories.some((c, i) => i !== index && c.toLowerCase() === cleanName.toLowerCase())) {
    showToast("Ya existe otra categoría con ese nombre");
    return;
  }

  categories[index] = cleanName;

  // Actualizar todos los productos que tenían la categoría anterior
  products.forEach((p) => {
    if (p.category === oldCat) {
      p.category = cleanName;
    }
  });

  if (currentCategory === oldCat) {
    currentCategory = cleanName;
  }

  saveCategoriesToStorage();
  saveProductsToStorage();
  renderCategoriesUI();
  renderProducts();
  renderAdminTable();
  showToast(`Categoría actualizada a "${cleanName}"`);
}

function deleteCategoryFromAdmin(index) {
  const catToDelete = categories[index];
  if (!catToDelete) return;

  if (categories.length <= 1) {
    showToast("Debe quedar al menos una categoría activa");
    return;
  }

  const affectedProducts = products.filter((p) => p.category === catToDelete);
  const fallbackCategory = categories.find((_, i) => i !== index) || "General";

  const confirmMsg =
    affectedProducts.length > 0
      ? `¿Eliminar la categoría "${catToDelete}"?\nLos ${affectedProducts.length} producto(s) de esta categoría pasarán a "${fallbackCategory}".`
      : `¿Seguro que querés eliminar la categoría "${catToDelete}"?`;

  if (!confirm(confirmMsg)) return;

  categories.splice(index, 1);

  if (affectedProducts.length > 0) {
    products.forEach((p) => {
      if (p.category === catToDelete) {
        p.category = fallbackCategory;
      }
    });
    saveProductsToStorage();
  }

  if (currentCategory === catToDelete) {
    currentCategory = "todos";
  }

  saveCategoriesToStorage();
  renderCategoriesUI();
  renderProducts();
  renderAdminTable();
  showToast(`Categoría "${catToDelete}" eliminada`);
}

function renderAdminTable() {
  const tbody = document.getElementById("adminProductsTableBody");
  const countSpan = document.getElementById("adminProdCount");
  if (countSpan) countSpan.textContent = products.length;
  if (!tbody) return;

  tbody.innerHTML = products
    .map(
      (p) => `
      <tr>
        <td><img src="${p.image}" alt="${escapeHtml(p.name)}" onerror="this.src='assets/img/combo-favoritos.jpg'" /></td>
        <td>
          <strong>${escapeHtml(p.name)}</strong><br/>
          <span style="font-size:0.75rem; color:var(--ink-muted);">${escapeHtml(p.category)}</span>
        </td>
        <td style="font-weight:700;">${formatARS(p.price)}</td>
        <td>
          <div style="display:flex; gap:0.35rem;">
            <button class="owner-icon-btn" onclick="startEditProduct(${p.id})">Editar</button>
            <button class="owner-icon-btn delete" onclick="deleteProduct(${p.id})">Eliminar</button>
          </div>
        </td>
      </tr>
    `
    )
    .join("");
}

// Subida y compresión de imágenes desde la PC o celular del dueño
function handleImageUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement("canvas");
      const maxDim = 800;
      let width = img.width;
      let height = img.height;

      if (width > height && width > maxDim) {
        height = Math.round((height * maxDim) / width);
        width = maxDim;
      } else if (height > maxDim) {
        width = Math.round((width * maxDim) / height);
        height = maxDim;
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      uploadedBase64Image = canvas.toDataURL("image/jpeg", 0.85);
      document.getElementById("prodImageUrl").value = "";
      previewImageUrl(uploadedBase64Image);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function previewImageUrl(url) {
  const box = document.getElementById("imagePreviewBox");
  const finalSrc = url || uploadedBase64Image;
  if (!finalSrc) {
    box.innerHTML = `<span style="font-size:0.8rem; color:var(--ink-muted);">Vista previa de la imagen</span>`;
    return;
  }
  box.innerHTML = `<img src="${finalSrc}" alt="Vista previa" onerror="this.src='assets/img/combo-favoritos.jpg'" />`;
}

function saveProductFromAdmin(event) {
  event.preventDefault();
  const idVal = document.getElementById("prodId").value;
  const name = document.getElementById("prodName").value.trim();
  const price = Number(document.getElementById("prodPrice").value);
  const category = document.getElementById("prodCategory").value;
  const badge = document.getElementById("prodBadge").value.trim();
  const mpLink = document.getElementById("prodMpLink").value.trim();
  const description = document.getElementById("prodDesc").value.trim();
  const urlInput = document.getElementById("prodImageUrl").value.trim();

  const image = uploadedBase64Image || urlInput || "assets/img/combo-favoritos.jpg";

  if (idVal) {
    const id = Number(idVal);
    const idx = products.findIndex((p) => p.id === id);
    if (idx !== -1) {
      products[idx] = {
        ...products[idx],
        name,
        price,
        category,
        badge,
        mpLink,
        description,
        image
      };
      showToast(`Producto "${name}" actualizado`);
    }
  } else {
    const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    products.unshift({
      id: newId,
      name,
      price,
      category,
      badge,
      mpLink,
      description,
      image
    });
    showToast(`Producto "${name}" agregado al catálogo`);
  }

  saveProductsToStorage();
  renderCategoriesUI();
  renderProducts();
  renderAdminTable();
  resetAdminForm();
}

function startEditProduct(productId) {
  const prod = products.find((p) => p.id === productId);
  if (!prod) return;

  openAdminPanel();
  document.getElementById("adminFormTitle").textContent = `Editando: ${prod.name}`;
  document.getElementById("saveProdBtn").textContent = "Guardar Cambios";
  document.getElementById("prodId").value = prod.id;
  document.getElementById("prodName").value = prod.name;
  document.getElementById("prodPrice").value = prod.price;
  document.getElementById("prodCategory").value = prod.category;
  document.getElementById("prodBadge").value = prod.badge || "";
  document.getElementById("prodMpLink").value = prod.mpLink || "";
  document.getElementById("prodDesc").value = prod.description;

  uploadedBase64Image = prod.image.startsWith("data:image") ? prod.image : "";
  document.getElementById("prodImageUrl").value = prod.image.startsWith("data:image") ? "" : prod.image;
  previewImageUrl(prod.image);
}

function deleteProduct(productId) {
  const prod = products.find((p) => p.id === productId);
  if (!prod) return;

  if (!confirm(`¿Seguro que querés eliminar "${prod.name}" del catálogo?`)) return;

  products = products.filter((p) => p.id !== productId);
  saveProductsToStorage();
  renderCategoriesUI();
  renderProducts();
  renderAdminTable();
  showToast("Producto eliminado");
}

function resetAdminForm() {
  document.getElementById("productCrudForm").reset();
  document.getElementById("prodId").value = "";
  uploadedBase64Image = "";
  document.getElementById("adminFormTitle").textContent = "Nuevo Producto";
  document.getElementById("saveProdBtn").textContent = "Guardar Producto";
  previewImageUrl("");
}

function saveMpConfig() {
  mpConfig.publicKey = document.getElementById("mpPublicKeyInput").value.trim();
  mpConfig.alias = document.getElementById("mpAliasInput").value.trim() || "trazo.grafica.mp";
  localStorage.setItem(STORAGE_KEYS.MP_CONFIG, JSON.stringify(mpConfig));
  showToast("Configuración de Mercado Pago guardada");
}

function exportCatalogJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", "catalogo-trazo-grafica.json");
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

function resetDefaultCatalog() {
  if (!confirm("¿Querés restaurar los productos y categorías originales de @trazo.grafica?")) return;
  products = [...INITIAL_PRODUCTS];
  categories = [...INITIAL_CATEGORIES];
  saveProductsToStorage();
  saveCategoriesToStorage();
  renderCategoriesUI();
  renderProducts();
  renderAdminTable();
  showToast("Catálogo y categorías originales restaurados");
}

// ============================================================================
// MÓDULO DE RESEÑAS
// ============================================================================
function renderReviews() {
  const grid = document.getElementById("reviewsGrid");
  if (!grid) return;

  grid.innerHTML = reviews
    .map(
      (r) => `
      <div class="review-card">
        <div>
          <div class="review-stars">${"★".repeat(r.stars)}${"☆".repeat(5 - r.stars)}</div>
          <p class="review-text" style="margin-top:0.65rem;">“${escapeHtml(r.comment)}”</p>
        </div>
        <div class="review-author">
          <div>
            <strong>${escapeHtml(r.author)}</strong>
            <span>${escapeHtml(r.location || "Argentina")}</span>
          </div>
          <span class="review-product-pill">${escapeHtml(r.product)}</span>
        </div>
      </div>
    `
    )
    .join("");
}

function openReviewModal() {
  document.getElementById("reviewModal").classList.add("open");
}

function submitNewReview(event) {
  event.preventDefault();
  const author = document.getElementById("revName").value.trim();
  const product = document.getElementById("revProduct").value.trim();
  const stars = Number(document.getElementById("revStars").value);
  const comment = document.getElementById("revComment").value.trim();

  reviews.unshift({
    id: Date.now(),
    author,
    location: "Cliente Verificado",
    product,
    stars,
    comment
  });

  localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  renderReviews();
  closeModal("reviewModal");
  event.target.reset();
  showToast("Gracias por compartir tu reseña");
}

// ============================================================================
// COTIZADOR A MEDIDA & FAQ
// ============================================================================
function sendCustomQuote(event) {
  event.preventDefault();
  const name = document.getElementById("qName").value.trim();
  const city = document.getElementById("qCity").value.trim();
  const product = document.getElementById("qProduct").value;
  const qty = document.getElementById("qQty").value.trim();
  const details = document.getElementById("qDetails").value.trim();

  const msg = `Hola Trazo Espacio Gráfico. Solicito un presupuesto a medida desde la web:\n\n- Nombre/Empresa: ${name}\n- Ciudad: ${city}\n- Trabajo: ${product}\n- Cantidad: ${qty}\n- Detalles: ${details || "A conversar"}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
}

function toggleFaq(btn) {
  const item = btn.closest(".faq-item");
  item.classList.toggle("open");
}

// ============================================================================
// MENÚ MÓVIL / TABLET & UTILIDADES GENERALES
// ============================================================================
function toggleMobileMenu() {
  const navLinks = document.getElementById("navLinks");
  const menuBtn = document.getElementById("mobileMenuBtn");
  if (!navLinks || !menuBtn) return;
  const isOpen = navLinks.classList.toggle("mobile-open");
  menuBtn.classList.toggle("open", isOpen);
  menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
}

function closeMobileMenu() {
  const navLinks = document.getElementById("navLinks");
  const menuBtn = document.getElementById("mobileMenuBtn");
  if (!navLinks || !menuBtn) return;
  navLinks.classList.remove("mobile-open");
  menuBtn.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
}

// Cerrar el menú móvil al tocar fuera de la barra de navegación
document.addEventListener("click", (e) => {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.getElementById("navLinks");
  if (navLinks && navLinks.classList.contains("mobile-open") && navbar && !navbar.contains(e.target)) {
    closeMobileMenu();
  }
});

function closeModal(modalId) {
  document.getElementById(modalId)?.classList.remove("open");
}

function showToast(message) {
  const toast = document.getElementById("toastMsg");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
