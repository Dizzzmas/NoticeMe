import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons'

export default function Images_Preview(props) {


    return (
        props.images.map((image, i) =>
            <div key={i} className='fadein'>
                <div
                    onClick={() => props.removeImagePreview(image.name)}
                    className='delete'
                >
                    <FontAwesomeIcon icon={faTimesCircle} size='2x'/>
                </div>
                {/*<img src={image.secure_url} alt=''/>*/}
                <img src={URL.createObjectURL(image)} width={250} height={250} />
            </div>
        )
    )
}