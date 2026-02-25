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

        resp.json({
            code: 201,
            message: "할일이 성공적으로 생성되었습니다."
        });

    } catch (e) {
        console.log(e);
        throw e;
    }

});


module.exports = router;
