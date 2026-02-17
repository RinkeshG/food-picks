import React, { useState, useMemo } from 'react';

const foodSpots = [
  {
    id: '1',
    name: 'Vidyarthi Bhavan',
    vibe: 'Legendary chaos',
    area: 'Basavanagudi',
    cuisine: 'south-indian',
    what: 'Masala Dosa',
    note: 'Go at 7am or suffer. The dosa has this insane crispy edge that haunts your dreams. Skip weekends unless you enjoy standing in the sun questioning life choices.',
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=600&h=400&fit=crop',
    isFavorite: true,
    isDateSpot: true,
  },
  {
    id: '2',
    name: 'CTR Shri Sagar',
    vibe: 'Butter paradise',
    area: 'Malleshwaram',
    cuisine: 'south-indian',
    what: 'Benne Dosa',
    note: 'The amount of butter they use should be illegal. Your diet can wait. Your arteries can handle it. Probably. Maybe.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&h=400&fit=crop',
    isDateSpot: true,
  },
  {
    id: '3',
    name: 'Truffles',
    vibe: 'Sweet tooth enabler',
    area: 'St. Marks Road',
    cuisine: 'cafe',
    what: 'Chocolate Truffle Cake',
    note: 'The OG location. Been coming here since college. The cake is dense, rich, and fixes most emotional problems temporarily.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=400&fit=crop',
    isDateSpot: true,
    isFavorite: true,
  },
  {
    id: '4',
    name: 'Meghana Foods',
    vibe: 'Biryani therapy',
    area: 'Koramangala',
    cuisine: 'biryani',
    what: 'Andhra Biryani',
    note: 'When you need aggressive flavor and regret nothing. The spice level is "are you sure?" and the answer is always yes.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&h=400&fit=crop',
  },
  {
    id: '5',
    name: "Brahmin's Coffee Bar",
    vibe: 'No-frills perfect',
    area: 'Shankarapuram',
    cuisine: 'south-indian',
    what: 'Idli Vada + Filter Coffee',
    note: 'Standing and eating off steel plates. No AC. No pretense. Just perfect idlis with the most aggressive chutney. This is Bangalore.',
    image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=600&h=400&fit=crop',
    isFavorite: true,
  },
  {
    id: '6',
    name: 'Third Wave Coffee',
    vibe: 'WFH headquarters',
    area: 'Indiranagar',
    cuisine: 'cafe',
    what: 'Hazelnut Latte',
    note: 'My backup office. Good WiFi, better coffee, acceptable number of other laptop humans. The hazelnut latte is my emotional support beverage.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop',
  },
  {
    id: '7',
    name: 'Hole in the Wall',
    vibe: 'Brunch cult',
    area: 'Koramangala',
    cuisine: 'cafe',
    what: 'Eggs Benedict',
    note: 'Worth the wait. The hollandaise is *correct*. Perfect for pretending you have your life together on Sunday mornings.',
    image: 'https://images.unsplash.com/photo-1608039829572-9b5e13ef54fc?w=600&h=400&fit=crop',
    isDateSpot: true,
  },
  {
    id: '8',
    name: 'Airlines Hotel',
    vibe: 'Old Bangalore energy',
    area: 'Lavelle Road',
    cuisine: 'south-indian',
    what: 'Unlimited Thali',
    note: "Your parents definitely ate here. Unlimited thali that keeps coming whether you want it or not. The bitter gourd is weirdly good here??",
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop',
    isFavorite: true,
  },
  {
    id: '9',
    name: 'Nagarjuna',
    vibe: 'Hand-eating mandatory',
    area: 'Residency Road',
    cuisine: 'biryani',
    what: 'Andhra Meals',
    note: "They don't give you spoons for a reason. The rasam is healing, the pickle is dangerous, and you will need buttermilk.",
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop',
    isFavorite: true,
  },
  {
    id: '10',
    name: 'Toit',
    vibe: 'Beer & pizza energy',
    area: 'Indiranagar',
    cuisine: 'drinks',
    what: 'Tintin Toit + Pizza',
    note: "Bangalore's brewery OG. The Tintin Toit (wheat beer) with their margherita is the move. Gets loud after 8pm — plan accordingly.",
    image: 'https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?w=600&h=400&fit=crop',
    isDateSpot: true,
  },
  {
    id: '11',
    name: "Koshy's",
    vibe: 'Heritage vibes only',
    area: 'St. Marks Road',
    cuisine: 'cafe',
    what: 'Mutton Cutlet + Beer',
    note: "Been here since 1940. Politicians, artists, your nana — everyone's been here. The mutton cutlet hasn't changed and shouldn't.",
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop',
    isFavorite: true,
    isDateSpot: true,
  },
  {
    id: '12',
    name: 'Veena Stores',
    vibe: 'Morning chaos',
    area: 'Malleshwaram',
    cuisine: 'south-indian',
    what: 'Khara Bath + Kesari Bath',
    note: 'The combo plate at 8am on a Sunday is a spiritual experience. Cash only. Queue always. No regrets ever.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&h=400&fit=crop',
  },
];

const cuisineFilters = [
  { id: 'all', label: 'All spots', emoji: '🍽️' },
  { id: 'south-indian', label: 'South Indian', emoji: '🥘' },
  { id: 'biryani', label: 'Biryani & Andhra', emoji: '🍚' },
  { id: 'cafe', label: 'Cafes & Brunch', emoji: '☕' },
  { id: 'drinks', label: 'Drinks', emoji: '🍺' },
];

export default function App() {
  const [activeCuisine, setActiveCuisine] = useState('all');
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [hoveredStamp, setHoveredStamp] = useState(null);

  const filteredSpots = useMemo(() => {
    if (activeCuisine === 'all') return foodSpots;
    return foodSpots.filter(s => s.cuisine === activeCuisine);
  }, [activeCuisine]);

  const favCount = foodSpots.filter(s => s.isFavorite).length;
  const dateSpotCount = foodSpots.filter(s => s.isDateSpot).length;

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FFFBF5',
      fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400&family=Caveat:wght@500;600&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        body { background: #FFFBF5; }
        
        ::selection { background: #FFE0B2; }
        
        html { -webkit-text-size-adjust: 100%; }
        
        .card {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
        }
        @media (hover: hover) {
          .card:hover {
            transform: translateY(-8px) rotate(-0.5deg);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
          }
          .card:hover .card-img {
            transform: scale(1.1);
          }
        }
        
        .card-img {
          transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .float { animation: float 3s ease-in-out infinite; }
        
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { 
          opacity: 0;
          animation: fadeUp 0.5s ease-out forwards; 
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }
        
        .handwritten {
          font-family: 'Caveat', cursive;
        }
        
        .serif {
          font-family: 'Fraunces', Georgia, serif;
        }
        
        .stamp {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border: 2px solid currentColor;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          background: #FFFBF5;
          cursor: default;
          position: relative;
        }
        @media (min-width: 540px) {
          .stamp {
            padding: 6px 14px;
            font-size: 12px;
          }
        }
        
        .filter-btn {
          padding: 8px 14px;
          border-radius: 100px;
          border: none;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          font-family: inherit;
        }
        @media (min-width: 540px) {
          .filter-btn {
            padding: 10px 16px;
            font-size: 14px;
          }
        }
        @media (hover: hover) {
          .filter-btn:hover {
            transform: translateY(-2px);
          }
        }
        .filter-btn:active {
          transform: scale(0.97);
        }
        
        .badge {
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-radius: 50px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        @media (min-width: 540px) {
          .badge {
            width: 40px;
            height: 40px;
            font-size: 16px;
          }
        }
        @media (hover: hover) {
          .badge:hover {
            transform: scale(1.1);
          }
        }
        
        .badge-date {
          background: rgba(219, 39, 119, 0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        
        .grid {
          display: grid;
          gap: 16px;
          grid-template-columns: 1fr;
        }
        @media (min-width: 480px) {
          .grid { 
            grid-template-columns: repeat(2, 1fr); 
            gap: 20px;
          }
        }
        @media (min-width: 900px) {
          .grid { 
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
          }
        }
        
        .container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 16px;
        }
        @media (min-width: 540px) {
          .container { padding: 0 24px; }
        }
        @media (min-width: 900px) {
          .container { padding: 0 40px; }
        }
        
        .filter-scroll {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 4px;
          margin-left: -16px;
          margin-right: -16px;
          padding-left: 16px;
          padding-right: 16px;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        @media (min-width: 540px) {
          .filter-scroll {
            margin-left: 0;
            margin-right: 0;
            padding-left: 0;
            padding-right: 0;
          }
        }
        .filter-scroll::-webkit-scrollbar {
          display: none;
        }
        
        .img-container {
          height: 180px;
          position: relative;
          background: linear-gradient(135deg, #FEF3C7 0%, #FED7AA 100%);
          border-radius: 16px 16px 0 0;
          overflow: hidden;
        }
        @media (min-width: 540px) {
          .img-container {
            height: 200px;
          }
        }
        @media (min-width: 900px) {
          .img-container {
            height: 180px;
          }
        }
        
        /* Mobile touch for tooltips */
        @media (hover: none) {
          .stamp {
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
          }
        }
      `}</style>

      {/* Header */}
      <header className="container" style={{ paddingTop: 40, paddingBottom: 24 }}>
        <div className="fade-up" style={{ marginBottom: 20, animationDelay: '0.05s' }}>
          <h1 className="serif" style={{
            fontSize: 'clamp(28px, 7vw, 52px)',
            fontWeight: 600,
            color: '#1C1917',
            lineHeight: 1.15,
            marginBottom: 6,
          }}>
            Places I'd take you
            <span className="float" style={{ 
              display: 'inline-block', 
              marginLeft: 10,
              fontSize: '0.65em',
            }}>🍜</span>
          </h1>
          <p className="handwritten" style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            color: '#78716C',
          }}>
            if we were grabbing food in Bangalore
          </p>
        </div>

        {/* Personal intro */}
        <div className="fade-up" style={{ 
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          marginBottom: 28,
          animationDelay: '0.08s',
        }}>
          <div style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1C1917 0%, #57534E 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFBF5',
            fontSize: 20,
            fontWeight: 600,
            flexShrink: 0,
          }}>
            R
          </div>
          <div>
            <p style={{
              fontSize: 15,
              fontWeight: 600,
              color: '#1C1917',
              marginBottom: 2,
            }}>
              Rinkesh
            </p>
            <p style={{
              fontSize: 13,
              color: '#78716C',
              lineHeight: 1.4,
            }}>
              Building things, eating everywhere.<br/>
              Based in Bangalore with my cat Simba.
            </p>
          </div>
        </div>

        {/* Stats with hover easter eggs */}
        <div className="fade-up" style={{ 
          display: 'flex', 
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          gap: 10,
          marginBottom: hoveredStamp ? 8 : 24,
          animationDelay: '0.1s',
          transition: 'margin-bottom 0.2s ease',
        }}>
          {/* Spots count */}
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <span 
              className="stamp" 
              style={{ color: '#B45309', cursor: 'pointer' }}
              onMouseEnter={() => setHoveredStamp('spots')}
              onMouseLeave={() => setHoveredStamp(null)}
            >
              <span>📍</span> {foodSpots.length} spots
            </span>
            {hoveredStamp === 'spots' && (
              <p 
                className="handwritten fade-in"
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 6px)',
                  left: 0,
                  fontSize: 20,
                  color: '#B45309',
                  whiteSpace: 'nowrap',
                  zIndex: 10,
                }}
              >
                and counting... always hungry 🤤
              </p>
            )}
          </div>

          {/* Must-try count */}
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <span 
              className="stamp" 
              style={{ color: '#DC2626', cursor: 'pointer' }}
              onMouseEnter={() => setHoveredStamp('fav')}
              onMouseLeave={() => setHoveredStamp(null)}
            >
              <span>⭐</span> {favCount} must-try
            </span>
            {hoveredStamp === 'fav' && (
              <p 
                className="handwritten fade-in"
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 6px)',
                  left: 0,
                  fontSize: 20,
                  color: '#DC2626',
                  whiteSpace: 'nowrap',
                  zIndex: 10,
                }}
              >
                the ones I'd fight for ⚔️
              </p>
            )}
          </div>
          
          {/* Date spot stamp */}
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <span 
              className="stamp" 
              style={{ color: '#DB2777', cursor: 'pointer' }}
              onMouseEnter={() => setHoveredStamp('date')}
              onMouseLeave={() => setHoveredStamp(null)}
            >
              <span>💕</span> {dateSpotCount} date-tested
            </span>
            {hoveredStamp === 'date' && (
              <p 
                className="handwritten fade-in"
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 6px)',
                  left: 0,
                  fontSize: 20,
                  color: '#DB2777',
                  whiteSpace: 'nowrap',
                  zIndex: 10,
                }}
              >
                momo & burrito approved 💕
              </p>
            )}
          </div>
        </div>

        {/* Spacer that only appears on hover */}
        <div style={{ 
          height: hoveredStamp ? 32 : 0, 
          transition: 'height 0.2s ease',
        }} />

        {/* Intro */}
        <div className="fade-up" style={{ 
          maxWidth: 540, 
          animationDelay: '0.15s',
        }}>
          <p style={{
            fontSize: 'clamp(14px, 3.5vw, 16px)',
            lineHeight: 1.7,
            color: '#57534E',
          }}>
            Not a "best of" list. Not sponsored. Just places I actually go back to, 
            with honest notes about what to order.
          </p>
          <p style={{
            fontSize: 'clamp(12px, 3vw, 14px)',
            color: '#A8A29E',
            marginTop: 8,
          }}>
            Mostly South Bangalore because that's where I live and traffic is real.
          </p>
        </div>
      </header>

      {/* Filters */}
      <section className="container fade-up" style={{ 
        marginBottom: 24,
        animationDelay: '0.2s',
      }}>
        <div className="filter-scroll">
          {cuisineFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveCuisine(filter.id)}
              className="filter-btn"
              style={{
                backgroundColor: activeCuisine === filter.id ? '#1C1917' : '#fff',
                color: activeCuisine === filter.id ? '#FFFBF5' : '#1C1917',
                boxShadow: activeCuisine === filter.id 
                  ? 'none' 
                  : '0 2px 8px rgba(0,0,0,0.06)',
              }}
            >
              <span style={{ marginRight: 5 }}>{filter.emoji}</span>
              {filter.label}
            </button>
          ))}
        </div>
        
        <p style={{
          marginTop: 12,
          fontSize: 'clamp(12px, 3vw, 14px)',
          color: '#A8A29E',
        }}>
          {filteredSpots.length} {filteredSpots.length === 1 ? 'spot' : 'spots'}
          {activeCuisine !== 'all' && ' found'}
        </p>
      </section>

      {/* Grid */}
      <section className="container" style={{ paddingBottom: 48 }}>
        <div className="grid">
          {filteredSpots.map((spot, index) => (
            <article
              key={spot.id}
              className="card fade-up"
              style={{
                backgroundColor: '#fff',
                borderRadius: 16,
                boxShadow: '0 4px 20px -4px rgba(0,0,0,0.08)',
                animationDelay: `${0.15 + index * 0.06}s`,
                overflow: 'visible',
              }}
            >
              {/* Image container */}
              <div className="img-container">
                <img
                  src={spot.image}
                  alt={spot.name}
                  className="card-img"
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
              
              {/* Badges - positioned outside img-container for overflow */}
              <div style={{
                position: 'absolute',
                top: 12,
                right: 12,
                display: 'flex',
                gap: 8,
                zIndex: 20,
              }}>
                {spot.isFavorite && (
                  <div style={{ position: 'relative' }}>
                    <div 
                      className="badge"
                      onMouseEnter={() => setActiveTooltip(`fav-${spot.id}`)}
                      onMouseLeave={() => setActiveTooltip(null)}
                      onTouchStart={() => {
                        setActiveTooltip(`fav-${spot.id}`);
                        setTimeout(() => setActiveTooltip(null), 2000);
                      }}
                    >
                      ⭐
                    </div>
                    {activeTooltip === `fav-${spot.id}` && (
                      <p 
                        className="handwritten fade-in"
                        style={{
                          position: 'absolute',
                          top: 'calc(100% + 8px)',
                          right: 0,
                          fontSize: 'clamp(15px, 4vw, 18px)',
                          color: '#DC2626',
                          whiteSpace: 'nowrap',
                          zIndex: 100,
                          background: '#FFFBF5',
                          padding: '5px 10px',
                          borderRadius: 8,
                          border: '2px dashed #FCA5A5',
                          transform: 'rotate(-1deg)',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        }}
                      >
                        one of my favorites!
                      </p>
                    )}
                  </div>
                )}
                
                {spot.isDateSpot && (
                  <div style={{ position: 'relative' }}>
                    <div 
                      className="badge badge-date"
                      onMouseEnter={() => setActiveTooltip(`date-${spot.id}`)}
                      onMouseLeave={() => setActiveTooltip(null)}
                      onTouchStart={() => {
                        setActiveTooltip(`date-${spot.id}`);
                        setTimeout(() => setActiveTooltip(null), 2000);
                      }}
                    >
                      💕
                    </div>
                    {activeTooltip === `date-${spot.id}` && (
                      <p 
                        className="handwritten fade-in"
                        style={{
                          position: 'absolute',
                          top: 'calc(100% + 8px)',
                          right: 0,
                          fontSize: 'clamp(15px, 4vw, 18px)',
                          color: '#DB2777',
                          whiteSpace: 'nowrap',
                          zIndex: 100,
                          background: '#FDF2F8',
                          padding: '5px 10px',
                          borderRadius: 8,
                          border: '2px dashed #F9A8D4',
                          transform: 'rotate(1deg)',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        }}
                      >
                        momo + burrito approved 💕
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div style={{ padding: '16px' }}>
                <div style={{ marginBottom: 6 }}>
                  <h3 className="serif" style={{
                    fontSize: 'clamp(17px, 4vw, 19px)',
                    fontWeight: 600,
                    color: '#1C1917',
                    marginBottom: 3,
                  }}>
                    {spot.name}
                  </h3>
                  <p style={{
                    fontSize: 'clamp(12px, 3vw, 13px)',
                    color: '#78716C',
                  }}>
                    {spot.area}
                  </p>
                </div>

                <div style={{
                  display: 'inline-block',
                  background: '#FEF3C7',
                  padding: '3px 8px',
                  borderRadius: 6,
                  fontSize: 'clamp(10px, 2.5vw, 12px)',
                  fontWeight: 600,
                  color: '#92400E',
                  marginBottom: 10,
                }}>
                  Order: {spot.what}
                </div>

                <p className="handwritten" style={{
                  fontSize: 'clamp(18px, 4.5vw, 20px)',
                  color: '#EA580C',
                  marginBottom: 8,
                }}>
                  "{spot.vibe}"
                </p>

                <p style={{
                  fontSize: 'clamp(13px, 3vw, 14px)',
                  lineHeight: 1.6,
                  color: '#57534E',
                }}>
                  {spot.note}
                </p>
              </div>
            </article>
          ))}
        </div>

        {filteredSpots.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
          }}>
            <p className="handwritten" style={{
              fontSize: 24,
              color: '#A8A29E',
            }}>
              nothing here yet... check back soon!
            </p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '2px dashed #E7E5E4',
        padding: '32px 0',
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="handwritten" style={{
            fontSize: 'clamp(18px, 5vw, 22px)',
            color: '#78716C',
            marginBottom: 10,
          }}>
            Got a spot I should try?
          </p>
          <p style={{ fontSize: 'clamp(12px, 3vw, 14px)', color: '#A8A29E' }}>
            DM me on{' '}
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ 
              color: '#1C1917', 
              textDecoration: 'underline',
              textUnderlineOffset: 3,
            }}>
              Twitter
            </a>
          </p>
          
          <p style={{
            marginTop: 24,
            fontSize: 11,
            color: '#D6D3D1',
          }}>
            last updated after a food coma
          </p>
        </div>
      </footer>
    </div>
  );
}
