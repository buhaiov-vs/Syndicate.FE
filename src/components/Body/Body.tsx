'use client';

import { useRef, useState } from "react";

type BodyProps = {
  children: any
}

export default function Body({ children }: BodyProps) {
  const [ scrolling, setScrolling ] = useState(false);
  const scrollTimer = useRef<NodeJS.Timeout | null>(null);
  
  const onScroll = () => {
    setScrolling(true)
    if(scrollTimer == null) return;

    clearTimeout(scrollTimer.current!);
    
    scrollTimer.current = setTimeout(function() {
      setScrolling(false);
      scrollTimer.current = null;
    }, 1000);
  }
    
  return (
    <div className={`flex flex-col px-2 flex-1 h-full custom-scroll ${scrolling ? "custom-scroll-active" : ""}`} onScroll={onScroll}>
      <div className="h-full">
        {children}
      </div>
    </div>
  )
}