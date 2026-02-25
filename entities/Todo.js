const { EntitySchema } = require('typeorm');

// https://typeorm.io/docs/guides/usage-with-javascript
module.exports.Todo = new EntitySchema({
    name: "todos",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true
        },
        title: {
            type: String
        },
        description: {
            type: String
        },
        completed: {
            type: Boolean,
            default: false
        },
        createdAt: {
            type: "datetime",
            createDate: true
        },
        updatedAt: {
            type: "datetime",
            updateDate: true
        }
    }
})

