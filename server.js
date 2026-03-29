const mercadopago = require('mercadopago');
mercadopago.configure({ access_token: 'TU_ACCESS_TOKEN_AQUI' });

app.post("/create_preference", (req, res) => {
    let preference = {
        items: req.body.items, // Aquí llegan los mangos, limones, etc.
        back_urls: {
            "success": "https://tuweb.com/pago-exitoso",
            "failure": "https://tuweb.com/pago-fallido",
        },
        auto_return: "approved",
    };

    mercadopago.preferences.create(preference)
        .then(response => res.json({ id: response.body.id }))
        .catch(error => console.log(error));
});