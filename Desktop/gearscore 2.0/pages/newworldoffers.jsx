import React, { useState, useEffect, useRef, useCallback } from 'react';

// Define all constants outside the component for better readability and to avoid re-definition on re-renders
const TOTAL_LEVELS_TO_BOOST = 64;
const BASE_HOURS_PER_LEVEL = 0.5;
const MIN_PRICE_PER_ONE_LEVEL = 2.00;
const PILOTED_MULTIPLIER = 1.0;

const PRICE_60_65_REGULAR = 10;
const PRICE_60_65_SEASONAL = 13;
const LEVELS_IN_60_65_RANGE = 5;

const PRICE_30_40_REGULAR = 5;
const PRICE_30_40_SEASONAL = 6.5;
const LEVELS_IN_30_40_RANGE = 11;

const REGULAR_WORLD_TOTAL_PRICE_FULL_RANGE = 35;
const SEASONAL_WORLD_TOTAL_PRICE_FULL_RANGE = 45;

const TOTAL_LEVELS_IN_FIXED_PRICE_SEGMENTS = LEVELS_IN_30_40_RANGE + LEVELS_IN_60_65_RANGE;
const LEVELS_FOR_VARIABLE_PRICING = TOTAL_LEVELS_TO_BOOST - TOTAL_LEVELS_IN_FIXED_PRICE_SEGMENTS;

const FIXED_PRICE_TOTAL_REGULAR = PRICE_30_40_REGULAR + PRICE_60_65_REGULAR;
const FIXED_PRICE_TOTAL_SEASONAL = PRICE_30_40_SEASONAL + PRICE_60_65_SEASONAL;

const REMAINING_PRICE_REGULAR = REGULAR_WORLD_TOTAL_PRICE_FULL_RANGE - FIXED_PRICE_TOTAL_REGULAR;
const REMAINING_PRICE_SEASONAL = SEASONAL_WORLD_TOTAL_PRICE_FULL_RANGE - FIXED_PRICE_TOTAL_SEASONAL;

const PRICE_PER_LEVEL_VARIABLE_REGULAR = REMAINING_PRICE_REGULAR / LEVELS_FOR_VARIABLE_PRICING;
const PRICE_PER_LEVEL_VARIABLE_SEASONAL = REMAINING_PRICE_SEASONAL / LEVELS_FOR_VARIABLE_PRICING;

const GORGON_BOSS_PRICES = {
    '1': 15.00,
    '2': 30.00,
    '3': 40.00
};

const ELITE_CHEST_DAYS_PRICES = {
    '1': 10.00,
    '2': 15.00
};

const POWER_LEVELING_EXTRAS_PRICES = {
    'weaponMastery': 7.00,
    'specificWeapons': 0,
    'specificCovenant': 0
};

const DUNGEON_PRICES = {
    'Amrine Excavation': 0, 'Starstone Barrows': 0, 'The Depths': 0, 'Dynasty Shipyard': 0,
    'Garden of Genesis': 0, 'Lazarus Instrumentality': 0, 'Tempest’s Heart': 0,
    'Barnacles and Black Powder': 0, 'The Ennead': 0, 'Empyrean Forge': 0,
    'Savage Divide': 0, 'The Glacial Tarn': 0
};

const MUTATION_LEVEL_PRICES = {
    'Level 1': 0, 'Level 2': 0
};

const ARTIFACT_PRICES = {
    'Trsna': 60.00, 'Power Stone': 20.00, 'Inferno': 12.00, 'The Abyss': 12.00,
    'Odo': 12.00, 'The Wall': 12.00, 'Spark of Mjolnir': 12.00, 'The Butcher': 12.00,
    'Scorpion’s Sting': 12.00, 'Freya’s Francisca': 12.00, 'The Mechanic': 12.00,
    'Finisher': 12.00, 'Lifetaker': 12.00, 'Boltcaster': 12.00
};

const ARTIFACT_BOOST_OPTIONS_PRICES = {
    'questCompletion': 13.00, 'fullUpgrade': 119.00
};

const ARTIFACT_COMPLETION_SPEED_PRICES = {
    'express': 2.80, 'superExpress': 5.60
};

const PRICE_PER_RUN = 1.50;
const MIN_RUNS = 1;
const MAX_RUNS = 35;

function App() {
    // State for Power Leveling
    const [currentLevel, setCurrentLevel] = useState(1);
    const [desiredLevel, setDesiredLevel] = useState(65);
    const [worldType, setWorldType] = useState('Seasonal World');
    const [powerLevelingExtras, setPowerLevelingExtras] = useState([]);
    const [powerLevelingPrice, setPowerLevelingPrice] = useState(0);

    // State for Artifacts
    const [selectedArtifact, setSelectedArtifact] = useState('');
    const [artifactBoostOption, setArtifactBoostOption] = useState(null);
    const [completionSpeed, setCompletionSpeed] = useState(null);
    const [artifactPlatform, setArtifactPlatform] = useState('PC');
    const [artifactTotalPrice, setArtifactTotalPrice] = useState(0);

    // State for Gorgon Raid
    const [gorgonBosses, setGorgonBosses] = useState('1');
    const [gorgonPrice, setGorgonPrice] = useState(0);

    // State for Expedition Runs
    const [selectedRuns, setSelectedRuns] = useState(1);
    const [selectedDungeon, setSelectedDungeon] = useState('');
    const [selectedMutationLevel, setSelectedMutationLevel] = useState('');
    const [expeditionPrice, setExpeditionPrice] = useState(0);

    // State for Elite Chest Runs
    const [eliteChestDays, setEliteChestDays] = useState('1');
    const [eliteChestPrice, setEliteChestPrice] = useState(0);

    // State for Navbar Language
    const [language, setLanguage] = useState('en');

    // Refs for sliders
    const levelRangeSliderRef = useRef(null);
    const thumbLeftRef = useRef(null);
    const thumbRightRef = useRef(null);
    const rangeFillRef = useRef(null);

    const expeditionRunsContainerRef = useRef(null);
    const expeditionRunsThumbRef = useRef(null);
    const expeditionRunsFillRef = useRef(null);

    // Helper to convert value to percentage for slider display
    const valueToPercentage = useCallback((value, minVal, maxVal) => {
        return ((value - minVal) / (maxVal - minVal)) * 100;
    }, []);

    // Helper to convert percentage to value for slider logic
    const percentageToValue = useCallback((percentage, minVal, maxVal) => {
        return Math.round((percentage / 100) * (maxVal - minVal) + minVal);
    }, []);

    // Effect for Power Leveling price calculation and UI update
    useEffect(() => {
        const levelDifference = desiredLevel - currentLevel;
        let calculatedPrice = 0;

        if (levelDifference > 0) {
            for (let i = currentLevel; i < desiredLevel; i++) {
                let levelPrice = 0;
                if (i >= 30 && i <= 39) {
                    levelPrice = (worldType === 'Regular World' ? PRICE_30_40_REGULAR : PRICE_30_40_SEASONAL) / LEVELS_IN_30_40_RANGE;
                } else if (i >= 60 && i <= 64) {
                    levelPrice = (worldType === 'Regular World' ? PRICE_60_65_REGULAR : PRICE_60_65_SEASONAL) / LEVELS_IN_60_65_RANGE;
                } else {
                    levelPrice = (worldType === 'Regular World' ? PRICE_PER_LEVEL_VARIABLE_REGULAR : PRICE_PER_LEVEL_VARIABLE_SEASONAL);
                }
                calculatedPrice += levelPrice;
            }
            if (levelDifference === 1 && calculatedPrice < MIN_PRICE_PER_ONE_LEVEL) {
                calculatedPrice = MIN_PRICE_PER_ONE_LEVEL;
            }
        }

        powerLevelingExtras.forEach(extra => {
            calculatedPrice += POWER_LEVELING_EXTRAS_PRICES[extra];
        });

        setPowerLevelingPrice((calculatedPrice * PILOTED_MULTIPLIER).toFixed(2));

        // Update slider UI
        if (thumbLeftRef.current && thumbRightRef.current && rangeFillRef.current) {
            const leftThumbPercent = valueToPercentage(currentLevel, 1, 65);
            const rightThumbPercent = valueToPercentage(desiredLevel, 1, 65);
            thumbLeftRef.current.style.left = `${leftThumbPercent}%`;
            thumbRightRef.current.style.left = `${rightThumbPercent}%`;
            rangeFillRef.current.style.left = `${leftThumbPercent}%`;
            rangeFillRef.current.style.width = `${rightThumbPercent - leftThumbPercent}%`;
        }

    }, [currentLevel, desiredLevel, worldType, powerLevelingExtras, valueToPercentage]);

    // Effect for Artifacts price calculation and UI update
    useEffect(() => {
        let price = 0;
        if (selectedArtifact && ARTIFACT_PRICES[selectedArtifact] !== undefined) {
            price += ARTIFACT_PRICES[selectedArtifact];
        }
        if (artifactBoostOption && ARTIFACT_BOOST_OPTIONS_PRICES[artifactBoostOption] !== undefined) {
            price += ARTIFACT_BOOST_OPTIONS_PRICES[artifactBoostOption];
        }
        if (completionSpeed && ARTIFACT_COMPLETION_SPEED_PRICES[completionSpeed] !== undefined) {
            price += ARTIFACT_COMPLETION_SPEED_PRICES[completionSpeed];
        }
        setArtifactTotalPrice(price.toFixed(2));
    }, [selectedArtifact, artifactBoostOption, completionSpeed]);

    // Effect for Gorgon Raid price calculation and UI update
    useEffect(() => {
        let price = GORGON_BOSS_PRICES[gorgonBosses] || 0;
        setGorgonPrice((price * PILOTED_MULTIPLIER).toFixed(2));
    }, [gorgonBosses]);

    // Effect for Expedition Runs price calculation and UI update
    useEffect(() => {
        let price = selectedRuns * PRICE_PER_RUN;
        if (selectedDungeon && DUNGEON_PRICES[selectedDungeon] !== undefined) {
            price += DUNGEON_PRICES[selectedDungeon];
        }
        if (selectedMutationLevel && MUTATION_LEVEL_PRICES[selectedMutationLevel] !== undefined) {
            price += MUTATION_LEVEL_PRICES[selectedMutationLevel];
        }
        setExpeditionPrice((price * PILOTED_MULTIPLIER).toFixed(2));

        // Update expedition runs slider UI
        if (expeditionRunsThumbRef.current && expeditionRunsFillRef.current) {
            const thumbPercent = valueToPercentage(selectedRuns, MIN_RUNS, MAX_RUNS);
            expeditionRunsThumbRef.current.style.left = `${thumbPercent}%`;
            expeditionRunsFillRef.current.style.width = `${thumbPercent}%`;
        }
    }, [selectedRuns, selectedDungeon, selectedMutationLevel, valueToPercentage]);

    // Effect for Elite Chest Runs price calculation and UI update
    useEffect(() => {
        let price = ELITE_CHEST_DAYS_PRICES[eliteChestDays] || 0;
        setEliteChestPrice((price * PILOTED_MULTIPLIER).toFixed(2));
    }, [eliteChestDays]);

    // Slider logic for Power Leveling
    const minOverallLevel = 1;
    const maxOverallLevel = 65;
    let activeLevelThumb = null; 

    const onMouseDownLevel = useCallback((e, thumbType) => {
        activeLevelThumb = thumbType;
        document.addEventListener('mousemove', onMouseMoveLevel);
        document.addEventListener('mouseup', onMouseUpLevel);
    }, []);

    const onTouchStartLevel = useCallback((e, thumbType) => {
        e.preventDefault();
        activeLevelThumb = thumbType;
        document.addEventListener('touchmove', onTouchMoveLevel, { passive: false });
        document.addEventListener('touchend', onTouchEndLevel);
    }, []);

    const onMouseMoveLevel = useCallback((e) => {
        if (!activeLevelThumb || !levelRangeSliderRef.current) return;
        const sliderRect = levelRangeSliderRef.current.getBoundingClientRect();
        let newX = e.clientX - sliderRect.left;
        newX = Math.max(0, Math.min(newX, sliderRect.width));
        const newPercentage = (newX / sliderRect.width) * 100;
        let newValue = percentageToValue(newPercentage, minOverallLevel, maxOverallLevel);

        if (activeLevelThumb === 'left') {
            newValue = Math.min(newValue, desiredLevel - 1);
            if (newValue < minOverallLevel) newValue = minOverallLevel;
            setCurrentLevel(newValue);
        } else {
            newValue = Math.max(newValue, currentLevel + 1);
            if (newValue > maxOverallLevel) newValue = maxOverallLevel;
            setDesiredLevel(newValue);
        }
    }, [currentLevel, desiredLevel, percentageToValue]);

    const onTouchMoveLevel = useCallback((e) => {
        if (!activeLevelThumb || !e.touches[0] || !levelRangeSliderRef.current) return;
        const sliderRect = levelRangeSliderRef.current.getBoundingClientRect();
        let newX = e.touches[0].clientX - sliderRect.left;
        newX = Math.max(0, Math.min(newX, sliderRect.width));
        const newPercentage = (newX / sliderRect.width) * 100;
        let newValue = percentageToValue(newPercentage, minOverallLevel, maxOverallLevel);

        if (activeLevelThumb === 'left') {
            newValue = Math.min(newValue, desiredLevel - 1);
            if (newValue < minOverallLevel) newValue = minOverallLevel;
            setCurrentLevel(newValue);
        } else {
            newValue = Math.max(newValue, currentLevel + 1);
            if (newValue > maxOverallLevel) newValue = maxOverallLevel;
            setDesiredLevel(newValue);
        }
    }, [currentLevel, desiredLevel, percentageToValue]);

    const onMouseUpLevel = useCallback(() => {
        activeLevelThumb = null;
        document.removeEventListener('mousemove', onMouseMoveLevel);
        document.removeEventListener('mouseup', onMouseUpLevel);
    }, [onMouseMoveLevel]);

    const onTouchEndLevel = useCallback(() => {
        activeLevelThumb = null;
        document.removeEventListener('touchmove', onTouchMoveLevel);
        document.removeEventListener('touchend', onTouchEndLevel);
    }, [onTouchMoveLevel]);

    // New: Handle click on Power Leveling slider track
    const handlePowerLevelingTrackClick = useCallback((e) => {
        if (!levelRangeSliderRef.current) return;
        const sliderRect = levelRangeSliderRef.current.getBoundingClientRect();
        const clickX = e.clientX - sliderRect.left;
        const clickPercentage = (clickX / sliderRect.width) * 100;
        const clickedValue = percentageToValue(clickPercentage, minOverallLevel, maxOverallLevel);

        // Determine which thumb is closer to the click
        const distToCurrent = Math.abs(clickedValue - currentLevel);
        const distToDesired = Math.abs(clickedValue - desiredLevel);

        if (distToCurrent <= distToDesired) {
            // If clicked value is less than or equal to desired level minus 1, move currentLevel
            if (clickedValue <= desiredLevel - 1) {
                setCurrentLevel(clickedValue);
            } else { // Otherwise, move desiredLevel
                setDesiredLevel(clickedValue);
            }
        } else {
            // If clicked value is greater than or equal to current level plus 1, move desiredLevel
            if (clickedValue >= currentLevel + 1) {
                setDesiredLevel(clickedValue);
            } else { // Otherwise, move currentLevel
                setCurrentLevel(clickedValue);
            }
        }
    }, [currentLevel, desiredLevel, percentageToValue, minOverallLevel, maxOverallLevel]);

    // Slider logic for Expedition Runs
    let activeRunsThumb = null; 

    const onMouseDownRuns = useCallback((e) => {
        activeRunsThumb = 'expeditionRuns';
        document.addEventListener('mousemove', onMouseMoveRuns);
        document.addEventListener('mouseup', onMouseUpRuns);
    }, []);

    const onTouchStartRuns = useCallback((e) => {
        e.preventDefault();
        activeRunsThumb = 'expeditionRuns';
        document.addEventListener('touchmove', onTouchMoveRuns, { passive: false });
        document.addEventListener('touchend', onTouchEndRuns);
    }, []);

    const onMouseMoveRuns = useCallback((e) => {
        if (!activeRunsThumb || !expeditionRunsContainerRef.current) return;
        const sliderRect = expeditionRunsContainerRef.current.getBoundingClientRect();
        let newX = e.clientX - sliderRect.left;
        newX = Math.max(0, Math.min(newX, sliderRect.width));
        const newPercentage = (newX / sliderRect.width) * 100;
        let newValue = percentageToValue(newPercentage, MIN_RUNS, MAX_RUNS);

        newValue = Math.max(MIN_RUNS, Math.min(newValue, MAX_RUNS));
        setSelectedRuns(newValue);
    }, [percentageToValue]);

    const onTouchMoveRuns = useCallback((e) => {
        if (!activeRunsThumb || !e.touches[0] || !expeditionRunsContainerRef.current) return;
        const sliderRect = expeditionRunsContainerRef.current.getBoundingClientRect();
        let newX = e.touches[0].clientX - sliderRect.left;
        newX = Math.max(0, Math.min(newX, sliderRect.width));
        const newPercentage = (newX / sliderRect.width) * 100;
        let newValue = percentageToValue(newPercentage, MIN_RUNS, MAX_RUNS);

        newValue = Math.max(MIN_RUNS, Math.min(newValue, MAX_RUNS));
        setSelectedRuns(newValue);
    }, [percentageToValue]);

    const onMouseUpRuns = useCallback(() => {
        activeRunsThumb = null;
        document.removeEventListener('mousemove', onMouseMoveRuns);
        document.removeEventListener('mouseup', onMouseUpRuns);
    }, [onMouseMoveRuns]);

    const onTouchEndRuns = useCallback(() => {
        activeRunsThumb = null;
        document.removeEventListener('touchmove', onTouchMoveRuns);
        document.removeEventListener('touchend', onTouchEndRuns);
    }, [onTouchMoveRuns]);

    // New: Handle click on Expedition Runs slider track
    const handleExpeditionTrackClick = useCallback((e) => {
        if (!expeditionRunsContainerRef.current) return;
        const sliderRect = expeditionRunsContainerRef.current.getBoundingClientRect();
        const clickX = e.clientX - sliderRect.left;
        const clickPercentage = (clickX / sliderRect.width) * 100;
        const clickedValue = percentageToValue(clickPercentage, MIN_RUNS, MAX_RUNS);
        setSelectedRuns(clickedValue);
    }, [percentageToValue, MIN_RUNS, MAX_RUNS]);

    // ** START of the new goToFakeCheckout function **
    const goToFakeCheckout = (offerType) => {
        const query = new URLSearchParams();
        query.append('offerType', offerType);

        if (offerType === 'powerLeveling') {
            query.append('current', currentLevel);
            query.append('desired', desiredLevel);
            query.append('world', worldType);
            query.append('platform', document.getElementById('platformSelect').value); // Using ID for platform
            query.append('extras', powerLevelingExtras.join(','));
            query.append('price', powerLevelingPrice);
        } else if (offerType === 'artifacts') {
            query.append('artifact', selectedArtifact);
            if (artifactBoostOption) query.append('boostOption', artifactBoostOption);
            if (completionSpeed) query.append('completionSpeed', completionSpeed);
            query.append('platform', artifactPlatform);
            query.append('price', artifactTotalPrice);
        } else if (offerType === 'gorgonRaid') {
            query.append('bosses', gorgonBosses);
            query.append('price', gorgonPrice);
        } else if (offerType === 'expeditionRuns') {
            query.append('runs', selectedRuns);
            if (selectedDungeon) query.append('dungeon', selectedDungeon);
            if (selectedMutationLevel) query.append('mutationLevel', selectedMutationLevel);
            query.append('price', expeditionPrice);
        } else if (offerType === 'eliteChestRuns') {
            query.append('days', eliteChestDays);
            query.append('price', eliteChestPrice);
        } else if (offerType === 'callToAction') {
            // No specific parameters needed for general call to action, but could add if desired
        }

        window.location.href = `/fake-checkout?${query.toString()}`;
    };
    // ** END of the new goToFakeCheckout function **

    return (
        <div className="antialiased">
            {/* Custom CSS for the page */}
            

            {/* Navbar */}
            

            {/* Hero Section for New World Offers Page */}
            

            {/* New World Offers Section */}
            <section className="py-16 bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                        {/* New World Power Leveling */}
                        <div className="offer-card">
                            <h2 className="text-3xl font-bold text-white mb-4">New World Power Leveling</h2>
                            <p className="text-gray-300 mb-6">Choose your desired level range for professional power leveling service.</p>
                            
                            <div className="space-y-6 mb-6">
                                {/* Dual-Handle Level Slider */}
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-gray-300 text-lg font-semibold">Current Level:</span>
                                    <span id="currentLevelDisplay" className="text-indigo-400 text-xl font-bold">{currentLevel}</span>
                                    <span className="text-gray-300 text-lg font-semibold ml-auto mr-2">Desired Level:</span>
                                    <span id="desiredLevelDisplay" className="text-indigo-400 text-xl font-bold">{desiredLevel}</span>
                                </div>
                                <div className="range-slider-container" ref={levelRangeSliderRef} onClick={handlePowerLevelingTrackClick}>
                                    <div className="range-slider-fill" ref={rangeFillRef}></div>
                                    <div className="slider-thumb" ref={thumbLeftRef} onMouseDown={(e) => onMouseDownLevel(e, 'left')} onTouchStart={(e) => onTouchStartLevel(e, 'left')}></div>
                                    <div className="slider-thumb" ref={thumbRightRef} onMouseDown={(e) => onMouseDownLevel(e, 'right')} onTouchStart={(e) => onTouchStartLevel(e, 'right')}></div>
                                </div>
                                
                                {/* Choose World Radio Buttons */}
                                <div className="text-left mt-6">
                                    <label className="block text-gray-300 text-lg font-semibold mb-3">Choose World:</label>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <label className="inline-flex items-center text-gray-300 cursor-pointer">
                                            <input type="radio" name="worldType" value="Seasonal World" className="form-radio text-indigo-500" checked={worldType === 'Seasonal World'} onChange={() => setWorldType('Seasonal World')} />
                                            <span className="ml-2 text-lg">Seasonal World</span>
                                        </label>
                                        <label className="inline-flex items-center text-gray-300 cursor-pointer">
                                            <input type="radio" name="worldType" value="Regular World" className="form-radio text-indigo-500" checked={worldType === 'Regular World'} onChange={() => setWorldType('Regular World')} />
                                            <span className="ml-2 text-lg">Regular World</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Choose Your Platform Dropdown */}
                                <div className="text-left mt-6">
                                    <label htmlFor="platformSelect" className="block text-gray-300 text-lg font-semibold mb-3">Choose Your Platform:</label>
                                    <select id="platformSelect" className="bg-gray-700 text-gray-200 rounded-md py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                        <option value="PC">PC</option>
                                    </select>
                                </div>

                                {/* Choose Extras for Power Leveling */}
                                <div className="text-left mt-6">
                                    <label className="block text-gray-300 text-lg font-semibold mb-3">Choose Extras:</label>
                                    <div className="flex flex-col gap-2">
                                        <label className="inline-flex items-center text-gray-300 cursor-pointer">
                                            <input type="checkbox" name="powerLevelingExtra" value="weaponMastery" className="form-checkbox text-indigo-500" checked={powerLevelingExtras.includes('weaponMastery')} onChange={(e) => setPowerLevelingExtras(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(item => item !== e.target.value))} />
                                            <span className="ml-2 text-lg">Add 1 Weapon Mastery (20 lvl) <span className="text-gray-400 ml-2">+$7.00</span></span>
                                        </label>
                                        <label className="inline-flex items-center text-gray-300 cursor-pointer">
                                            <input type="checkbox" name="powerLevelingExtra" value="specificWeapons" className="form-checkbox text-indigo-500" checked={powerLevelingExtras.includes('specificWeapons')} onChange={(e) => setPowerLevelingExtras(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(item => item !== e.target.value))} />
                                            <span className="ml-2 text-lg">Use only 2 specific weapons during the boost <span className="text-gray-400 ml-2">Free</span></span>
                                        </label>
                                        <label className="inline-flex items-center text-gray-300 cursor-pointer">
                                            <input type="checkbox" name="powerLevelingExtra" value="specificCovenant" className="form-checkbox text-indigo-500" checked={powerLevelingExtras.includes('specificCovenant')} onChange={(e) => setPowerLevelingExtras(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(item => item !== e.target.value))} />
                                            <span className="ml-2 text-lg">I need to join a Specific Covenant <span className="text-gray-400 ml-2">Free</span></span>
                                        </label>
                                    </div>
                                </div>

                                {/* Service Type Display for Power Leveling (Piloted Only) */}
                                <div className="text-left mt-6 mb-6">
                                    <label className="block text-gray-300 text-lg font-semibold mb-3">Service Type:</label>
                                    <span className="text-indigo-400 text-lg">Piloted</span>
                                </div>
                            </div>
                            {/* Level Range and Price Display - Moved above the button */}
                            <p id="selectedLevelRangeDisplay" className="text-indigo-400 text-xl font-bold mt-4 mb-4 text-center">
                                Level {currentLevel} to {desiredLevel}: Price: ${powerLevelingPrice}
                            </p>
                            {/* Button placed below the price/service type */}
                            <button
                                id="powerLevelingCheckoutButton"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md w-full transition duration-300"
                                onClick={() => goToFakeCheckout('powerLeveling')}
                            >
                                Continue to Payment
                            </button>
                        </div>

                        {/* New World Artifacts */}
                        <div className="offer-card">
                            <h2 className="text-3xl font-bold text-white mb-4">New World Artifacts</h2>
                            <p className="text-gray-300 mb-6">Select your desired artifact and boosting options.</p>

                            <div className="space-y-6 mb-6">
                                {/* Select Artifact Dropdown */}
                                <div className="text-left">
                                    <label htmlFor="artifactSelect" className="block text-gray-300 text-lg font-semibold mb-3">Select Artifact:</label>
                                    <select id="artifactSelect" className="bg-gray-700 text-gray-200 rounded-md py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" value={selectedArtifact} onChange={(e) => setSelectedArtifact(e.target.value)}>
                                        <option value="">Select an Artifact</option>
                                        {Object.keys(ARTIFACT_PRICES).map(artifact => (
                                            <option key={artifact} value={artifact}>{artifact}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Boost Option Radio Buttons */}
                                <div className="text-left mt-6">
                                    <label className="block text-gray-300 text-lg font-semibold mb-3">Boost Option:</label>
                                    <div className="flex flex-col gap-2">
                                        <label className="inline-flex items-center text-gray-300 cursor-pointer">
                                            <input type="radio" name="artifactBoostOption" value="questCompletion" className="form-radio text-indigo-500" checked={artifactBoostOption === 'questCompletion'} onChange={(e) => setArtifactBoostOption(e.target.value)} />
                                            <span className="ml-2 text-lg">Artifact Quests Completion <span className="text-gray-400 ml-2">+$13.00</span></span>
                                        </label>
                                        <label className="inline-flex items-center text-gray-300 cursor-pointer">
                                            <input type="radio" name="artifactBoostOption" value="fullUpgrade" className="form-radio text-indigo-500" checked={artifactBoostOption === 'fullUpgrade'} onChange={(e) => setArtifactBoostOption(e.target.value)} />
                                            <span className="ml-2 text-lg">Full Artifact Upgrade <span className="text-gray-400 ml-2">+$119.00</span></span>
                                        </label>
                                    </div>
                                </div>

                                {/* Select Completion Speed Radio Buttons */}
                                <div className="text-left mt-6">
                                    <label className="block text-gray-300 text-lg font-semibold mb-3">Select Completion Speed:</label>
                                    <div className="flex flex-col gap-2">
                                        <label className="inline-flex items-center text-gray-300 cursor-pointer">
                                            <input type="radio" name="completionSpeed" value="express" className="form-radio text-indigo-500" checked={completionSpeed === 'express'} onChange={(e) => setCompletionSpeed(e.target.value)} />
                                            <span className="ml-2 text-lg">Express <span className="text-gray-400 ml-2">+$2.80</span></span>
                                        </label>
                                        <label className="inline-flex items-center text-gray-300 cursor-pointer">
                                            <input type="radio" name="completionSpeed" value="superExpress" className="form-radio text-indigo-500" checked={completionSpeed === 'superExpress'} onChange={(e) => setCompletionSpeed(e.target.value)} />
                                            <span className="ml-2 text-lg">Super Express <span className="text-gray-400 ml-2">+$5.60</span></span>
                                        </label>
                                    </div>
                                </div>

                                {/* Choose Your Platform Dropdown (ONLY PC for Artifacts) */}
                                <div className="text-left mt-6">
                                    <label htmlFor="artifactPlatformSelect" className="block text-gray-300 text-lg font-semibold mb-3">Choose Your Platform:</label>
                                    <select id="artifactPlatformSelect" className="bg-gray-700 text-gray-200 rounded-md py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" value={artifactPlatform} onChange={(e) => setArtifactPlatform(e.target.value)}>
                                        <option value="PC">PC</option>
                                    </select>
                                </div>

                                {/* Service Type Display (Piloted Only) */}
                                <div className="text-left mt-6 mb-6">
                                    <label className="block text-gray-300 text-lg font-semibold mb-3">Service Type:</label>
                                    <span className="text-indigo-400 text-lg">Piloted</span>
                                </div>
                            </div>

                            {/* Total Price and Button */}
                            <div className="flex flex-col items-center mb-6">
                                <span className="price mb-4" id="artifactTotalPrice">${artifactTotalPrice}</span>
                                <button
                                    id="artifactCheckoutButton"
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md w-full transition duration-300"
                                    onClick={() => goToFakeCheckout('artifacts')}
                                >
                                    Continue to Payment
                                </button>
                            </div>
                        </div>

                        {/* Gorgon Raid Completion */}
                        <div className="offer-card">
                            <h2 className="text-3xl font-bold text-white mb-4">Gorgon Raid Completion</h2>
                            <p className="text-gray-300 mb-6">Complete Gorgon raid with full loot and rewards.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300 mb-6">
                                <p><i className="fas fa-check-circle text-green-500 mr-2"></i>Full raid completion</p>
                                <p><i className="fas fa-check-circle text-green-500 mr-2"></i>All loot included</p>
                                <p><i className="fas fa-check-circle text-green-500 mr-2"></i>Professional team</p>
                                <p><i className="fas fa-check-circle text-green-500 mr-2"></i>Guaranteed completion</p>
                            </div>

                            {/* Choose Number of Bosses for Gorgon Raid */}
                            <div className="text-left mt-6">
                                <label className="block text-gray-300 text-lg font-semibold mb-3">Choose Number of Bosses:</label>
                                <div className="flex flex-col gap-2">
                                    <label className="inline-flex items-center text-gray-300 cursor-pointer">
                                        <input type="radio" name="gorgonBosses" value="1" className="form-radio text-indigo-500" checked={gorgonBosses === '1'} onChange={(e) => setGorgonBosses(e.target.value)} />
                                        <span className="ml-2 text-lg">1/3 <span className="text-gray-400 ml-2">+$15.00</span></span>
                                    </label>
                                    <label className="inline-flex items-center text-gray-300 cursor-pointer">
                                        <input type="radio" name="gorgonBosses" value="2" className="form-radio text-indigo-500" checked={gorgonBosses === '2'} onChange={(e) => setGorgonBosses(e.target.value)} />
                                        <span className="ml-2 text-lg">2/3 <span className="text-gray-400 ml-2">+$30.00</span></span>
                                    </label>
                                    <label className="inline-flex items-center text-gray-300 cursor-pointer">
                                        <input type="radio" name="gorgonBosses" value="3" className="form-radio text-indigo-500" checked={gorgonBosses === '3'} onChange={(e) => setGorgonBosses(e.target.value)} />
                                        <span className="ml-2 text-lg">3/3 <span className="text-gray-400 ml-2">+$40.00</span></span>
                                    </label>
                                </div>
                            </div>

                            {/* Service Type Display for Gorgon Raid (Piloted Only) */}
                            <div className="text-left mt-6 mb-6">
                                <label className="block text-gray-300 text-lg font-semibold mb-3">Service Type:</label>
                                <span className="text-indigo-400 text-lg">Piloted</span>
                            </div>

                            {/* Price and button stacked */}
                            <div className="flex flex-col items-center mb-6">
                                <span className="price mb-4" id="gorgonPrice">${gorgonPrice}</span>
                                <button
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md w-full transition duration-300"
                                    onClick={() => goToFakeCheckout('gorgonRaid')}
                                >
                                    Continue to Payment
                                </button>
                            </div>
                        </div>

                        {/* Expedition Runs */}
                        <div className="offer-card">
                            <h2 className="text-3xl font-bold text-white mb-4">Expedition Runs</h2>
                            <p className="text-gray-300 mb-6">Professional expedition runs for gear and experience.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300 mb-6">
                                <p><i className="fas fa-check-circle text-green-500 mr-2"></i>Multiple expeditions</p>
                                <p><i className="fas fa-check-circle text-green-500 mr-2"></i>Gear farming</p>
                                <p><i className="fas fa-check-circle text-green-500 mr-2"></i>Experience boost</p>
                                <p><i className="fas fa-check-circle text-green-500 mr-2"></i>Fast completion</p>
                            </div>

                            {/* Number of Runs Slider (Custom) */}
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-300 text-lg font-semibold">Number of Runs:</span>
                                <span id="numRunsDisplay" className="text-indigo-400 text-xl font-bold">{selectedRuns}</span>
                            </div>
                            <div className="range-slider-container" ref={expeditionRunsContainerRef} onClick={handleExpeditionTrackClick}>
                                <div className="range-slider-fill" ref={expeditionRunsFillRef}></div>
                                <div className="slider-thumb" ref={expeditionRunsThumbRef} onMouseDown={onMouseDownRuns} onTouchStart={onTouchStartRuns}></div>
                            </div>
                            
                            {/* Choose Any Dungeon Dropdown */}
                            <div className="text-left mt-6">
                                <label htmlFor="dungeonSelect" className="block text-gray-300 text-lg font-semibold mb-3">Choose Any Dungeon:</label>
                                <select id="dungeonSelect" className="bg-gray-700 text-gray-200 rounded-md py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" value={selectedDungeon} onChange={(e) => setSelectedDungeon(e.target.value)}>
                                    <option value="">Select a Dungeon</option>
                                    {Object.keys(DUNGEON_PRICES).map(dungeon => (
                                        <option key={dungeon} value={dungeon}>{dungeon}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Choose Mutation Level Dropdown */}
                            <div className="text-left mt-6">
                                <label htmlFor="mutationLevelSelect" className="block text-gray-300 text-lg font-semibold mb-3">Choose Mutation Level:</label>
                                <select id="mutationLevelSelect" className="bg-gray-700 text-gray-200 rounded-md py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" value={selectedMutationLevel} onChange={(e) => setSelectedMutationLevel(e.target.value)}>
                                    <option value="">Select Mutation Level (Optional)</option>
                                    {Object.keys(MUTATION_LEVEL_PRICES).map(level => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Service Type Display for Expedition Runs (Piloted Only) */}
                            <div className="text-left mt-6 mb-6">
                                <label className="block text-gray-300 text-lg font-semibold mb-3">Service Type:</label>
                                <span className="text-indigo-400 text-lg">Piloted</span>
                            </div>
                            {/* Price and button stacked */}
                            <div className="flex flex-col items-center mb-6">
                                <p id="expeditionPriceDisplay" className="text-indigo-400 text-xl font-bold mt-4 mb-4 text-center">
                                    {selectedRuns} Run{selectedRuns > 1 ? 's' : ''}: Price: ${expeditionPrice}
                                </p>
                                <button
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md w-full transition duration-300"
                                    onClick={() => goToFakeCheckout('expeditionRuns')}
                                >
                                    Continue to Payment
                                </button>
                            </div>
                        </div>

                        {/* Elite Chest Runs */}
                        <div className="offer-card">
                            <h2 className="text-3xl font-bold text-white mb-4">Elite Chest Runs</h2>
                            <p className="text-gray-300 mb-6">Daily elite chest farming routes.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300 mb-6">
                                <p><i className="fas fa-check-circle text-green-500 mr-2"></i>All elite areas</p>
                                <p><i className="fas fa-check-circle text-green-500 mr-2"></i>Maximum efficiency</p>
                                <p><i className="fas fa-check-circle text-green-500 mr-2"></i>Valuable loot</p>
                                <p><i className="fas fa-check-circle text-green-500 mr-2"></i>Daily completion</p>
                            </div>

                            {/* Choose Number of Days for Elite Chest Runs */}
                            <div className="text-left mt-6">
                                <label className="block text-gray-300 text-lg font-semibold mb-3">Choose Number of Days:</label>
                                <div className="flex flex-col gap-2">
                                    <label className="inline-flex items-center text-gray-300 cursor-pointer">
                                        <input type="radio" name="eliteChestDays" value="1" className="form-radio text-indigo-500" checked={eliteChestDays === '1'} onChange={(e) => setEliteChestDays(e.target.value)} />
                                        <span className="ml-2 text-lg">1 Day <span className="text-gray-400 ml-2">($10.00)</span></span>
                                    </label>
                                    <label className="inline-flex items-center text-gray-300 cursor-pointer">
                                        <input type="radio" name="eliteChestDays" value="2" className="form-radio text-indigo-500" checked={eliteChestDays === '2'} onChange={(e) => setEliteChestDays(e.target.value)} />
                                        <span className="ml-2 text-lg">2 Days <span className="text-gray-400 ml-2">($15.00)</span></span>
                                    </label>
                                </div>
                            </div>

                            {/* Service Type Display for Elite Chest Runs (Piloted Only) */}
                            <div className="text-left mt-6 mb-6">
                                <label className="block text-gray-300 text-lg font-semibold mb-3">Service Type:</label>
                                <span className="text-indigo-400 text-lg">Piloted</span>
                            </div>

                            {/* Price and button stacked */}
                            <div className="flex flex-col items-center mb-6">
                                <span className="price mb-4" id="eliteChestPrice">${eliteChestPrice}</span>
                                <button
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md w-full transition duration-300"
                                    onClick={() => goToFakeCheckout('eliteChestRuns')}
                                >
                                    Continue to Payment
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Call to Action Section (Footer for this page) */}
            <section className="bg-indigo-700 text-white py-12 text-center mx-auto max-w-7xl mt-12 rounded-xl shadow-xl">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-4">Ready to boost your New World adventure?</h2>
                    <p className="text-xl mb-8">Join our Discord server to purchase any offer or request a custom service!</p>
                    <button
                        className="btn-primary inline-block bg-white text-indigo-700 hover:bg-gray-200 text-xl py-3 px-8"
                        onClick={() => goToFakeCheckout('callToAction')}
                    >
                        Continue to Payment <i className="fas fa-arrow-right ml-2"></i>
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 py-10 text-gray-400 text-sm">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4">Gearscore</h3>
                        <p>Your gateway to professional gaming boosting services. We aim to provide the best experience for gamers.</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
                        <ul>
                            <li className="mb-2"><a href="index.html" className="hover:text-white">Home</a></li>
                            <li className="mb-2"><a href="games.html" className="hover:text-white">Games</a></li>
                            <li className="mb-2"><a href="index.html#services" className="hover:text-white">Services</a></li>
                            <li className="mb-2"><a href="index.html#how-it-works" className="hover:text-white">How It Works</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4">Support</h3>
                        <ul>
                            <li className="mb-2"><a href="faq.html" className="hover:text-white">FAQ</a></li>
                            <li className="mb-2"><a href="contact_us_new_design.html" className="hover:text-white">Contact Us</a></li>
                            <li className="mb-2"><a href="#" className="hover:text-white">Privacy Policy</a></li>
                            <li className="mb-2"><a href="#" className="hover:text-white">Terms of Service</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4">Follow Us</h3>
                        <div className="flex space-x-4 text-2xl">
                            <a href="#" className="hover:text-white"><i className="fab fa-facebook"></i></a>
                            <a href="#" className="hover:text-white"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="hover:text-white"><i className="fab fa-instagram"></i></a>
                            <a href="#" className="hover:text-white"><i className="fab fa-discord"></i></a>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-10 border-t border-gray-700 pt-8">
                    <p>&copy; 2024 Gearscore. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default App;