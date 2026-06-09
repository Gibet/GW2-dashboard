import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Achievement from '../components/Achievements/Achievement';
import GW2 from '../service/api';



const AchievementsPage = () => {

    const [ groups, setGroups] = useState(null)
    const [ categories, setCategories ] = useState(null)
    const [ achievements, setAchievements] = useState(null)
    const [ accountAchievements, setAccountAchievements] = useState(null)

    useEffect(()=>{

        !groups && loadAllGroups()
        !accountAchievements && loadAccountAchievements()

    }, [groups, categories, achievements])
    

    // load all the groups of achievements
    const loadAllGroups = async() => {
        const ids = await GW2.fetch(`achievements/groups`)  
        const results = await GW2.fetch(`achievements/groups?ids=${ids.join(',')}`)

        setGroups(results)
    }
    const loadAccountAchievements = async() => {

        if(!localStorage.getItem('api_key')){return}
        
        const accountResults = await GW2.account(`account/achievements`)

        setAccountAchievements(accountResults)
    }
    const loadGroup = async (index, ids) => {

        const tempGroups = [...groups]
        let results = await GW2.fetch(`achievements/categories?ids=${ids.join(',')}`)

        tempGroups[index].details = results
        setGroups(tempGroups)
    }
    const loadCategory = async (name, ids) => {

        if (ids.length != 0) {
            let results = await GW2.fetch(`achievements?ids=${ids.join(',')}`)

            setAchievements(results)
        }
    }

    return <div className='page-container achievements-page'>{ groups &&
        <div className="achievements-menu">
            <Accordion>
                {groups.map((group, index) => {
                    return <Accordion.Item eventKey={index} key={index}>
                        <Accordion.Header onClick={()=>{loadGroup(index ,group.categories)}}>
                            {group.name}
                        </Accordion.Header>
                        <Accordion.Body>
                            {group.details && <div id='category-menu'>{group.details.map((category, index) => {
                                return  <li key={index} onClick={() => loadCategory(category.name, category.achievements)}>
                                            <img src={category.icon}></img>{category.name}
                                        </li>
                            })}</div>}
                        </Accordion.Body>
                  </Accordion.Item>
                })}
            </Accordion>   
        </div>}
        <div id='achievements-list'>
                {achievements?.map((achievement, index) => {
                    return <Achievement
                        key={index}
                        achievement={achievement}
                        status={ accountAchievements?.find(accountAchievement => accountAchievement.id === achievement.id)}
                    />
                })}
        </div>
    </div>
}   

export default AchievementsPage