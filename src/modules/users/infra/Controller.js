import { connection } from '../../../connection.js'
import jwt from 'jsonwebtoken';
import authConfig from '../../../auth.js';

export class Controller {
    async get(request, response) {
        try {
            const [rows, fields] = await connection.query('SELECT * FROM users');
            return response.json(rows);
            } catch (error) {
                console.error(error);
                return response.status(500).json({ message: 'Erro ao obter usuarios.' });
            }
    }

    async create(request, response) {
        const { email, passwrd } = request.body;
        try {
            await connection.query(`INSERT INTO users (email, passwrd ) VALUES ("${email}", "${passwrd}");`);
            return response.status(201).json({ message: 'Criado com sucesso.' });

            } catch (error) {
                console.error(error);
                return response.status(500).json({ message: 'Erro ao criar usuário'});
            }
    }

    async auth(request, response) {
        const { email, pass } = request.body;
        const [rows, fields] = await connection.query(`SELECT * FROM users WHERE email LIKE "${email}" && pass LIKE "${pass}";`);
        
        if(rows == undefined){
            return response.status(404).json({
                message: 'Usuário não encontrado'
            }); 
        } 

        return response.status(201).json({ 
            id: rows[0].id,
            email: rows[0].email,
            token: jwt.sign({ token: rows[0].id}, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            })
        }); 
    }

    async update(request, response) {
        const { id } = request.params;
        const { email, passwrd } = request.body;
        const [rows, fields] = await connection.query(`SELECT * FROM users WHERE id=${id}`);
        const emailAtt = rows[0].email
        const passwrdAtt = rows[0].passwrd

        try {
            await connection.query(`UPDATE users SET email="${email ? email : emailAtt}", passwrd="${passwrd ? passwrd : passwrdAtt}" WHERE id=${id} `);
            return response.status(201).json({ message: 'Editato com sucesso.' });
            } catch (error) {
                console.error(error);
                return response.status(500).json({ message: 'Erro ao editar usuario' });
            }
    }

    async delete(request, response) {
        const { id } = request.params;

        try {
            await connection.query(`DELETE FROM users WHERE id =${id} `);
            return response.status(201).json({ message: 'Deletado com sucesso.' });
            } catch (error) {
                console.error(error);
                return response.status(500).json({ message: 'Erro ao deletar produto.' });
            }
    }
}
