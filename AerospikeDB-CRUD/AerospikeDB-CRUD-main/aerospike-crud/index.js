const express = require('express');
const Aerospike = require('aerospike');

const app = express();
app.use(express.json());

const client = Aerospike.client({hosts: [{ addr: 'db', port: 3000 }] 
});

client.connect().then(() => {
    console.log("Conectado a Aerospike");
}).catch(error => console.error("Error conectando:", error));

const createKey = (keyString) => new Aerospike.Key('test', 'rickandmorty', keyString.toString());

app.post('/character/:id', async (req, res) => {
    try {
        const charId = req.params.id;

        const response = await fetch(`https://rickandmortyapi.com/api/character/${charId}`);
        if (!response.ok) {
            return res.status(404).send({ error: 'Personaje no encontrado en la API externa' });
        }
        
        const data = await response.json();

        const bins = { 
            nombre: data.name, 
            estado: data.status, 
            especie: data.species,
            origen: data.origin.name
        };

        await client.put(createKey(charId), bins);
        res.status(201).send({ message: 'Personaje guardado en Aerospike', id: charId, data: bins });
    } catch (error) { 
        res.status(500).send({ error: error.message }); 
    }
});

app.get('/character/:id', async (req, res) => {
    try {
        const record = await client.get(createKey(req.params.id));
        res.status(200).send({ id: req.params.id, data: record.bins });
    } catch (error) { 
        res.status(404).send({ error: 'Personaje no encontrado en Aerospike' }); 
    }
});

app.put('/character/:id', async (req, res) => {
    try {
        const charId = req.params.id;
        const nuevosDatos = req.body; 

        await client.put(createKey(charId), nuevosDatos);
        res.status(200).send({ message: 'Personaje actualizado localmente', id: charId, actualizacion: nuevosDatos });
    } catch (error) { 
        res.status(500).send({ error: error.message }); 
    }
});

app.delete('/character/:id', async (req, res) => {
    try {
        await client.remove(createKey(req.params.id));
        res.status(200).send({ message: 'Personaje eliminado exitosamente de Aerospike' });
    } catch (error) { 
        res.status(500).send({ error: error.message }); 
    }
});

app.listen(4000, () => console.log(`Servidor CRUD en el puerto 4000 consumiendo Rick & Morty API`));