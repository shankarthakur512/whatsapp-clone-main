import React, { useEffect, useRef } from "react";

function ContextMenu({options , coordinates , contextMenu , setContextMenu}) {

// Using the reference for closing context menu on outside click
  const ContextMenuRef = useRef(null)

// handle click function on contextMenu items
const handleClick = (e,callback) =>{
e.stopPropagation();
setContextMenu(false);
callback();
}


// use for handleoutside click by default behaviour
useEffect(()=>{
  const handleOutsideClick = (e) =>{
    if(e.target.id !== "context-opener" ){
      if(ContextMenuRef.current && !ContextMenuRef.current.contains(e.target)){
        setContextMenu(false);
      }
    }
  };
  document.addEventListener('click' , handleOutsideClick);
  return () =>{
    document.removeEventListener('click' , handleOutsideClick);
  }
},[])
  return (
  <div className={`bg-dropdown-background fixed py-2 z-[100] top  shadow-xl rounded-sm}`}
  style={{
    top : coordinates.y,
    left : coordinates.x
  }}
  
  ref={ContextMenuRef}
  >
    <ul>

      {
        options.map(({name , callback})=>(

          <li className="py-2 px-2 cursor-pointer hover:bg-background-default-hover" key={name} onClick={(e)=>(handleClick(e,callback))}>
            <span className="text-white">{name}</span>
          </li>
        )
        )
      }
    </ul>


  </div>
  );
}

export default ContextMenu;
