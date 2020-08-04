// import React from 'react';
// import { useStyles } from './Style';
// import { Box, Typography } from '@material-ui/core';


// function ComponentDragAndDrop(props) {

//     const classes = useStyles(props);

//     function drop(event) {
//         event.preventDefault();
//         const cardId = event.dataTransfer.getData('cardId');
//         const card = document.getElementById(cardId);

//         card.style.display = 'flex';

//         event.target.appendChild(card);
//     }

//     function dragOver(event) {
//         event.preventDefault();
//     }

//     return (
//         <Box className={classes.container}>
//             <Box className={classes.header}>
//                 <Typography className={classes.typography}>
//                     {props.title}
//                 </Typography>
//             </Box>
//             <Box 
//                 className={classes.containerCenter}
//                 id={props.containerId}
//                 onDrop={drop}
//                 onDragOver={dragOver}
//             >
//                 {props.children}
//             </Box>
//         </Box>
//     );
// }

// export default ComponentDragAndDrop;



import React, { useState } from "react";
import Board, { moveCard } from "@lourenci/react-kanban";

const board = {
  columns: [
    {
      id: 1,
      title: "Backlog",
      cards: [
        {
          id: 1,
          title: "Card title 1",
          description: "Card content"
        },
        {
          id: 2,
          title: "Card title 2",
          description: "Card content"
        },
        {
          id: 3,
          title: "Card title 3",
          description: "Card content"
        }
      ]
    },
    {
      id: 2,
      title: "Doing",
      cards: [
        {
          id: 9,
          title: "Card title 9",
          description: "Card content"
        }
      ]
    },
    {
      id: 3,
      title: "Q&A",
      cards: [
        {
          id: 10,
          title: "Card title 10",
          description: "Card content"
        },
        {
          id: 11,
          title: "Card title 11",
          description: "Card content"
        }
      ]
    },
    {
      id: 4,
      title: "Production",
      cards: [
        {
          id: 12,
          title: "Card title 12",
          description: "Card content"
        },
        {
          id: 13,
          title: "Card title 13",
          description: "Card content"
        }
      ]
    }
  ]
};

function ControlledBoard() {
  // You need to control the state yourself.
  const [controlledBoard, setBoard] = useState(board);

  function handleCardMove(_card, source, destination) {
    const updatedBoard = moveCard(controlledBoard, source, destination);
    setBoard(updatedBoard);
  }

  return (
    <Board onCardDragEnd={handleCardMove} disableColumnDrag className="teste">
      {controlledBoard}
    </Board>
  );
}

function Dnd() {
  return (
    <>
      <p>Teste</p>
      <ControlledBoard />
    </>
  );
}

export default Dnd;