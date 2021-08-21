import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


const Lists = ({lists, currentPixel, setCurrentPixel}) => {
  const [title, setTitle] = useState('')

  const handlerCreateList = (e) => {
    e.preventDefault()
    if(!title.trim()) return 

    Meteor.call('list.insert', title)
    setTitle('')
  }


  return (
    <ListsStyle>
      <form onSubmit={handlerCreateList}>
        <label htmlFor="title">
          <span>Название комнаты</span>
          <input 
            name="title"
            type="text"
            id="title"
            placeholder="Введите название"
            value={title}
            onChange={({target}) => setTitle(target.value)}
          />
        </label>
        <button type="submit">
          Создать
        </button>
      </form>
      <hr/>
      <ListsBox>
        {
          !lists.length 
          ? <div className="static">Создате комнату</div> 
          : lists.map((list) => 
            (<List 
              key={list._id} 
              currentPixel={currentPixel}
              setCurrentPixel={setCurrentPixel}
              {...list}
            />))
        }
      </ListsBox>
    </ListsStyle>
  )
}

export default Lists;

const List = ({ _id, title, pixel, currentPixel,setCurrentPixel}) => { 
  const deleteList = ( _id, pixelId ) => Meteor.call('list.remove', _id, pixelId);
  const isOpen = pixel === currentPixel;
  return(
    <div 
      className={`lists_list-btn ${isOpen ? 'active' : ''}`}
      onClick={()=> setCurrentPixel(isOpen ? false : pixel)}
    >
      <span>
      {title}
      </span>
      <button onClick={() => {
        deleteList(_id,pixel)
      }}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  )
}

const ListsStyle = styled.div`
  flex: 0 0 30%;
  height: 70vh;
  font-size: 1.5vw;
  form {
    display: flex;
    label {
      width: 100%;
      span {
        width: 100%;
      }
      input{
        width: 100%;
        background: transparent;
        border: none;
        outline: none;
        padding-top: 5px;
        border-bottom: 2px solid #d3d3d3;
        &::placeholder {
          font-size: 1.5vw; 
        }
        &:focus {
          border-bottom: 2px solid black;
          color: black;
        }
      }
    }
    button {
      border-radius: 10px;
      width: 30%;
      padding: 5px 10px 5px 5px;
      font-weight: 500;
      border: none;
    }
  }
  
`;

const ListsBox = styled.div`
  position: relative;
  height: 100%;
  font-weight: 600;
  .static {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .lists_list-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 7px;
    cursor: pointer;
    &.active {
      background: #d3d5d3;
      color: green;
    }
    button {
      cursor: pointer;
      background: transparent;
      border: none;
      width: 2rem;
      height: 100%;
      path{
        fill: black;
        &:hover{
          fill: red;
        }
      }
    }
  }
`;
