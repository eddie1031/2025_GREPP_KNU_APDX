const express = require('express');
const router = express.Router();
const { datasource } = require('../config/datasource');

const getRepository = () => datasource.getRepository('todos');


router.get('/',
    (req, resp) => {
        resp.send("Hello World!");
    }
);

// 할일 생성
router.post('/todos', async (req, resp) => {

    try {

        const { title, description, completed } = req.body;

        console.log(title, description, completed);

        const todo = getRepository().create({ title, description, completed });

        await getRepository().save(todo);

        resp.status(201)
            .json({
            code: 201,
            message: "할일이 성공적으로 생성되었습니다."
        });

    } catch (e) {
        console.log(e);
        throw e;
    }

});

// 할일 단건 조회
router.get('/todos/:id', async (req, res) => {

    try {

        const foundTodo = await getRepository().findOneBy({ id: Number(req.params.id) });

        if (!foundTodo) {
            return res.status(404)
                .json(
                    {
                        code: 404,
                        message: '해당 할일은 찾을 수 없습니다.'
                    }
                );
        }

        res.json({
            code: 200,
            message: "할일을 성공적으로 조회하였습니다.",
            data: foundTodo
        });

    } catch (err) {

        res.status(500).json({ message: err.message });

    }

});

// 할일 단건 조회
router.get('/todos', async (req, res) => {

    try {

        const todos = await getRepository().find();

        res.json({
            code: 200,
            message: "할일 목록을 성공적으로 조회하였습니다.",
            data: todos
        });

    } catch (err) {

        res.status(500).json({ message: err.message });

    }

});


// 할일 수정
router.put('/todos/:id', async (req, res) => {

    try {

        const foundTodo = await getRepository().findOneBy({ id: Number(req.params.id) });

        if (!foundTodo) {
            return res.status(404)
                .json(
                    {
                        code: 404,
                        message: '해당 할일은 찾을 수 없습니다.'
                    }
                );
        }

        const { title, description, completed } = req.body;

        Object.assign(foundTodo, { title, description, completed });

        const updatedTodo = await getRepository().save(foundTodo);

        res.json({
            code: 200,
            message: "할일이 성공적으로 수정되었습니다.",
            data: {
                id: updatedTodo.id,
                title: updatedTodo.title,
                description: updatedTodo.description,
                completed: updatedTodo.completed
            }
        });

    } catch (err) {

        res.status(500).json({ message: err.message });

    }

});


module.exports = router;
