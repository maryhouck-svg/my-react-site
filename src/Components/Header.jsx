import React from 'react'

const NAV_ITEMS = [
  {id: 'home', name: 'Home'},
  {id: 'planner', name: 'Planner'},
  {id: 'gamble', name: 'Gamble'}
];

const Header = ({currentPage, setPage}) => {
  const getIconUrl = (id) => {
    switch (id) {
      case 'home':
        return "/Home.svg";
      case 'planner':
        return "/Calculator.svg";
      case 'gamble':
        return "/MoneyBag.svg";
      default:
        return null;
    }
  }

const logoUrl = "/LogoTiger.svg";

  return (
    <nav className = "bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => setPage('home')}>
            <img
              src={logoUrl}
              alt = "Tiger BudgetLogo"
              className = "w-6 h-6 mr-6 rounded-full"
              width = "1000"
              height = "1000"
            />
          </div>

          <div className="flex space-x-4">
            {NAV_ITEMS.map((item) => {
              const iconSrc = getIconUrl(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => setPage(item.id)}
                  className={`px-3 py-2 rounded-md text font-medium transition duration-150 flex items-center ${
                    currentPage === item.id
                      ? 'bg-purple-100 text-purple-700 border-b-2 border-purple-700'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-purple-600'
                  }`}
                >
                  {iconSrc && ( 
                    <img 
                      src={iconSrc}
                      alt={item.name}
                      className='inline mr-1 w-4 h-4'
                      width = "30"
                      height = "30"
                    /> 
                  )}
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}


export default Header