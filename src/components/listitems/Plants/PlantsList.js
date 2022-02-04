import {useContext, useEffect, useState} from "react";
import PlantsDataContext from "../../../context/PlantsDataContext";
import {getPlantCategory} from "../../../helpers/functions";
import Card, {PlantCard} from "../Card";
import {GiApothecary, GiFlowerPot, GiFruitBowl, GiGroundSprout, GiHerbsBundle} from "react-icons/all";

function PlantsList() {
    const { plants, fruits, flowers, herbs, vegetables,
        fetchAllPlantsByCategory } = useContext(PlantsDataContext);

    const [showFruits, setShowFruits] = useState(false);
    const [showFlowers, setShowFlowers] = useState(false);
    const [showHerbs, setShowHerbs] = useState(false);
    const [showVegetables, setShowVegetables] = useState(false);

    const handleFruits = () => {
        console.log('show fruits')
        setShowFruits((prevState) => !prevState);
        fetchAllPlantsByCategory('FRUITS');
    }
    const handleFlowers = () => {
        console.log('show flowers')
        setShowFruits(false);
        setShowFlowers((prevState) => !prevState);
        setShowHerbs(false);
        setShowVegetables(false);
        fetchAllPlantsByCategory('FLOWERS');
    }
    const handleVegetables = () => {
        console.log('show vegetables')
        setShowFruits(false);
        setShowFlowers(false);
        setShowHerbs(false);
        setShowVegetables((prevState) => !prevState);
        fetchAllPlantsByCategory('VEGETABLES');
    }
    const handleHerbs = () => {
        console.log('show herbs')
        setShowFruits(false);
        setShowFlowers(false);
        setShowHerbs((prevState) => !prevState);
        setShowVegetables(false);
        fetchAllPlantsByCategory('HERBS');
    }

    const showAll = !showFruits && !showHerbs && !showVegetables && !showFlowers;

    // console.log(allPlants)
    return <div className={'list'}>
        <div className={'filters'}>
            <span onClick={handleFruits}><GiFruitBowl size={50}/>Fruit</span>
            <span onClick={handleFlowers}><GiFlowerPot size={50}/>Bloemen</span>
            <span onClick={handleVegetables}><GiGroundSprout size={50}/>Groenten</span>
            <span onClick={handleHerbs}><GiApothecary size={50}/>Kruiden</span>
        </div>
            { !showAll &&
                <span className={'retro'} onClick={() => {
                    setShowFruits(false);
                    setShowFlowers(false);
                    setShowHerbs(false);
                    setShowVegetables(false);
                }}>Verwijder filter</span>
            }
        <ul>
            { showAll &&
                plants &&
                    plants.map((plant) => {
                        return <PlantCard key={plant.name} type={'preview'} plant={plant}/>
                    })
            }
            { showFruits &&
                fruits &&
                    <>
                        <h3 className={'writing'}>{fruits.length} Fruit Soorten</h3>
                        {
                            fruits.map((plant) => {
                                return <PlantCard key={plant.name} type={'preview'} plant={plant}/>
                            })
                        }
                    </>
            }
            { showFlowers &&
            flowers &&
            <>
                <h3 className={'writing'}>{flowers.length} Bloemen Soorten</h3>
                {
                    flowers.map((plant) => {
                        return <PlantCard key={plant.name} type={'preview'} plant={plant}/>
                    })
                }
            </>
            }{ showVegetables &&
            vegetables &&
            <>
                <h3 className={'writing'}>{vegetables.length} Groenten Soorten</h3>
                {
                    vegetables.map((plant) => {
                        return <PlantCard key={plant.name} type={'preview'} plant={plant}/>
                    })
                }
            </>
            }{showHerbs &&
        herbs &&
        <>
            <h3 className={'writing'}>{herbs.length} Kruiden Soorten</h3>
            {
                herbs.map((plant) => {
                    return <PlantCard key={plant.name} type={'preview'} plant={plant}/>
                })
            }
        </>
        }
        </ul>
    </div>

}

export default PlantsList;