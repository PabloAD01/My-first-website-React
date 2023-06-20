import React, {forwardRef, useImperativeHandle, memo} from "react"
import '../../styles/DescCard.css';

const DescCard = forwardRef(({}, ref) => {

  useImperativeHandle(ref, () => {
    return {
      layout: ref.current.clientHeight
    }
  }, [])

  return(
    <div ref={ref} className="desc-card">
        <div className="card-title">LEND</div>
            <div className="card-content">
              <h2>Subtitle</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                dolorum, repudiandae ipsam alias ratione nisi impedit vitae ab
                debitis esse repellat eos nihil temporibus maiores facere
                voluptatibus dolore! Magnam, atque.
              </p>
        </div>
    </div>
    )
})

export default DescCard