import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Tooltip } from 'react-tooltip';

const PriorityList = ({items,setItems}) => {


  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    setItems(reorderedItems);
  };

  return (
    <div className="container my-5" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h2 className="mb-4" style={{ color: "#7e57c2", marginBottom: "20px", fontWeight: "bold"}}>Set Environment Factors Priority</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="priorityList">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                width: "400px",
                padding: "10px",
                backgroundColor: "#f9f6ff",
                borderRadius: "10px",
              }}
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <span data-tooltip-id={`tooltip-${index}`} data-tooltip-content={item.message}>
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "15px 20px",
                        marginBottom: "10px",
                        backgroundColor: "#e8e2fc",
                        color: "#5c4d9a",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        fontWeight: "500",
                        fontSize: "16px",
                        ...provided.draggableProps.style,
                      }}
                    >
                      {item.text}
                      <Tooltip id={`tooltip-${index}`} />
                      <span style={{ fontSize: "18px", cursor: "grab" }}>≡</span>
                    </div>
                    </span>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default PriorityList;
