const { MercadoPagoConfig, Preference } = require('mercadopago');

// CONFIGURA AQUÍ TU ACCESS TOKEN DE PRODUCCIÓN
const client = new MercadoPagoConfig({ 
    accessToken: 'APP_USR-1774152968143602-032917-35eecdb6f3f8c4f0089298308d296188-3299829753' 
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Solo se permite POST' });
    }

    try {
        const { items } = req.body;
        const preference = new Preference(client);

        const response = await preference.create({
            body: {
                items: items,
                back_urls: {
                    success: "https://tu-pagina.vercel.app/", // Cambia esto cuando tengas tu link de Vercel
                    failure: "https://tu-pagina.vercel.app/",
                    pending: "https://tu-pagina.vercel.app/"
                },
                auto_return: "approved",
            }
        });

        // Devolvemos el ID de la preferencia al frontend
        res.status(200).json({ id: response.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la preferencia' });
    }
}