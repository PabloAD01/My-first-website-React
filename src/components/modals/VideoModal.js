import React, {forwardRef, useImperativeHandle,useContext} from 'react';
import PropTypes from 'prop-types';
import {ModalContext} from '../../providers/ModalProvider';
  

const VideoModal = forwardRef(({ children, isActive, closeModal }, ref) => {
      useImperativeHandle(ref, ()=>{
        return{
          printSomething: handlevideo

        }
      },[])
      
      const {caca} = useContext(ModalContext);

      const handlevideo = () =>{
        console.log('videos')
      }

    if (isActive === false) return 
  
    return (
        <div onClick={caca} style={styles.overlay}>
            {children}
        </div>
    )
  });
  
  VideoModal.propTypes = {
    children: PropTypes.node.isRequired,
    isActive: PropTypes.bool
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
  };
  

export default VideoModal
