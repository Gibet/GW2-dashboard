import React, { useEffect, useState } from 'react';
import Trait from './Trait';
import GW2 from '../../../service/api';

//this component is used to display a traitline with its traits and background image
const  Traitline = ({line}) => {

    const [ major, setMajor ] = useState(null)
    const [ minor, setMinor ] = useState(null)

    useEffect(()=> {
        // load the traits of the traitline if they are not already loaded
        !major && loadMajor()
        !minor && loadMinor()
    }, [])

    // query returning the major traits of a traitline based on the ids provided
    const loadMajor = async() => {
        const info = await GW2.fetch(`traits?ids=${line.major_traits.join(",")}`)
        setMajor(info)
    }

    // query returning the minor traits of a traitline based on the ids provided
    const loadMinor = async() => {
        const info = await GW2.fetch(`traits?ids=${line.minor_traits.join(",")}`)
        setMinor(info) 
    }

    return  <>{ (major && minor) &&
                <div className="traitline" id={line.name} style={{
                    backgroundImage: `url(${line.background})`,
                    backgroundPosition: 'bottom left'}}>

                    <div  className="traitline_icon">
                        <div title={line.name} className='line_icon'></div>
                    </div>

                    <Trait trait = {minor[0]}/>

                    <div className="trait_tier">
                        <Trait trait = {major[0]}/>
                        <Trait trait = {major[1]}/>
                        <Trait trait = {major[2]}/>
                    </div>

                    <Trait trait = {minor[1]}/>
                    
                    <div className="trait_tier">
                        <Trait trait = {major[3]}/>
                        <Trait trait = {major[4]}/>
                        <Trait trait = {major[5]}/>
                    </div>

                    <Trait trait = {minor[2]}/>
                    
                    <div className="trait_tier">
                        <Trait trait = {major[6]}/>
                        <Trait trait = {major[7]}/>
                        <Trait trait = {major[8]}/>
                    </div>
                </div>
            }</>
}

export default Traitline