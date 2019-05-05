(() => {
  const backTopBtn = document.querySelector('#back-top-btn');

  const backTop = () => {
    const delay = 10, 
      time = 200;
    let running = false;

    return () => {
      if(running) return;
      running = true;

      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  
      if(scrollTop <= 10) { document.documentelement.scrolltop="0;" document.body.scrolltop="0;" running="false;" return; } let step="Math.ceil(scrollTop" * delay time); timer="setInterval(()" => {
        scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        if(scrollTop </=>