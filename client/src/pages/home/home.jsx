import React, { useState, useEffect } from "react";
import axios from "axios";
import "./home.css"
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("");
  const [taskList, setTaskList] = useState([]);
  const navigate = useNavigate();

  //refreshing every time something gets updated in the database
  useEffect(() => {
    fetchTaskList();
  }, []);

  //fetching the data
  const fetchTaskList = async () => {
    try {
      const response = await axios.get("http://localhost:8800/api/tasks/");
      setTaskList(response.data);
    } catch (error) {
      console.error("Error fetching task list:", error);
    }
  };

  //posting the data
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8800/api/tasks/", { title, desc, status }
      );
      setTitle("");
      setDesc("");
      setStatus("");
      fetchTaskList();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  //deleting the data
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/api/tasks/${id}`);
      fetchTaskList();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  //updating the data
  const handleUpdate = async (id) => {
    navigate("/update", { state: { id: id } })
  };


  return (
    <div className="container">

    {/* Displaying a video in the background  */}

      <video className="background-video" autoPlay muted loop>
        <source src="/vid.mp4" type="video/mp4" />
      </video>


      <h1 className="title">PREPEAT</h1>
      <h5 className="extra">a Food app ©</h5>

      {/* Creating a form to allow users to enter title desc and status  */}
      <form className="task-form" onSubmit={handleSubmit} >
        <label htmlFor="title">Name:</label>
        <input
          type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required /><br />

        <div>
          <label htmlFor="desc">Order:</label>
          <textarea id="desc" value={desc} onChange={(e) => setDesc(e.target.value)} required rows="4" ></textarea>
        </div>

        <label htmlFor="status">Status:</label>
        <input type="status" title="title" id="status" onChange={(e) => setStatus(e.target.value)} required /><br />

        <button className="btn-save" type="submit">Save</button>
      </form>

    

      {/* Displaying the content  */}
      <div className="task-container">
        <h2 className="task-list-title">Ongoing Orders:</h2>
        <ol className="task-list">
        
          {taskList.map((task) => (
            <li className="task-item" key={task._id}>

              <strong className="task-title">Name:</strong>{" "}
              <span className="task-data">{task.title}</span>{" "}
              <strong className="task-desc">Order:</strong>{" "}
              <span className="task-data">{task.desc}</span>{" "}
              <strong className="task-status">Status:</strong>{" "}
              <span className="task-data">{task.status}</span>{" "}

              <div className="task-actions">
                <button className="btn-delete" onClick={() => handleDelete(task._id)}>
                  Delete
                </button>
                <button className="btn-update" onClick={() => handleUpdate(task._id)}>
                  Update
                </button>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Home;
