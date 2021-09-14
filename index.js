const express = require('express');
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const DB = {
    games: [ {
            id : 100, 
            name: 'Diablo', 
            year: 1994, 
            price: 100,
    },
    {
            id : 101, 
            name: 'Final Fantasy VII', 
            year: 1996, 
            price: 120,
    },
    {
            id : 102, 
            name: 'Final ', 
            year: 1996, 
            price: 120,
}
]}

// criando uma rota que retorna todos os jogos

app.get('/api/game', (request, response) => {
    response.json(DB.games);
});

app.get('/api/game/:id', (req, res) => {
    const idUser = req.params.id
    if(isNaN(idUser)) {
        res.sendStatus(400);
        res.send('Ops, o id informado não é um numero.');
    } else {
        const id = parseInt(idUser)
        const game = DB.games.find(index => index.id === id);
        if(game !== undefined) {
            res.statusCode = 200;
            res.json(game)
        }else {
            res.sendStatus(404)
        }
    }
});


//deletar um jogo a partir do id associado

app.delete('/api/game/:id', (req,res) => {
    const idUser = req.params.id
    if(isNaN(idUser)) {
        res.sendStatus(400);
        res.send('Ops, o id informado não é um numero.');
    } else {
        const id = parseInt(idUser)
        const game = DB.games.findIndex(index => index.id === id);
        if(game === -1) {
            //usuario informou um id que nao existe na base
            res.sendStatus = 404;
        }else {
            DB.games.splice(game, 1);
            res.sendStatus(200);
            res.json({message: 'Jogo removido com sucesso'})
        }
    }
});

//criando um jogo novo
app.post('/api/game', (req,res) => {
 const { name, year, price} = req.body;
 DB.game.push({
     id: Math.floor(Math.random()* 10 + 1),
     name,
     year,
     price,
 });
 
 res.send({message: 'Novo Criado com sucesso'});
});

// iniciando um app na porta 3000
app.listen(3000, () => {
    console.log('API RUNNING, http://localhost:3000');
});