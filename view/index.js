    
window.addEventListener('load', async ()=>{
    const table = document.getElementById('tblTodo')
    const btnAdd = document.getElementById('btnAdd')
    const search = document.getElementById('searching')
    const url = '/api/todos'

    //delete
    // const deleteTodo = async(idTodo)=>{
    //     try {
    //         if(confirm("Do you sure delete this activity") === true){
    //             const response = await fetch(url,{
    //                 method:'DELETE',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Accept':'application/json'
    //                 },
    //                 body:JSON.stringify({id: `${idTodo}`})
    //             })
    //             const mess = (await response.json()).message
    //             if(!mess || mess ==='Failed') throw new Error('Can not delete Todo,please try again')
    //             getAll()
    //         }
    //     } catch (error) {
    //         console.log(err.message)         
    //     }
    // }

    const getAll = async ()=>{
        try {
            const response = (await fetch(`${url}`))
            const todos = (await response.json()).todo
            table.innerHTML=''
            let tr=''
            todos.forEach((todo,i) => {
                tr +=`<tr class="table-primary">
                        <th scope="row">${i+1}</th>
                        <td>${todo.name}</td>
                        <td>${todo.issueAt}</td>
                        <td><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"></td>
                        <td><button type="submit" class="btn btn-primary" name='btnRemove' id='${todo._id}'>Remove</button></td>
                        <td><button type="submit" class="btn btn-primary" name='btnEdit' id='${todo._id}'>Edit</button></td>
                    </tr>`
            });
              return tr
        } catch (err) {
            console.log(err.message) 
            return       
        }
    }
    
    

    // const waitingLoad = function(element){
    //     return new Promise((resolve,reject)=>{
    //         element.addEventListener('load', ()=>{
    //             const btn = document.querySelectorAll('button[name="btnEdit"]')
    //             if(!btnEdit) reject()
    //             resolve(btn)
    //         })
    //     })
    // }

    //add
    btnAdd.addEventListener('click', async function(){
        try {
            if(!search.value) throw new Error('Todo must have name')
            const response = await fetch(`${url}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept':'application/json'
                },
                body:JSON.stringify({name: `${search.value}`})
            })
            const mess = (await response.json()).message
            if(!mess || mess ==='Failed') throw new Error('Can not add Todo,please try again')
            const tr = await getAll()
            table.innerHTML = tr
        } catch (err) {
            console.log(err.message)
        }
    })

    const trHtml = await getAll()
    console.log(trHtml)
    table.innerHTML = trHtml
    const btnEdits = document.querySelectorAll('button[name="btnEdit"]')
    let btnRemoves = document.querySelectorAll('button[name="btnRemove"]') 
    document.querySelectorAll('button[name="btnRemove"]').forEach(btnRemove => {
        btnRemove.addEventListener('click', async (e)=>{
            try {
                if(confirm("Do you sure delete this activity") === true){
                   const idTodo = e.target.getAttribute('id')
                    const response = await fetch(url,{
                        method:'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept':'application/json'
                        },
                        body:JSON.stringify({id: `${idTodo}`})
                    })
                    const mess = (await response.json()).message
                    if(!mess || mess ==='Failed') throw new Error('Can not delete Todo,please try again')
                    const tr = await getAll()
                    table.innerHTML =tr
                    btnRemoves = document.querySelectorAll('button[name="btnRemove"]')
                    console.log(btnRemoves)
                }
            } catch (err) {
                console.log(err.message)         
            }
        })
    })


    document.querySelectorAll('button[name="btn"]').forEach(btnRemove => {
        btnRemove.addEventListener('click', async (e)=>{
            try {
                alert('hello')
            } catch (err) {
                console.log(err.message)         
            }
        })
    })
    
})
