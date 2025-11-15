import Header from './components/Header'
import Footer from './components/Footer'
import { useState } from 'react' 
import { LOCATIONS } from './Components/locations.js'



function App() {
  const [points, setPoints] = useState('')
  const [weeks, setWeeks] = useState('')
  const[showPlan, setShowPlan] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')

  const calculatePlan = () => {
    setShowPlan(true);
  }

  const pointsNum = Number(points);
  const weeksNum = Number(weeks);
  const weeklyBudget = weeksNum > 0 ? Math.floor(pointsNum / weeksNum) : 0;
  const dailyBudget = weeksNum > 0 ? Math.floor(weeklyBudget / 7) : 0;
  const budgetPerMeal = mealsPerWeek > 0 ? Math.floor(weeklyBudget / mealsPerWeek) : 0;

  const affordableLocations = LOCATIONS.map(loc => ({
    ...loc,
    timesPerWeek: Math.floor(weeklyBudget / loc.avgCost),
    canAfford: loc.avgCost <= dailyBudget
  })).sort((a, b) => a.avgCost - b.avgCost);

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return (
          <div style = {{ padding: '40px', textAlign: 'center' }}> 
          <h1 style = {{fontSize: '3rem', color: '#522D80' }}>Welcome to TigerBudget! </h1>
          <p style  = {{fontSize: '1.5rem', color: '#666', marginTop: '20px'}}>
            Have fun managing your paw points and making the most of your budget!
            </p>
            </div>
        );
        case 'planner':
          return(
            <div style = {{padding: '20px', maxWidth: '800px', margin: '0 auto'}}>
              <h2 style = {{color: '#522D80' }} > Paw Points Budget Planner</h2>

              <div style = {{marginTop: '20px' }}>
                <label style ={{display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Current Paw Point Balance
                </label>
                <input
                  type="number"
                  value={points}
                  onChange={(e) => setPoints(e.target.value)}
                  placeholder="Enter your Paw Points"
                  style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '16px',
                    border: '2px solid #ddd',
                    borderRadius: '4px',
                    marginBottom: '20px'
                  }}
        />
                <label style={{display: 'block', marginBottom: '8px', fontWeight: '600'}}>
                  Number of weeks left in the semester
                </label>
                <input
                  type="number"
                  value={weeks}
                  onChange={(e) => setWeeks(e.target.value)}
                  placeholder="Enter the number of weeks left in the semester"
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '16px',
                    border: '2px solid #ddd',
                    borderRadius: '4px',
                    marginBottom: '20px'
                  }}
        />
        <label style={{display: 'block', marginBottom: '8px', fontWeight: '600'}}>
                  How many times per week do you want to eat out?
                </label>
                <input
                  type="number"
                  value={mealsPerWeek}
                  onChange={(e) => setMealsPerWeek(e.target.value)}
                  placeholder="Enter the number of times per week you want to eat out"
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '16px',
                    border: '2px solid #ddd',
                    borderRadius: '4px',
                    marginBottom: '20px'
                  }}
        />
                <button
                  onClick={calculatePlan}
                  style={{
                    width: '100%',
                    padding: '14px',
                    fontSize: '18px',
                    fontWeight: '600',
                    background: '#F56600',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Calculate Plan
                </button>
              </div>
              {showPlan && points && weeks && (
                <div style = {{marginTop: '30px'}}>
                  <div style ={{
                    background: '#F56600',
                    color: 'white',
                    padding: '20px',
                    borderRadius: '4px',
                    marginBottom: '20px'
                  }}>
                    <h3> Budget Breakdown</h3>
                    <p> Total points: ${pointsNum} </p>
                    <p> Per Week: ${weeklyBudget} </p>
                    <p> Per Day: ${dailyBudget} </p>
                  </div>
                  <h3 style = {{color: '#522D80'}}>Where you can eat</h3>
                  {affordableLocations.map((loc, index) => {
                    const canAffordThisWeek = loc.timesPerWeek >= 1;
                    return (
                      <div
                        key={index}
                        style={{
                          padding: '15px',
                          marginBottom: '10px',
                          borderRadius: '8px',
                          border: `2px solid ${loc.canAfford ? '#34D399' : '#FCA5A5'}`,
                          background: loc.canAfford ? '#F0FDF4' : '#FEF2F2'
                        }}
                      >
                        <div>
                          <strong>{loc.canAfford ? 'Affordable' : 'Too Expensive'} </strong>
                          <p> {loc.type} • ${loc.avgCost} avg</p>
                          <p> {loc.timesPerWeek}x per week </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        case 'gamble':
          return(
            <div style = {{padding: '20px', textAlign: 'center'}}>
              <h2 style = {{color: '#522D80'}}>Gamble your points away here!</h2>
              <p style = {{color: '666' , marginTop: '20px'}}>
                Will clemson beat Furman?
                <button
                  onClick={() => setCurrentPage('gamble-result')}
                  style={{
                    padding: '20px 50px',
                    fontSize: '18px',
                    fontWeight: '600',
                    background: 'black',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.2s'
                  }}
                  onMouseOver = {(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut = {(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    YES!!!
                  </button>
                  <button
                    onClick={() => setCurrentPage('gamble-result')}
                    style={{
                      padding: '20px 50px',
                      fontSize: '18px',
                      fontWeight: '700',
                      background: 'black',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      transition: 'transform 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    NO!!!
                  </button>
              </p>
              </div>
          );
        
        case 'gamble-result':
          return(
            <div style={{ padding: '40px', textAlign: 'center', maxWidth: '600px', margin: '0 auto'}}>
              <h2 style={{color: 'red', fontSize: '2.5rem', marginBottom: '30px'}}>
              WRONG!!!!!
              <br/>
              NEVER GAMBLE!!!
              <br/>
              we transfered your paw points to a random location for you to eat at instead.
              </h2>

              
              <button
                onClick={() => setCurrentPage('second-gamble-result')}
                  style={{
                      padding: '20px 50px',
                      fontSize: '18px',
                      fontWeight: '700',
                      background: 'black',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      transition: 'transform 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1.00)'}
                  >
                  however... would you like to go again?
                  </button>
                  </div>
          );
          case 'second-gamble-result':
            return(
              <div style={{ padding: '40px', textAlign: 'center', maxWidth: '600px', margin: '0 auto'}}>
              <h2 style={{color: 'red', fontSize: '2.5rem', marginBottom: '30px'}}>
              WRONG AGAIN!!!!
              <br/>
              NEVER GAMBLE!!!!
              <br/>
              Why would you do it again?!?

              </h2>
              </div>
            );
        default:
          return <div> Page not found </div>;
      }
    };
             
    return(
      <div>
        <Header currentPage = {currentPage} setPage = {setCurrentPage} />
        {renderPage()}
      </div>
    )  
    
}
export default App
