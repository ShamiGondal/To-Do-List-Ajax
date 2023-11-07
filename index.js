$(function () {
    loadToDos();
    $('#tbody').on('click' , '.btn-danger', deleteTodo )
    $('#tbody').on('click' , '.btn-warning', udpateTodo )
    $('#tbody').on('click', 'input[type="checkbox"]', markdone);
    $('#addNote').click(addTodo)

    $('#saveBtn').click( function(){
        let id = $('#updateId').val();
        console.log(id +"saveBtn")
        let title = $('#etitle').val();
        let body = $('#edescription').val(); 

        $.ajax({
            url : 'https://usman-fake-api.herokuapp.com/api/recipes/'+ id,
            method: 'PUT',
            data : {title, body},
            error: function(){
                console.log("error occured while updating")
            },
            success : function(response){
                console.log(response)
                loadToDos()
                $("#editModal").modal("hide");
            }
        })
    })

});

function loadToDos() {
    $.ajax({
        url: 'https://usman-fake-api.herokuapp.com/api/recipes',
        method: 'GET',
        error: function (response) {
            $('#tbody').html('Failed to load content');
            console.log("Failed to load");
        },
        success: function (response) {
            if (!response) {
                alert('could not load the todos, Internal server Error occured')
                console.log("Some error occurred while loading");
            } else {
                let todos = $('#tbody');
                todos.html('');
                let idx = 1;
                console.log(response)
                let res =  response;
                res.forEach((element, index) => {
                    todos.append(`
                            <tr class='tdata' data-id='${element._id}'>
                                <th scope="row">${idx++}</th>
                                <td class=${element.completed? 'completed':''}>${element.title}</td>
                                <td>${element.body}</td>
                                <td><input type='checkbox' ${element.completed ? 'checked' : ''} ></td>
                                <td><button id='editBtn' type="button" class="btn btn-sm btn-warning bg-transparent border-0" data-toggle="modal" data-target="#editModal"><lord-icon
                                    src="https://cdn.lordicon.com/oqyaxvft.json"
                                    trigger="hover"
                                    style="width:40px;height:40px">
                                </lord-icon></button></td>
                                <td><button id='deleteBtn' class="btn btn-sm btn-danger bg-transparent border-0"><lord-icon
                                    src="https://cdn.lordicon.com/wzxoqler.json"
                                    trigger="hover"
                                    style="width:40px;height:40px">
                                </lord-icon></button></td>
                            </tr>
                        `);

                });
            }
        }
    });
}


function deleteTodo(){

    let btn = $(this);
    let parentDiv = btn.closest('.tdata')
    let id = parentDiv.attr('data-id')
    console.log(id)
    $.ajax({

        url : 'https://usman-fake-api.herokuapp.com/api/recipes/'+id,
        method : 'DELETE',
        error:  function(){
            console.log("could not delete and error occured ")
        },
        success : function(response){
            console.log(response)
            loadToDos();
        }
    })

}

function addTodo() {
    let title = $('#title').val(); 

    
    if (title && title.trim() !== "") {

        let body  = $('#description').val();
        
        $.ajax({
            url: 'https://usman-fake-api.herokuapp.com/api/recipes',
            method: 'POST',
            data: { title, body },
            error: function(response) {
                console.log("An error occurred: " + response);
            },
            success: function(response) {
                console.log(title);
                console.log(response);
                $('#title').val('');
                loadToDos();
            }
        });
    } else {
        console.log("Title is empty or undefined.");
    }
}


function udpateTodo(){
    let btn = $(this);
    let parentDiv = btn.closest('.tdata');
    let id  =  parentDiv.attr('data-id');
    console.log(id +" fun btn")

    $.ajax({

        url: 'https://usman-fake-api.herokuapp.com/api/recipes/' + id,
        method : 'GET',
        error: function(){
            console.log("error while loading title and description ")
        },
        success : function(response){
            console.log(response)
            $('#updateId').val(response._id)
            console.log("this is working")
            $('#etitle').val(response.title);
            $('#edescription').val(response.body); 
        }

    })
}


function markdone() {
    let checkbox = $(this);
    let parentDiv = checkbox.closest('.tdata');
    let titleCell = parentDiv.find('td').eq(0); 

    if (checkbox.prop('checked')) {
        titleCell.addClass('completed');
    } else {
        titleCell.removeClass('completed');
    }
}

function onSubmit(event){
    event.preventDefault();
}