const { response } = require('express');
const {connectDb} = require('./connectDb')

exports.createTask = (req, res) => {
    const newTask = req.body;
    const db = connectDb();
    db.collection('tasks').add(newTask)
        .then(doc => res.status(201).send(doc.id))
        .catch(err => res.status(500).send(err))
}

exports.getTasks = (req, res) => {
    const db = connectDb();
    db.collection('tasks').get()
        .then(snapshot => {
            const taskList = snapshot.docs.map(doc => {
                let task = doc.data()
                task.id= doc.id
                return task
            })
            res.send(taskList);
        })
        .catch(err => res.status(500).send(err))
}

exports.updateTask = (req,res) => {
    const { taskId } = req.params
    const isDone= req.body.done 
    const db = connectDb()
    db.collection('tasks').doc(taskId).update({ done: isDone})
    .then(doc => res.status(202).send(doc))
    .catch(err => res.status(500).send(err))

}

exports.deleteTask= (req, res) => {
    const {taskId} = req.params
    const db = connectDb()
    db.collection('tasks')
    .doc(taskId)
    .delete()
    .then(() => {
        res.send('Deleted')
    })
    .catch((err) => res.status(500).send(err));
}