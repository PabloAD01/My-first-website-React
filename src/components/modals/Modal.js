import React, { useState, useEffect, memo, useImperativeHandle, forwardRef, useContext } from 'react';
import PropTypes from 'prop-types'
import {ModalContext} from '../../providers/ModalProvider';

const Modal = forwardRef(({children, closeModal}, ref) => {

  useImperativeHandle(ref, () => {
    return {
      printData: handleSomething
    }
  }, [])

  const object = {
    name: 'elias',
    lastname: 'araya'
  }

  const {name} = object

  const {caca} = useContext(ModalContext);

  useEffect(()=>{
    const handleEventLister = (event) => {
      console.log('xcoord:', event.screenX +" "+  "ycoord:", event.screenY)
    }

    document.addEventListener("mousemove", handleEventLister)
    return () =>{
      document.removeEventListener("mousemove", handleEventLister)
      console.log('Componente Desmontado')
    }
  }
  ,[])

  const handleSomething = () =>{
    console.log('caca')
  }

  return (
    <div onClick={caca} style={styles.overlay}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
});

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func,
};

const styles = {
  overlay: {
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    height: '100%',
    width: '100%',
    zIndex: 9999,
    
  },
  modal: {
    width: 300,
    height: 300,
    
    
  },
};

export default memo(Modal);