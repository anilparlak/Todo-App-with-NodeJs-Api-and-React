import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { api } from "../../api";
import "./list.scss";
import {getList} from '../../store/todo'

const ListTodo = ({ submit }) => {

  const dispatch = useDispatch();
  const { list, listLoading, listError } = useSelector((state) => state.todo)
  // const [lists, setLists] = useState([]);
  const [del, setDel] = useState(false);
  useEffect(() => {

    dispatch(getList());
  }, [submit, del]);

  const handleDelete = (id) => {
    api()
      .delete(`/delete/${id}`)
      .then((response) => {
        console.log(response);
        setDel(!del);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="ui relaxed divided list">
      <div className="ui segments">
        {listLoading && <span>Loading</span>}
        {
          listError ? 
            <div>There is an error </div> :
            list && list.map((list) => {
              return (
                <ListElement
                  key={list._id}
                  item={list}
                  handleDelete={handleDelete}
                />
              );
        })}
      </div>
    </div>
  );
};

const ListElement = ({ item, handleDelete }) => {
  const [check, setCheck] = useState(false);
  const [active,setActive] = useState(true);
  
  const handleActive = () => {
    setActive(!active)
    console.log(active)
  }

  const handleCheckEvent = () => {
    setCheck(!check);
  };

  return (
    <>
    <div className="ui segment">
      <div>
        <div className="ui checkbox">
          <input type="checkbox" name="check" onChange={handleCheckEvent} />
          <label></label>
        </div>
        <p style={{ textDecoration: check ? "line-through" : "none" }}>
          {item.title}
        </p>
      </div>
      <div>
        <i
          className="trash alternate icon"
          onClick={() => handleDelete(item._id)}
        ></i>
       
        <i className={`chevron down icon ${!active? "transform" : ""}`} onClick={() => handleActive()} ></i>
      </div>
    </div>
    <div className="ui segment" className={`ui segment ${active? "notActive" : ""}`}>
      <p>{item.description}</p>
    </div>
    </>
  );
};

export default ListTodo;
