// import React from 'react';
// import { useStyles } from './Style';
// import { Box } from '@material-ui/core';


// function ComponentCardDragDrop(props) {

//     const classes = useStyles(props);

//     function dragStart(event) {
//         const target = event.target;

//         event.dataTransfer.setData('cardId', target.id);

//         setTimeout(() => {
//             // target.style.display = 'none';
//             target.style.opacity = '0.1';
//             target.style.borderStyle = 'dashed';
//         },0);
//     }

//     function dragOver(event) {
//         event.stopPropagation();
//     }

//     function dragEnd(event) {
//         console.log('Drag end')
//     }

//     return (
//         <Box 
//             className={classes.card}
//             id={props.cardId}
//             draggable={props.draggable}
//             onDragStart={dragStart}
//             onDragOver={dragOver}
//             onDragEnd={dragEnd}
//         >
//             {props.children}
//         </Box>
//     );
// }

// export default ComponentCardDragDrop;

































import React from 'react';
import PropTypes from 'prop-types';


class DropTarget extends React.Component {
  constructor(props) {
    super(props);
    this.elem = null;
    this.state = {highlighted: false};
  }

  componentDidMount() {
    this.elem.addEventListener(`${this.props.targetKey}DragEnter`, this.handleDragEnter, false);
    this.elem.addEventListener(`${this.props.targetKey}DragLeave`, this.handleDragLeave, false);
    this.elem.addEventListener(`${this.props.targetKey}Drop`, this.handleDrop, false);
  }

  createEvent(eventName, eventData) {
    // utility to create an event
    let e;
    if (typeof window.CustomEvent !== 'function') {
      // we are in IE 11 and must use old-style method of creating event
      e = document.createEvent('CustomEvent');
      e.initCustomEvent(eventName, true, true, {});
    } else {
      e = new CustomEvent(eventName, { bubbles: true, cancelable: true });
    }
    Object.assign(e, eventData);
    return e;
  }

  handleDrop = (e) => {
    // tell the drop source about the drop, then do the callback
    const evt = this.createEvent(
      `${this.props.targetKey}Dropped`,
      {
        dragData: e.dragData,
        dropElem: this.elem,
        dropData: this.props.dropData,
      },
    );
    e.containerElem.dispatchEvent(evt);
    this.props.onHit(e);
    this.setState({highlighted: false})
  }

  handleDragEnter = (e) => {
    const _e = e;
    this.props.highlightClassName && this.setState({highlighted: true})
    this.props.onDragEnter(_e);
  }

  handleDragLeave = (e) => {
    const _e = e;
    this.props.highlightClassName && this.setState({highlighted: false})
    this.props.onDragLeave(_e);
  }


  render() {
    const classNames = 'droptarget ' +  (this.state.highlighted ? this.props.highlightClassName : '');
    return (
      <span ref={(t) => { this.elem = t; }} className={classNames}>
        {this.props.render ? this.props.render() : this.props.children}
      </span>
    );
  }
}

DropTarget.propTypes = {
  children: PropTypes.node,
  render: PropTypes.func,
  highlightClassName: PropTypes.string,

  // needs to match the targetKey in the DragDropContainer -- matched via the enter/leave/drop event names, above
  targetKey: PropTypes.string,

  // data that gets sent back to the DragDropContainer and shows up in its onDrop() callback event
  dropData: PropTypes.object,

  // callbacks
  onDragEnter: PropTypes.func,
  onDragLeave: PropTypes.func,
  onHit: PropTypes.func,
};

DropTarget.defaultProps = {
  children: null,
  targetKey: 'ddc',
  onDragEnter: () => {},
  onDragLeave: () => {},
  onHit: () => () => {},
  dropData: {},
  highlightClassName: 'highlighted',
  render: null,
};

export default DropTarget;
