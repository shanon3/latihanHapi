const Models = require('../../models/index')
const joi = require('@hapi/joi')

const todosHandler = async (request, h) => {
    try{   console.log('baca')
        const user = await Models.user.findAll({})
        return {data: user}
    }catch(error){
        return h.response({error: error.message}).code(400)
    }
}

    const createTodoHandler = async (request, h) => {
        try{
            const{namaDepan, namaBelakang, email, gender, register} = request.payload
            console.log(request.payload);
            console.log('input')
            const todo = await Models.user.create({
                firstName: namaDepan,
                lastName: namaBelakang,
                email: email,
                gender: gender,
                registerDate: register
            })
            return{
                statusCode: 200,
                error: "",
                message: 'Success',
                Content: {
                    namaDepan: todo.firstName,
                    lastName: todo.lastName,
                    email: todo.email,
                    gender: todo.gender,
                    registerDate: todo.registerDate,
                }
            }
        }
        catch(error){
            return h.response({
                error: error.message
            }).code(404)
        }
    }

    const updateTodoHandler = async (request, h) => {
        try{
            const todo_id = request.params.id;
            const{namaDepan, namaBelakang, email, gender, register} = request.payload;
            const todo = await Models.user.update({
                firstName: namaDepan,
                lastName: namaBelakang,
                email: email,
                gender: gender,
                registerDate: register
            }, {
                where: {
                    id: todo_id
                }
            })
            const dataRequest = request.payload
            console.log('dataRequest');
            console.log(todo);
            return{
                statusCode: 200,
                error: "",
                message: 'Success',
                id: todo_id,
                Content: {
                    namaDepan: dataRequest.namaDepan,
                    lastName: dataRequest.namaBelakang,
                    email: dataRequest.email,
                    gender: dataRequest.gender,
                    registerDate: dataRequest.register,
                }
            }
        }catch (error){
            return h.response({
                error: error.message
            }).code(404)
        }
    }
    const deleteTodoHandler = async (request,h) => {
        try{
            const todo_id = request.params.id;
            await Models.user.destroy({
                where:{
                    id: todo_id
                }
            })
            return {message: 'Todo has been deletred.'}
        }catch(error){
            return h.response({
                error: error.message
            }).code(404)
        }
    }


module.exports = [
    { method: 'GET', path: '/user/list', handler: todosHandler },
    {
        method: 'POST', path: '/user/postData',
        config: {
            validate: {
                payload: {
                    namaDepan: joi.required(),
                    namaBelakang: joi.string().required(),
                    email: joi.string().min(1).required(),
                    gender: joi.string().required(),
                    register: joi.date().required()
                }
            }
        },
        handler: createTodoHandler
    },
    {method: 'PATCH', path: '/user/postUpdate/{id}',
    config: {
        validate: {
            payload: {
                namaDepan: joi.required(),
                    namaBelakang: joi.string().required(),
                    email: joi.string().min(1).required(),
                    gender: joi.string().required(),
                    register: joi.date().required()
            }
        }
    },
    handler: updateTodoHandler},
    {method: 'DELETE', path: '/user/deleteUser/{id}', handler: deleteTodoHandler},
];