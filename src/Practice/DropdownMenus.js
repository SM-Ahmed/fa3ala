import React from 'react';
import './DropdownMenus.css';

const DropdownMenus = ({form, setForm, tense, setTense, voice, setVoice, orderBy, setOrderBy}) => {
    return (
        <div className="DropdownMenus">
            <div className="DropdownMenu">
                <p></p>
                <p>Form</p> 
                <select value={form} onChange={(event) => {setForm(event.target.value)}}>
                    <option value="I">I</option>
                    <option value="II">II</option>
                    <option value="III">III</option>
                    <option value="IV">IV</option>
                    <option value="V">V</option>
                    <option value="VI">VI</option>
                    <option value="VII">VII</option>
                    <option value="VIII">VIII</option>
                    <option value="IX">IX</option>
                    <option value="X">X</option>
                </select>
                <p></p>
            </div>
            <div className="DropdownMenu">
                <p></p>
                <p>Tense / Mood</p> 
                <select value={tense} onChange={(event) => {setTense(event.target.value)}}>
                    <option value="perfect">Perfect</option>
                    <option value="imperfect-indicative">Imperfect Indicative</option>
                    <option value="imperfect-subjunctive">Imperfect Subjunctive</option>
                    <option value="imperfect-jussive">Imperfect Jussive</option>
                    <option value="imperative">Imperative</option>
                </select>
                <p></p>
            </div>
            <div className="DropdownMenu">
                <p></p>
                <p>Voice</p>
                <select value={voice} onChange={(event) => {setVoice(event.target.value)}}>
                    <option value="active">Active</option>
                    <option value="passive">Passive</option>
                </select>
                <p></p>
            </div>
            <div className="DropdownMenu">
                <p></p>
                <p>Order By</p>
                <select value={orderBy} onChange={(event) => {setOrderBy(event.target.value)}}>
                    <option value="number">Number</option>
                    <option value="person">Person</option>
                </select>
                <p></p>
            </div>
      </div>
    )
}

export default DropdownMenus;