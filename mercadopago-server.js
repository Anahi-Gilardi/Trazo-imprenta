/**
 * ============================================================================
 * SERVIDOR OPCIONAL PARA MERCADO PAGO CHECKOUT PRO (Node.js + Express)
 * ============================================================================
 * Cómo usarlo cuando quieras activar el Checkout Pro automático con carrito:
 * 1. npm init -y
 * 2. npm install express cors mercadopago
 * 3. Reemplazá TU_ACCESS_TOKEN_DE_MERCADOPAGO y ejecutá: node mercadopago-server.js
 */

const express = require("express");
const cors = require("cors");
const { MercadoPagoConfig, Preference } = require("mercadopago");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Colocá acá tu Access Token de Producción o Prueba desde https://www.mercadopago.com.ar/developers/panel
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || "APP_USR-REEMPLAZAR-CON-TU-ACCESS-TOKEN"
});

app.post("/api/create_preference", async (req, res) => {
  try {
    const { items } = req.body;
    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: items.map((item) => ({
          title: item.name,
          quantity: Number(item.qty),
          unit_price: Number(item.price),
          currency_id: "ARS"
        })),
        back_urls: {
          success: "http://localhost:3000/#pago-exitoso",
          failure: "http://localhost:3000/#pago-fallido",
          pending: "http://localhost:3000/#pago-pendiente"
        },
        auto_return: "approved"
      }
    });

    res.json({ id: result.id, init_point: result.init_point });
  } catch (error) {
    console.error("Error creando preferencia de Mercado Pago:", error);
    res.status(500).json({ error: "No se pudo generar la preferencia de pago" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Trazo Espacio Gráfico corriendo en http://localhost:${PORT}`);
});
