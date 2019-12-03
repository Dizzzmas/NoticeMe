import React from 'react'
import {FontAwesomeIcon} from '@fontawesome/react-fontawesome'
import {faImages, faImage} from '@fontawesome/free-solid-svg-icons'

export default function ImageButton(props) {

    return (
        <div className='buttons fadein'>
            <div className='button'>
                <label htmlFor='multi'>
                    <FontAwesomeIcon icon={faImages} color='#6d84b4' size='10x'/>
                </label>
                <input type='file' id='multi' onChange={props.onChange} multiple/>
            </div>
        </div>
    )
}