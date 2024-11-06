const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const con = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    database:'stockcar'
});

con.connect((err) =>{
    if(err) {
        console.error('Erro ao conectar ao banco de dados', err);
        return;
    }
    console.log('Conectado ao banco de dados.');
});

const teste = (req, res) => {
    res.send("Back-end respondendo");
}

// CRUD - Create clientes
const createclientes = (req, res) => {
    const {cliente_id, nome, cpf, email, endereco, data_nascimento, data_cadastro} =req.body;

    const query = 'INSERT INTO clientes (cliente_id, nome, cpf, email, endereco, data_nascimento, data_cadastro) VALUES(?, ?, ?, ?, ?, ?, ?)';
    con.query(query, [cliente_id, nome, cpf, email, endereco, data_nascimento, data_cadastro], (err,result) => {
        if(err) {
            res.status(500).json({error: err.message});
        } else {
            res.status(201).json({message: 'clientes criado com sucesso', result});
        }

    });
}

//CRUD - Read clientes
const readclientes = (req, res) => {
    con.query("SELECT * FROM clientes",(err,result) => {
        if(err) {
            res.status(500).json({error: err.message});
        } else {
            res.json(result);
        }
    });
}

// CRUD - Update clientes
const updateclientes = (req, res) => {
    const {nome, cpf, email, endereco, data_nascimento, data_cadastro, cliente_id} = req.body;

    const query = 'UPDATE clientes SET nome = ?, cpf = ?, email = ?, endereco = ?, data_nascimento = ?, data_cadastro = ? WHERE cliente_id = ?'
    con.query(query, [nome, cpf, email, endereco, data_nascimento, data_cadastro, cliente_id], (err, result)=>{
        if(err) {
            res.status(500).json({error: err.message});
        }else {
            res.json({message:'clientes atualizado com sucesso', result});
        }
    });
}


//CRUD - Delete cliente
const deleteclientes = (req, res) => {
    const {cliente_id} = req.params;

    const query = 'DELETE FROM clientes WHERE cliente_id = ?';
    con.query(query, [cliente_id], (err,result)=> {
        if(err) {
            res.status(500).json({error:err.message});
        }else {
            res.json({message: 'clientes removido com sucesso', result});
        }
    });
}


//carros


// CRUD - Create carros
const createcarros = (req, res) => {
    const {cliente_id, marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiuclo} =req.body;

    const query = 'INSERT INTO carros (cliente_id, marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiuclo) VALUES(?, ?, ?, ?, ?)';
    con.query(query, [cliente_id, marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiuclo], (err,result) => {
        if(err) {
            res.status(500).json({error: err.message});
        } else {
            res.status(201).json({message: 'carros criado com sucesso', result});
        }

    });
}

//CRUD - Read carros
const readcarros = (req, res) => {
    con.query("SELECT * FROM carros",(err,result) => {
        if(err) {
            res.status(500).json({error: err.message});
        } else {
            res.json(result);
        }
    });
}

// CRUD - Update carros
const updatecarros = (req, res) => {
    const {carros_id, marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiuclo, cliente_id} = req.body;

    const query = 'UPDATE carros SET marca_veiculo = ?, modelo_veiculo = ?, ano_veiculo = ?, fabricacao_veiuclo = ?, cliente_id = ? WHERE carros_id = ?';
    con.query(query, [marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiuclo, cliente_id, carros_id], (err, result)=>{
        
        if(err) {
            res.status(500).json({error: err.message});
        }else {
            res.json({message:'carros atualizado com sucesso', result});
        }
    });
}


//CRUD - Delete carros
const deletecarros = (req, res) => {
    const {carros_id} = req.params;

    const query = 'DELETE FROM carros WHERE carros_id = ?';
    con.query(query, [carros_id], (err,result)=> {
        if(err) {
            res.status(500).json({error:err.message});
        } else {
            res.json({message: 'carros removido com sucesso', result});
        }
    });
}



//TELEFONE

// CRUD - Create Telefone
const createtelefone = (req, res) => {
    const {cliente_id, numero, tipo} =req.body;

    const query = 'INSERT INTO telefone (cliente_id, numero, tipo) VALUES(?, ?, ?)'
    con.query(query, [cliente_id, numero, tipo], (err,result) => {
        if(err) {
            res.status(500).json({error: err.message});
        } else {
            res.status(201).json({message: 'telefone criado com sucesso', result});
        }

    });
}

//CRUD - Read Telefone
const readtelefone = (req, res) => {
    con.query("SELECT * FROM telefone",(err,result) => {
        if(err) {
            res.status(500).json({error: err.message});
        } else {
            res.json(result);
        }
    });
}

// CRUD - Update Telefone
const updatetelefone = (req, res) => {
    const {telefone_id, tipo, numero} = req.body;

    const query = 'UPDATE telefone SET tipo = ?, numero = ? WHERE telefone_id = ?';
    con.query(query, [tipo, numero, telefone_id], (err, result)=>{
        if(err) {
            res.status(500).json({error: err.message});
        }else {
            res.json({message:'telefone atualizado com sucesso', result});
        }
    });
}


//CRUD - Delete Telefone
const deletetelefone = (req, res) => {
    const {tipo} = req.params;

    const query = 'DELETE FROM telefone WHERE tipo = ?';
    con.query(query, [tipo], (err,result)=> {
        if(err) {
            res.status(500).json({error:err.message});
        }else {
            res.json({message: 'telefone removido com sucesso', result});
        }
    });
}

//Saida Front
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", teste);

//CLIENTE

app.post("/clientes",createclientes);
app.get("/clientes", readclientes);
app.put("/clientes", updateclientes);
app.delete("/clientes/:cliente_id", deleteclientes);

//carros

app.post("/carros",createcarros);
app.get("/carros", readcarros);
app.put("/carros", updatecarros);
app.delete("/carros/:veiculo_modelo", deletecarros);

//TELEFONE

app.post("/telefone",createtelefone);
app.get("/telefone", readtelefone);
app.put("/telefone", updatetelefone);
app.delete("/telefone/:tipo", deletetelefone);

//Teste de porta
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});