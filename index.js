/* Aprimore o projeto Trindade Places implementando uma rota GET com o path /places, que retorne a lista de lugares cadastrados na base de dados.

Essa rota permitirá aos usuários consultar todas as instituições públicas disponíveis na cidade de Trindade, fornecendo informações relevantes sobre cada uma delas.

Essa implementação é fundamental para a transparência e eficiência na gestão dos serviços públicos, permitindo aos cidadãos acessar informações sobre as instituições de forma fácil e rápida. Com isso, será possível melhorar a qualidade dos serviços públicos na cidade.
*/

const express = require('express');
const connection = require('./src/database');
const Place = require('./src/models/places');

const app = express();

app.use(express.json());        

connection.authenticate();
connection.sync({alter: true})
console.log('API ON') 

app.listen(3333, () => {
    console.log('SERVIDOR ON!')
}); 


app.post('/places', async (req, res) => {

    try {
         const place = {

        name: req.body.name,
       
        numberPhone: req.body.numberPhone,
  
        openingHours: req.body.openingHours,
  
        description: req.body.description,
 
        latitude: req.body.latitude,   
    
        longitude: req.body.longitude,
      }

         const newPlace = await Place.create(place)

             res.status(201).json(newPlace)

    } catch (error) {
        res.status(400).json({message: error.message})
    }
});


app.get('/places', async (req, res) => {
    try {

        const places = await Place.findAll()
        return res.json(places) 
    } 
    catch (error) {
        res.status(500).json({message: 'Não há dados'})
    }

})



