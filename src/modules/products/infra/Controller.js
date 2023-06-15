import { connection } from '../../../connection.js'

export class Controller {
    async get(request, response) {
        try {
            const [rows, fields] = await connection.query('SELECT * FROM products');
            return response.json(rows);
            } catch (error) {
                console.error(error);
                return response.status(500).json({ message: 'Erro ao obter as reservas.' });
            }
    }

    async create(request, response) {
        const { pname, descr, category_id, dt_validade } = request.body;
        try {
            await connection.query(`INSERT INTO products (pname, descr, category_id, dt_validade) VALUES ("${pname}", "${descr}", "${category_id}", "${dt_validade}");`);
            return response.status(201).json({ message: 'Criado com sucesso.' });

            } catch (error) {
                console.error(error);
                return response.status(500).json({ message: 'Erro ao obter as reservas.' });
            }
    }

    async update(request, response) {
        const { id } = request.params;
        const { pname, descr, category_id, dt_validade } = request.body;
        const [rows, fields] = await connection.query(`SELECT * FROM products WHERE id=${id}`);
        const pnameAtt = rows[0].pname
        const descrAtt = rows[0].descr
        const category_idAtt = rows[0].category_id
        const dt_validadeAtt = rows[0].dt_validade

        try {
            await connection.query(`UPDATE products SET pname="${pname ? pname : pnameAtt}", descr="${descr ? descr : descrAtt}", dt_validade="${dt_validade ? Date.parse(dt_validade) : Date.parse(dt_validadeAtt)}", category_id=${category_id ? category_id : category_idAtt} WHERE id=${id} `);
            return response.status(201).json({ message: 'Editato com sucesso.' });
            } catch (error) {
                console.error(error);
                return response.status(500).json({ message: 'Erro ao obter as reservas.' });
            }
    }

    async delete(request, response) {
        const { id } = request.params;

        try {
            await connection.query(`DELETE FROM products WHERE id =${id} `);
            return response.status(201).json({ message: 'Deletado com sucesso.' });
            } catch (error) {
                console.error(error);
                return response.status(500).json({ message: 'Erro ao deletar produto.' });
            }
    }
}
