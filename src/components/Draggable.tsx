import React, {useState, useRef} from 'react';
import '../styles/StockInfo.css';


type Props = {
  rootClass?: string,
  children?: React.ReactNode
}

const Draggable: React.FC<Props> = ({ rootClass = "", children }) => {
  const ourRef = useRef<any>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const mouseCoords = useRef({
    startX: 0,
    scrollLeft: 0
  });

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ourRef.current) return;

    const slider = ourRef.current.children[0];

    const startX = e.pageX - slider.offsetLeft;
    const scrollLeft = slider.scrollLeft;

    mouseCoords.current = {startX, scrollLeft};
    setIsMouseDown(true);

    document.body.getElementsByClassName("slider")[0].classList.add("grabbed");
  }
  

  const handleDragEnd = () => {
    setIsMouseDown(false);

    if (!ourRef.current) return;

    document.body.getElementsByClassName("slider")[0].classList.remove("grabbed");
  }


  const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown || ! ourRef.current) return;
    e.preventDefault();

    const slider = ourRef.current.children[0];

    const x = e.pageX - slider.offsetLeft;
    const walkX = x - mouseCoords.current.startX;

    slider.scrollLeft = mouseCoords.current.scrollLeft - walkX;
  }

  
  return (
    <div
      ref={ourRef}
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onMouseMove={handleDrag}
      onMouseLeave={handleDragEnd}
      className={rootClass + "draggable"}
    >
      {children}
    </div>
  );
};

export default Draggable;