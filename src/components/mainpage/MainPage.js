import AddTodo from "../addTodo/AddTodo";


const MainPage = () =>{

    return(
    
        <div className="ui container"> 
            <div className="ui raised very padded text container segment">
                <h1 className="ui header grey">To Do List</h1>
                <AddTodo/>
            </div>
           
        </div>
        
    )
}

export default MainPage;