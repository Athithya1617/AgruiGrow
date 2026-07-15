import { useState } from 'react';
import { MapPin, Search, Phone, Navigation, X, Star } from 'lucide-react';
import './LocalServices.css';

const LocalServices = () => {
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');
  const [selectedService, setSelectedService] = useState(null);

  // Static Local services directory database
  const servicesList = [
    { id: 1, name: 'Punjab Central Soil Testing Lab', category: 'Labs', rating: 4.8, distance: '3.2 km', phone: '+91 181-220033', location: 'GT Road, Jalandhar', coords: '31.3260° N, 75.5762° E', desc: 'Authorized testing center for checking macronutrients (N, P, K), organic carbon percentage, and soil pH.' },
    { id: 2, name: 'Eco-Grow Seed & Organic Fertilizer Co.', category: 'Distributors', rating: 4.5, distance: '4.8 km', phone: '+91 181-245889', location: 'Grain Market, Amritsar', coords: '31.6340° N, 74.8723° E', desc: 'Supplier of premium high-yield hybrid seed varieties (wheat, basmati) and biological soil composting inoculants.' },
    { id: 3, name: 'GreenField Machinery & Tractor Rental', category: 'Equipment', rating: 4.6, distance: '6.5 km', phone: '+91 181-987234', location: 'By-Pass Road, Ludhiana', coords: '30.9010° N, 75.8573° E', desc: 'Cooperative hub renting out laser land levelers, disc harrows, combine harvesters, and spray drones at subsidized hourly rates.' },
    { id: 4, name: 'Cold-Guard Agri Cold Storage Inc.', category: 'Cold Storage', rating: 4.7, distance: '8.1 km', phone: '+91 181-554488', location: 'Industrial Focal Point, Ludhiana', coords: '30.9122° N, 75.8450° E', desc: 'Climate-controlled warehouse storage chambers catering to potato, tomato, and fruit harvests to reduce post-harvest losses.' }
  ];

  const filteredServices = servicesList.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                          item.location.toLowerCase().includes(search.toLowerCase()) ||
                          item.desc.toLowerCase().includes(search.toLowerCase());
    const matchesCat = catFilter === 'All' || item.category === catFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="container main-content services-page animate-fade-in">
      <header className="page-header mb-6">
        <h1 className="page-title"><MapPin size={32} /> Local Farming Services</h1>
        <p className="page-subtitle">Locate soil diagnostics laboratories, seed distributors, farm equipment hire hubs, and cold storage warehouses near you.</p>
      </header>

      {/* Filters & Search Row */}
      <section className="card filter-bar-card mb-6">
        <div className="filter-search-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search service name, facilities, or cities..." 
            className="input search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-pills justify-center mt-2">
          {['All', 'Labs', 'Distributors', 'Equipment', 'Cold Storage'].map((cat) => (
            <button 
              key={cat} 
              className={`pill-btn ${catFilter === cat ? 'active' : ''}`}
              onClick={() => setCatFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Services Listing Grid */}
      <section className="grid-2 mb-6">
        {filteredServices.map((service) => (
          <div className="card service-item-card" key={service.id}>
            <div className="service-header justify-between d-flex mb-2">
              <span className="badge badge-success">{service.category}</span>
              <span className="service-dist font-semibold text-xs text-muted d-flex align-items-center gap-1">
                <Navigation size={12} /> {service.distance}
              </span>
            </div>

            <h3 className="service-name font-semibold">{service.name}</h3>
            
            <div className="service-rating d-flex align-items-center gap-1 text-orange my-2">
              <Star size={14} className="star-icon" />
              <span className="rating-val font-semibold text-sm">{service.rating}</span>
            </div>

            <p className="service-desc-brief text-sm text-muted mb-4">{service.desc}</p>
            <p className="service-loc text-xs text-muted mb-4">📍 Location: {service.location}</p>

            <div className="service-actions d-flex gap-2">
              <a href={`tel:${service.phone}`} className="btn btn-secondary flex-1">
                <Phone size={14} /> Call Helpline
              </a>
              <button 
                className="btn btn-primary flex-1"
                onClick={() => setSelectedService(service)}
              >
                View Map Location
              </button>
            </div>
          </div>
        ))}
      </section>

      {filteredServices.length === 0 && (
        <div className="card text-center py-6">
          <p className="text-muted">No agricultural services match your filters.</p>
        </div>
      )}

      {/* Map simulation Modal */}
      {selectedService && (
        <div className="modal-overlay" onClick={() => setSelectedService(null)}>
          <div className="modal-content card animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedService(null)}>
              <X size={20} />
            </button>

            <div className="modal-header mb-4">
              <span className="badge badge-success mb-2">{selectedService.category}</span>
              <h2 className="modal-title">{selectedService.name}</h2>
              <p className="text-muted text-sm mt-1">{selectedService.location}</p>
            </div>

            <div className="modal-body">
              {/* Map Canvas Box */}
              <div className="mock-map-canvas mb-6">
                <div className="mock-map-marker">
                  <span className="marker-pin">📍</span>
                  <span className="marker-label font-semibold">{selectedService.name}</span>
                </div>
                <div className="map-compass-hud text-xs text-muted">
                  Coords: {selectedService.coords} | Direction: NW
                </div>
              </div>

              <div className="map-guidelines-box">
                <h4 className="guidelines-title text-green mb-2">Facility Details</h4>
                <p className="guidelines-text text-sm">{selectedService.desc}</p>
                <div className="guidelines-meta d-flex justify-between mt-4 pt-2 border-top-dashed text-xs text-muted">
                  <span>Helpline: <strong>{selectedService.phone}</strong></span>
                  <span>Dist: <strong>{selectedService.distance}</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocalServices;
