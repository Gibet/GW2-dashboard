import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import GW2 from '../service/api';


// This component is used to display the backstory of a character
const Backstory = ({story}) => {

    const [ storyContent, setStoryContent ] = useState(null)
    const [ storyPrompt, setStoryPrompt ] = useState(null)

    useEffect(()=>{
        !storyContent && loadBackstory()
    }, [])

    const loadBackstory = async() => {

        setStoryContent(null)

        // query returning the backstory detail of a character based on the ids provided 
        const info = await GW2.fetch(`backstory/answers?ids=${story.join(",")}`)
        
        setStoryContent(info)
        loadPrompt(info)
    }

    const loadPrompt = async(stories) => {
        var ids = []
        stories?.forEach(story => {
            ids.push(story.question)
        })

        // query returning the backstory prompt of a character based on the ids provided
        const info = await GW2.fetch(`backstory/questions?ids=${ids.join(",")}`)

        setStoryPrompt(info)
    }

    return <>{ (storyContent && storyPrompt) &&
        <Accordion alwaysOpen>
            {storyContent.map((chapter, index) => {
                return <Accordion.Item eventKey={index} key={index}>
                    <Accordion.Header>
                        {storyPrompt[index].title}
                    </Accordion.Header>
                    <Accordion.Body>
                        <h6 dangerouslySetInnerHTML={{__html: chapter.journal}} />
                        <p>
                            {chapter.description}
                        </p>
                    </Accordion.Body>
              </Accordion.Item>
            })}
        </Accordion>
    }</>
}

export default Backstory