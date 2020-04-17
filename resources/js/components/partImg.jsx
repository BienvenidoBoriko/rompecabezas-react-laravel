import React, { Component } from 'react';
import {
    DragSource,
    DropTarget,
    ConnectDropTarget,
    ConnectDragSource,
    DropTargetMonitor,
    DropTargetConnector,
    DragSourceConnector,
    DragSourceMonitor,
  } from 'react-dnd';

const Card = props => {
    const style = props.isDragging
      ? `card text-white border-light text-light`
      : `card text-${props.color}`;

    return props.connectDropTarget(
        props.connectDragSource(
            <img className="img-small" src={props.url} alt={props.alt} id={props.id}/>
        )
    );
  };

  const typeCard = Symbol.for("@@Type::Card");

  const specTarget = {
    drop(props) {
      return {
        id: props.id,
        index: props.index
      };
    }
  };

  const specSource = {
    beginDrag(props) {
      return {
        id: props.id,
        index: props.index
      };
    },
    endDrag(props, monitor) {
      if (!monitor.didDrop()) {
        return;
      }
      const source = monitor.getItem();
      const target = monitor.getDropResult();

      if (source.id === target.id) {
        return;
      }
      props.moveImg(source.index, target.index);
    }
  };

  const collectTarget = connect => ({
    connectDropTarget: connect.dropTarget()
  });

  const collectSource = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  });




  const PartImg = DropTarget(typeCard, specTarget, collectTarget)(
    DragSource(typeCard, specSource, collectSource)(Card)
  );


export default PartImg;
