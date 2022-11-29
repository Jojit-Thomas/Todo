import React, { useEffect, useState } from "react";
import "./App.css";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function App() {
  const [Inp, setInp] = useState("");
  const [toDo, setToDo] = useState(useLocalStorage("toDo", []));
  function useLocalStorage (name, initialValue) {
    let toDo = JSON.parse(localStorage.getItem(name))
    if(toDo) return toDo;
    else return initialValue;
  }
  useEffect(() => {
    localStorage.setItem("toDo", JSON.stringify(toDo));
  }, [toDo])
  const addTask = () => {
    if (Inp.trim().length > 0)
    setToDo([...toDo, { id: Date.now(), text: Inp, isDone: false, isDropped : false }])
  }
  const updateTaskStatus = (id, status, value) => {
    setToDo(
      toDo.filter((toDos) => {
        (toDos.id === id) && (toDos[status] = value)
        return toDos;
      })
    )
  }
  const deleteTask = (id) => {
    setToDo(
      toDo.filter((toDos) => {
        if (toDos.id !== id) return toDos;
        else return false;
      })
    )
  }
  return (
    <div role="main">
      <div className="container">
        <section className="todo mt-5 mx-auto">
          <h1 className="text-light mb-3 text-center">Todo</h1>
          {/* <label htmlFor="task" className="text-light">Add a task</label> */}
          <div className="d-flex bg-white border rounded mb-3">
            <input value={Inp} onChange={(e) => setInp(e.target.value)} type="text" className="form-control text-dark inpTask" placeholder="🖊️ Add item..." id="task" name="task"></input>
            <i
              onClick={addTask}
              className="fas fa-plus addButton m-auto"
            ></i>
          </div>
          {/* <div className="form-group">
					<input className="form-control m-auto text-light searchToDo" type="text"  name="search" placeholder="Search" />
				</div> */}
 {/* ================================================ O N G O I N G ================================================ */}
          <ul className="todos list-group text-light">
            {
              toDo.map((toDoObj, idx) => {
                // console.log("toDo : ", toDoObj)
                if (!toDoObj.isDone && !toDoObj.isDropped) {
                  return (
                    <li key={idx} className="list-group-item text-white">
                      <div className="w-100 d-flex">
                        <i className="fa-regular fa-circle me-4" onClick={() => updateTaskStatus(toDoObj.id, "isDone", true)}></i>
                        {toDoObj.text}</div>
                      <span className="delete material-icons float-right">
                      <i className="fa-solid fa-xmark" onClick={() => updateTaskStatus(toDoObj.id, "isDropped", true)}></i>
                      </span>
                    </li>
                  );
                } else {
                  return null;
                }
              })
            }
          </ul>
 {/* ================================================ D O N E ================================================ */}
          <Accordion sx={{
            backgroundColor: "#352f5b"
          }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{
                color: "#fff"
              }}/>}
              aria-controls="panel1a-content"
              id="panel1a-header"

            >
              <Typography className="text-white">Completed ({toDo.reduce((length, elem) => {
                if(elem.isDone) return length + 1;
                else return length;
              },0)})
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {
                  toDo.map((toDoObj, idx) => {
                    if (toDoObj.isDone) {
                      return (
                        <li key={idx} className="list-group-item text-white completed-item-box d-flex">
                          <div style={{ width: '95%' }}>
                            <i className=" fa-solid fa-check me-3" onClick={() => updateTaskStatus(toDoObj.id, "isDone", false)}></i>
                            {toDoObj.text}</div>
                          <span className="delete material-icons float-right">
                          <i className="fa-solid fa-trash " onClick={() => deleteTask(toDoObj.id)}></i>
                          </span>
                        </li>
                      );
                    }
                    else {
                      return null;
                    }
                  })
                }
              </Typography>
            </AccordionDetails>
          </Accordion>
 {/* ================================================ D R O P P E D================================================ */}
          <Accordion sx={{
            backgroundColor: "#352f5b"
          }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{
                color: "#fff"
              }}/>}
              aria-controls="panel1a-content"
              id="panel1a-header"

            >
              <Typography className="text-white">Dropped ({toDo.reduce((length, elem) => {
                if(elem.isDropped) return length + 1;
                else return length;
              },0)})
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {
                  toDo.map((toDoObj, idx) => {
                    if (toDoObj.isDropped) {
                      return (
                        <li key={idx} className="list-group-item text-white completed-item-box d-flex">
                          <div style={{ width: '95%' }}>
                          <i className="fa-sharp fa-solid fa-rotate-right me-3" onClick={() => updateTaskStatus(toDoObj.id, "isDropped", false)}></i>
                            {toDoObj.text}</div>
                          <span className="delete material-icons float-right">
                            <i className="fa-solid fa-trash " onClick={() => deleteTask(toDoObj.id)}></i>
                          </span>
                        </li>
                      );
                    }
                    else {
                      return null;
                    }
                  })
                }
              </Typography>
            </AccordionDetails>
          </Accordion>
        </section>
      </div>
    </div>
  );
}

export default App;
