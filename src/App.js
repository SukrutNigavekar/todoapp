import { useState } from "react";
import "./App.css";

function App() {
  let [todo, setTodo] = useState("");

  let oldData = JSON.parse(localStorage.getItem("toDoList")) ?? [];
  let [allToDoList, setAllList] = useState(oldData);
  let addtodo = (e) => {
    e.preventDefault();
    let obj = {
      todoName: todo,
      toDoStatus: false,
    };
    let copyData = [...allToDoList, obj];
    localStorage.setItem("toDoList", JSON.stringify(copyData));
    setAllList(copyData);
    setTodo("");
  };
  let deleteRow = (index) => {
    let allItems = [...allToDoList];
    allItems.splice(index, 1);

    localStorage.setItem("toDoList", JSON.stringify(allItems));
    setAllList(allItems);
  };
  let changeStatus = (index)=>{
    let allItems = [...allToDoList];
    allItems[index]['toDoStatus']= !allItems[index]['toDoStatus'];
    localStorage.setItem("toDoList", JSON.stringify(allItems));
    setAllList(allItems);
  }
  return (
    <>
      <div className=" ">
        <form
          onSubmit={addtodo}
          className="flex flex-row w-[700px] mx-auto justify-center py-10"
        >
          <input
            type="text"
            placeholder="Enter your task"
            className="basis-[400px] text-[20px] p-4 border border-blue-600 "
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button className="bg-blue-600 text-[20px] text-white p-[10px_15px]">
            Add todo
          </button>
        </form>

        <div className="w-[700px] mx-auto px-10">
          <div>
            <ul className="w-full text-[20px]">
              {allToDoList.length >= 1
                ? allToDoList.map((v, i) => {
                    return (
                      <li
                        className={`flex justify-between items-center p-4 my-3
               bg-red-600 rounded text-white  ${(v.toDoStatus)?'line-through bg-green-600':''}`}
                        key={i}
                      >
                        <span className="cursor-pointer" onClick={()=>changeStatus(i)}>
                          {i + 1}. {v.todoName}
                        </span>
                        <span>
                          <button
                            className="bg-blue-600 text-white p-3 rounded"
                            onClick={() => deleteRow(i)}
                          >
                            Delete
                          </button>
                        </span>
                      </li>
                    );
                  })
                : ""}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
