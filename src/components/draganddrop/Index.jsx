import React, { useState } from 'react';
import Board, { moveCard } from '@lourenci/react-kanban';
import './Style.css'

const container = {
  columns: [
    {
      id: 1,
      title: 'To do',
      cards: [
        {
          id: 1,
          title: 'Card title 1',
          description: 'Card content'
        },
        {
          id: 2,
          title: 'Card title 2',
          description: 'Card content'
        },
        {
          id: 3,
          title: 'Card title 3',
          description: 'Card content'
        }
      ]
    },
    {
      id: 2,
      title: 'Doing',
      cards: [
        {
          id: 9,
          title: 'Card title 9',
          description: 'Card content'
        }
      ]
    },
    {
      id: 3,
      title: 'Done',
      cards: [
        {
          id: 10,
          title: 'Card title 10',
          description: 'Card content'
        },
        {
          id: 11,
          title: 'Card title 11',
          description: 'Card content'
        },
        {
          id: 12,
          title: 'Card title 10',
          description: 'Card content'
        },
        {
          id: 13,
          title: 'Card title 11',
          description: 'Card content'
        },
        {
          id: 14,
          title: 'Card title 10',
          description: 'Card content'
        },
        {
          id: 15,
          title: 'Card title 11',
          description: 'Card content'
        },
        {
          id: 16,
          title: 'Card title 10',
          description: 'Card content'
        },
        {
          id: 17,
          title: 'Card title 11',
          description: 'Card content'
        },
        {
          id: 18,
          title: 'Card title 10',
          description: 'Card content'
        },
        {
          id: 19,
          title: 'Card title 11',
          description: 'Card content'
        },
        {
          id: 20,
          title: 'Card title 10',
          description: 'Card content'
        },
        {
          id: 21,
          title: 'Card title 11',
          description: 'Card content'
        },
        {
          id: 22,
          title: 'Card title 10',
          description: 'Card content'
        },
        {
          id: 23,
          title: 'Card title 11',
          description: 'Card content'
        },
        {
          id: 24,
          title: 'Card title 10',
          description: 'Card content'
        },
        {
          id: 25,
          title: 'Card title 11',
          description: 'Card content'
        }
      ]
    }
  ]
};

function ControlledBoard() {

  const [card, setCard] = useState(container);

  function handleCardMove(_card, source, destination) {
    const updatedBoard = moveCard(card, source, destination);
    setCard(updatedBoard);
  }

  return (
    <Board onCardDragEnd={handleCardMove} disableColumnDrag>
      {card}
    </Board>
  );
}

function Dnd() {
  return (
    <ControlledBoard />
  );
}

export default Dnd;