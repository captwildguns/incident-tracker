import { useState, useRef, useEffect } from 'react';
import { ForgeCard } from '@tylertech/forge-react';
import { defineCardComponent } from '@tylertech/forge';
defineCardComponent();
import { Navigation, MapPin, Search, X, Check, ZoomIn, ZoomOut, Compass } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '../ui/command';

interface LocationCoordinates {
  lat: number;
  lng: number;
}

interface IncidentLocationMapProps {
  location: LocationCoordinates | null;
  onLocationChange: (location: LocationCoordinates | null) => void;
  address: string;
  onAddressChange: (address: string) => void;
  showManualEntry?: boolean;
}

const mockAddresses = [
  { id: '1', fullAddress: '1234 Main Street, Meridian, ID 83642, USA', lat: 43.6136, lng: -116.3915 },
  { id: '2', fullAddress: '5678 Elm Avenue, Meridian, ID 83646, USA', lat: 43.6350, lng: -116.3960 },
  { id: '3', fullAddress: '910 Oak Drive, Boise, ID 83704, USA', lat: 43.6187, lng: -116.2146 },
  { id: '4', fullAddress: '2345 Maple Lane, Eagle, ID 83616, USA', lat: 43.6957, lng: -116.3535 },
  { id: '5', fullAddress: '3456 Pine Road, Nampa, ID 83651, USA', lat: 43.5407, lng: -116.5635 },
  { id: '6', fullAddress: '4567 Cedar Court, Kuna, ID 83634, USA', lat: 43.4963, lng: -116.4205 },
  { id: '7', fullAddress: '7890 Birch Boulevard, Star, ID 83669, USA', lat: 43.6938, lng: -116.4882 },
  { id: '8', fullAddress: '6789 Willow Way, Caldwell, ID 83605, USA', lat: 43.6629, lng: -116.6874 },
  { id: '9', fullAddress: '8901 Aspen Street, Garden City, ID 83714, USA', lat: 43.6449, lng: -116.2476 },
  { id: '10', fullAddress: '1230 Spruce Avenue, Meridian, ID 83642, USA', lat: 43.6099, lng: -116.3919 },
];

// Converts lat/lng + zoom to OpenStreetMap tile URL for a static preview
function buildMapUrl(lat: number, lng: number, zoom: number) {
  return `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.02},${lat - 0.012},${lng + 0.02},${lat + 0.012}&layer=mapnik&marker=${lat},${lng}`;
}

export function IncidentLocationMap({
  location, onLocationChange, address, onAddressChange,
}: IncidentLocationMapProps) {
  const defaultCenter = { lat: 42.7563541, lng: -73.8253949 };
  const [zoom, setZoom] = useState(15);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [mode, setMode] = useState<'idle' | 'select' | 'search'>('idle');
  const [searchInput, setSearchInput] = useState(address || '');
  const [searchOpen, setSearchOpen] = useState(false);
  const [geolocationAvailable, setGeolocationAvailable] = useState(true);
  const searchRef = useRef<HTMLDivElement>(null);

  const mapCenter = location || defaultCenter;

  useEffect(() => {
    if (!navigator.geolocation) setGeolocationAvailable(false);
  }, []);

  useEffect(() => {
    setSearchInput(address || '');
  }, [address]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleUseCurrentLocation = () => {
    if (!geolocationAvailable) return;
    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onLocationChange({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        onAddressChange(`${pos.coords.latitude.toFixed(6)}, ${pos.coords.longitude.toFixed(6)}`);
        setSearchInput(`${pos.coords.latitude.toFixed(6)}, ${pos.coords.longitude.toFixed(6)}`);
        setIsGettingLocation(false);
        setMode('idle');
      },
      () => { setIsGettingLocation(false); setGeolocationAvailable(false); },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSelectAddress = (addr: typeof mockAddresses[0]) => {
    onLocationChange({ lat: addr.lat, lng: addr.lng });
    onAddressChange(addr.fullAddress);
    setSearchInput(addr.fullAddress);
    setSearchOpen(false);
    setMode('idle');
  };

  const handleSearchSubmit = () => {
    const match = mockAddresses.find(a =>
      a.fullAddress.toLowerCase().includes(searchInput.toLowerCase())
    );
    if (match) handleSelectAddress(match);
  };

  const filteredAddresses = mockAddresses.filter(a =>
    a.fullAddress.toLowerCase().includes(searchInput.toLowerCase())
  );

  const btnStyle = (active?: boolean): React.CSSProperties => ({
    display: 'inline-flex', alignItems: 'center', gap: '6px',
    padding: '6px 14px', height: '34px',
    background: active ? '#EEF2F8' : '#fff',
    color: '#4A6FA5',
    border: `1px solid ${active ? '#4A6FA5' : '#C5D2E8'}`,
    borderRadius: '4px',
    fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: active ? 500 : 400,
    cursor: 'pointer',
  });

  return (
    <ForgeCard style={{ border: 'none', boxShadow: 'none', marginBottom: 'var(--forge-spacing-large)' }}>
      <div style={{ padding: 'var(--forge-spacing-medium)' }}>
        <h3 style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-lg)', fontWeight: 500, marginBottom: 4 }}>
          Incident Location Pin
        </h3>
        <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 'var(--text-sm)', color: 'var(--forge-theme-text-medium)', marginBottom: 'var(--forge-spacing-small)' }}>
          Set the incident location using your current location or by selecting on the map
        </p>

        {/* Map */}
        <div style={{ position: 'relative', width: '100%', height: '320px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #C5D2E8', marginBottom: '12px' }}>
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0, display: 'block' }}
            src={buildMapUrl(mapCenter.lat, mapCenter.lng, zoom)}
            title="Incident Location Map"
            loading="lazy"
          />

          {/* Zoom controls */}
          <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', flexDirection: 'column', gap: 2, zIndex: 10 }}>
            {[
              { icon: <ZoomIn className="h-4 w-4" />, onClick: () => setZoom(z => Math.min(z + 1, 19)) },
              { icon: <ZoomOut className="h-4 w-4" />, onClick: () => setZoom(z => Math.max(z - 1, 5)) },
              { icon: <Compass className="h-4 w-4" />, onClick: () => {} },
            ].map((btn, i) => (
              <button key={i} type="button" onClick={btn.onClick} style={{ width: 30, height: 30, background: '#fff', border: '1px solid #C5D2E8', borderRadius: 4, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4A6FA5' }}>
                {btn.icon}
              </button>
            ))}
          </div>

          {/* Confirmed overlay */}
          {location && (
            <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', background: '#4A6FA5', color: '#fff', padding: '3px 10px', borderRadius: 4, fontFamily: 'Roboto, sans-serif', fontSize: '12px', display: 'flex', alignItems: 'center', gap: 4, zIndex: 10, pointerEvents: 'none' }}>
              <Check className="h-3 w-3" /> Location Pinned
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
          <button type="button" style={btnStyle(isGettingLocation)} onClick={handleUseCurrentLocation} disabled={!geolocationAvailable}>
            <Navigation className="h-4 w-4" />
            {isGettingLocation ? 'Getting Location...' : 'Use Current Location'}
          </button>
          <button type="button" style={btnStyle(mode === 'select')} onClick={() => setMode(m => m === 'select' ? 'idle' : 'select')}>
            <MapPin className="h-4 w-4" />
            Select Location on Map
          </button>
          <button type="button" style={btnStyle(mode === 'search')} onClick={() => setMode(m => m === 'search' ? 'idle' : 'search')}>
            <Search className="h-4 w-4" />
            Search by Address
          </button>
        </div>

        {/* Select on map instruction */}
        {mode === 'select' && (
          <div style={{ padding: '10px 14px', background: '#EEF2F8', border: '1px solid #C5D2E8', borderRadius: 4, fontFamily: 'Roboto, sans-serif', fontSize: '13px', color: '#4A6FA5', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>Click anywhere on the map above to drop a pin at that location.</span>
            <button type="button" onClick={() => setMode('idle')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4A6FA5', padding: 0 }}>
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Search by address */}
        {mode === 'search' && (
          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px', color: 'var(--forge-theme-text-medium)', marginBottom: 4 }}>Address</div>
            <div className="relative" ref={searchRef}>
              {/* @ts-ignore */}
              <forge-text-field>
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => { setSearchInput(e.target.value); onAddressChange(e.target.value); setSearchOpen(true); }}
                  onFocus={() => setSearchOpen(true)}
                  placeholder="e.g. 11 Cornell Road, Latham, New York 12110"
                  style={{ fontFamily: 'Roboto, sans-serif', width: '100%' }}
                />
              </forge-text-field>
              {searchOpen && searchInput && filteredAddresses.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-[220px] overflow-auto" style={{ borderColor: '#C5D2E8' }}>
                  <Command>
                    <CommandList>
                      <CommandEmpty style={{ fontFamily: 'Roboto, sans-serif' }}>No addresses found.</CommandEmpty>
                      <CommandGroup>
                        {filteredAddresses.map(a => (
                          <CommandItem key={a.id} value={a.fullAddress} onSelect={() => handleSelectAddress(a)} style={{ fontFamily: 'Roboto, sans-serif', cursor: 'pointer' }}>
                            <MapPin className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <span style={{ fontSize: 'var(--text-sm)' }}>{a.fullAddress}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </div>
              )}
            </div>
            <div style={{ marginTop: '8px' }}>
              <button type="button" style={btnStyle()} onClick={handleSearchSubmit}>
                <Search className="h-4 w-4" />
                Search by Address
              </button>
            </div>
          </div>
        )}

        {/* Pinned address display */}
        {location && address && mode === 'idle' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: '#EEF2F8', border: '1px solid #C5D2E8', borderRadius: 4 }}>
            <MapPin className="h-4 w-4 flex-shrink-0" style={{ color: '#4A6FA5' }} />
            <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: '13px', flex: 1 }}>{address}</span>
            <button type="button" onClick={() => { onLocationChange(null); onAddressChange(''); setSearchInput(''); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9BAEC8', padding: 0 }}>
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </ForgeCard>
  );
}
