import React, { useState, useEffect, useRef } from "react";

function AdviceBox() {
  const [advice, setAdvice] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const isMounted = useRef(false);
  const [buttonStyleClassName, setButtonStyleClassName] =
    useState("button-default");
  const isClickable = useRef(true);

  useEffect(() => {
    //get initial advice on start of app
    fetch("https://api.adviceslip.com/advice")
      .then((res) => res.json())
      .then((json) => {
        setIsLoaded(true);
        setAdvice(json);
      });

    //set mount status
    if (!isMounted.current) {
      isMounted.current = true;
    }
  }, []);

  function generateNewAdvice() {
    fetch("https://api.adviceslip.com/advice")
      .then((res) => res.json())
      .then((json) => {
        setIsLoaded(true);
        setAdvice(json);
      });
  }

  useEffect(() => {
    if (isLoaded == false) {
      if (isMounted) {
        generateNewAdvice();
      }
    }
  }, [isLoaded]);

  function handleClick() {
    if (isClickable.current) {
      //off cooldown, get new advice
      setIsLoaded(false);
      setButtonStyleClassName("button-greyed");
      setTimeout(setDefaultButtonStyle, 2000);
      isClickable.current = false;
    }
  }

  function setDefaultButtonStyle() {
    setButtonStyleClassName("button-default");
    isClickable.current = true;
  }

  if (!isLoaded) {
    return (
      <div id="advice-box">
        <div id="loading-text">Loading...</div>
      </div>
    );
  } else {
    return (
      <>
        <div id="advice-box">
          <div id="advice-title">Advice #{advice.slip.id}</div>
          <div id="advice-text">"{advice.slip.advice}"</div>
          <img
            src="./images/pattern-divider-desktop.svg"
            id="divider"
          ></img>
          <br></br>
          <div
            className={buttonStyleClassName}
            id="button-container"
            onClick={() => handleClick()}
          >
            <img
              src="./images/icon-dice.svg"
              id="button-img"
            ></img>
          </div>
        </div>
      </>
    );
  }
}

export default AdviceBox;
