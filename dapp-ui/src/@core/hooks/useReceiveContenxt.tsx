import React, { useState, createContext, useContext } from 'react'

//create a context, with createContext api
export const ReceiveContext = createContext<any>(null);

export const ReceiveContextProvider = (props: React.ComponentProps<any>) => {

  return (
    <ReceiveContext.Provider value={{
    }}>
      {props.children}
    </ReceiveContext.Provider>
  );
};

const useReceiveContext = () => useContext(ReceiveContext)
export default useReceiveContext
