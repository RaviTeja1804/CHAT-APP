import React from 'react'
import "./GenderCheckBox.css" 

function GenderCheckBox({onCheckboxChange, selectedGender}) {
  return (
    <div className='gender'>
        <div className="maleGender">
            <label className={`maleLabel`}>
                <span className='male'>Male</span>
                <input type='checkbox' className='checkbox' checked={selectedGender === "male"} onChange={() => onCheckboxChange("male")}/>
            </label>
        </div>

        <div className="femaleGender">
            <label className={`maleLabel`}>
                <span className='male'>Female</span>
                <input type='checkbox' className='checkbox' checked={selectedGender === "female"} onChange={() => onCheckboxChange("female")}/>
            </label>
        </div>
    </div>
  )
}

export default GenderCheckBox