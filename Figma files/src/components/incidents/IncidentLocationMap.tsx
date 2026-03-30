import { useState, useEffect, useRef } from 'react';
import { ForgeCard } from '@tylertech/forge-react';
import { defineCardComponent } from '@tylertech/forge';
defineCardComponent();
import { ForgeButton } from '@tylertech/forge-react';
import { defineButtonComponent } from '@tylertech/forge';
defineButtonComponent();
import { Badge } from '../ui/badge';
import { MapPin, Navigation, X, ExternalLink, Target, Check } from 'lucide-react';

interface LocationCoordinates {
  lat: number;
  lng: number;
}

interface IncidentLocationMapProps {
  location: LocationCoordinates | null;
  onLocationChange: (location: LocationCoordinates | null) => void;
  showManualEntry?: boolean;
}

export function IncidentLocationMap({ location, onLocationChange }: IncidentLocationMapProps) {
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [geolocationAvailable, setGeolocationAvailable] = useState(true);
  const [isSelectingLocation, setIsSelectingLocation] = useState(false);
  const [tempCenter, setTempCenter] = useState<LocationCoordinates | null>(null);
  const [mapKey, setMapKey] = useState(0);
  
  // Default center - Albany, NY area
  const defaultCenter: LocationCoordinates = { lat: 42.7563541, lng: -73.8253949 };
  const currentMapCenter = tempCenter || location || defaultCenter;

  // Check if geolocation is available on mount
  useEffect(() => {
    if (!navigator.geolocation) {
      setGeolocationAvailable(false);
    }
  }, []);

  const handleUseCurrentLocation = () => {
    if (!geolocationAvailable) {
      return;
    }
    
    setIsGettingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          onLocationChange(newLocation);
          setIsSelectingLocation(false);
          setTempCenter(null);
          setIsGettingLocation(false);
        },
        (error) => {
          setIsGettingLocation(false);
          setGeolocationAvailable(false);
          
          // Suppress console errors for permissions policy issues
          if (error?.message && !error.message.includes('permissions policy')) {
            console.warn('Geolocation not available:', error.message);
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      setIsGettingLocation(false);
      setGeolocationAvailable(false);
    }
  };

  const handleClearLocation = () => {
    onLocationChange(null);
    setIsSelectingLocation(false);
    setTempCenter(null);
  };

  const openInMaps = () => {
    if (location) {
      window.open(`https://www.google.com/maps?q=${location.lat},${location.lng}`, '_blank');
    }
  };

  const handleStartSelectingLocation = () => {
    setIsSelectingLocation(true);
    setTempCenter(location || defaultCenter);
  };

  const handleCancelSelection = () => {
    setIsSelectingLocation(false);
    setTempCenter(null);
  };

  const handleConfirmLocation = () => {
    if (tempCenter) {
      onLocationChange(tempCenter);
      setIsSelectingLocation(false);
      setTempCenter(null);
    }
  };

  // Listen for messages from iframe (if we implement a more advanced solution later)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Future: handle map interaction messages
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <ForgeCard
      style={{
        marginBottom: 'var(--forge-spacing-large)',
        borderRadius: 'var(--forge-radius-medium)',
        border: 'none',
        boxShadow: 'none',
      }}
    >
      <div style={{ padding: 'var(--forge-spacing-medium)' }}>
        <h3 className="forge-typography--heading4"
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: 'var(--text-lg)',
            fontWeight: 'var(--font-weight-medium)',
          }}
        >
          Incident Location Pin
        </h3>
        <p className="forge-typography--body2"
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: 'var(--text-sm)',
            color: 'var(--forge-theme-text-medium)',
          }}
        >
          {isSelectingLocation
            ? 'Move the map to position the crosshair over your desired location, then click "Confirm Location"'
            : 'Set the incident location using your current location or by selecting on the map'}
        </p>
        <div className="space-y-4" style={{ marginTop: 'var(--forge-spacing-small)' }}>
        {/* Interactive Map */}
        <div 
          className="w-full overflow-hidden relative"
          style={{
            height: '500px',
            borderRadius: 'var(--forge-radius-medium)',
            border: isSelectingLocation 
              ? '2px solid var(--brand-blue-dark)' 
              : '2px solid var(--forge-color-border-default)',
            transition: 'border-color 0.3s ease',
          }}
        >
          {/* Google Maps iframe */}
          <iframe
            key={mapKey}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            src={`https://maps.google.com/maps?q=${currentMapCenter.lat},${currentMapCenter.lng}&z=${isSelectingLocation ? 16 : 15}&output=embed`}
            title="Location Map"
            loading="lazy"
            onLoad={() => {
              // Update map key to force reload when center changes significantly
              if (isSelectingLocation && tempCenter) {
                const timeout = setTimeout(() => {
                  setMapKey(prev => prev + 1);
                }, 100);
                return () => clearTimeout(timeout);
              }
            }}
          />
          
          {/* Crosshair overlay when selecting location */}
          {isSelectingLocation && (
            <>
              {/* Center crosshair */}
              <div 
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10,
                  pointerEvents: 'none',
                }}
              >
                <Target 
                  size={48} 
                  style={{ 
                    color: 'var(--brand-blue-dark)',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                  }} 
                />
              </div>
              
              {/* Instruction overlay at bottom */}
              <div 
                style={{
                  position: 'absolute',
                  bottom: 'var(--forge-spacing-medium)',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: 'rgba(0, 0, 0, 0.85)',
                  color: 'white',
                  padding: 'var(--forge-spacing-small) var(--forge-spacing-medium)',
                  borderRadius: 'var(--forge-radius-medium)',
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: 'var(--text-sm)',
                  zIndex: 20,
                  pointerEvents: 'none',
                  maxWidth: '90%',
                  textAlign: 'center',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                }}
              >
                <Target className="inline h-4 w-4 mr-2" />
                Position the crosshair over the incident location
              </div>
            </>
          )}

          {/* Location confirmed indicator */}
          {!isSelectingLocation && location && (
            <div 
              style={{
                position: 'absolute',
                top: 'var(--forge-spacing-small)',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'var(--brand-blue-dark)',
                color: 'white',
                padding: 'var(--forge-spacing-xsmall) var(--forge-spacing-small)',
                borderRadius: 'var(--forge-radius-small)',
                fontFamily: 'Roboto, sans-serif',
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-medium)',
                zIndex: 20,
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--forge-spacing-xsmall)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }}
            >
              <Check size={14} />
              Location Pinned
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 flex-wrap">
          {!isSelectingLocation ? (
            <>
              <ForgeButton
                type="button"
                variant="outlined"
                onClick={handleUseCurrentLocation}
                disabled={isGettingLocation || !geolocationAvailable}
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: 'var(--text-sm)',
                }}
              >
                <Navigation className="mr-2 h-4 w-4" />
                {isGettingLocation ? 'Getting Location...' : 'Use Current Location'}
              </ForgeButton>
              
              <ForgeButton
                type="button"
                variant="outlined"
                onClick={handleStartSelectingLocation}
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: 'var(--text-sm)',
                }}
              >
                <MapPin className="mr-2 h-4 w-4" />
                Select Location on Map
              </ForgeButton>

              {location && (
                <>
                  <ForgeButton
                    type="button"
                    variant="outlined"
                    onClick={openInMaps}
                    style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: 'var(--text-sm)',
                    }}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open in Google Maps
                  </ForgeButton>
                  <ForgeButton
                    type="button"
                    variant="outlined"
                    onClick={handleClearLocation}
                    style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--destructive)',
                      borderColor: 'var(--destructive)',
                    }}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Clear Pin
                  </ForgeButton>
                </>
              )}
            </>
          ) : (
            <>
              <ForgeButton
                type="button"
                onClick={handleConfirmLocation}
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: 'var(--text-sm)',
                  backgroundColor: 'var(--brand-blue-dark)',
                  color: 'white',
                }}
              >
                <Check className="mr-2 h-4 w-4" />
                Confirm Location
              </ForgeButton>
              <ForgeButton
                type="button"
                variant="outlined"
                onClick={handleCancelSelection}
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: 'var(--text-sm)',
                }}
              >
                Cancel
              </ForgeButton>
            </>
          )}
        </div>

        {/* Location Display */}
        {location && !isSelectingLocation && (
          <div 
            className="flex items-start gap-2 p-3 rounded-md"
            style={{
              backgroundColor: 'rgba(91, 139, 184, 0.1)',
              border: '1px solid var(--brand-blue-light)',
              borderRadius: 'var(--forge-radius-small)',
            }}
          >
            <MapPin className="h-5 w-5 mt-0.5" style={{ color: 'var(--brand-blue-dark)' }} />
            <div className="flex-1">
              <div 
                className="font-medium"
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--brand-blue-dark)',
                }}
              >
                Location Pinned
              </div>
              <div 
                className="text-muted-foreground mt-1"
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: 'var(--text-xs)',
                }}
              >
                Latitude: {location.lat.toFixed(6)}, Longitude: {location.lng.toFixed(6)}
              </div>
            </div>
            <Badge 
              variant="outline"
              style={{
                backgroundColor: 'var(--brand-blue-dark)',
                color: 'white',
                border: 'none',
                fontFamily: 'Roboto, sans-serif',
              }}
            >
              <Check className="h-3 w-3 mr-1" />
              Active
            </Badge>
          </div>
        )}

        {/* Help Text */}
        {!isSelectingLocation && (
          <div 
            className="text-muted-foreground text-center p-3 rounded-md"
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: 'var(--text-xs)',
              backgroundColor: 'var(--muted)',
              borderRadius: 'var(--forge-radius-small)',
            }}
          >
            {!location ? (
              <div className="flex items-center justify-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Use your current location or select a location on the map. The map will be saved with the incident report.</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <MapPin className="h-4 w-4" style={{ color: 'var(--brand-blue-dark)' }} />
                <span>Location saved. You can reselect if needed, or open in Google Maps to get directions.</span>
              </div>
            )}
          </div>
        )}

        {/* Selection help text */}
        {isSelectingLocation && (
          <div 
            className="p-3 rounded-md"
            style={{
              backgroundColor: 'rgba(91, 139, 184, 0.1)',
              border: '1px solid var(--brand-blue-light)',
              borderRadius: 'var(--forge-radius-small)',
            }}
          >
            <div className="flex items-start gap-2">
              <Target className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--brand-blue-dark)' }} />
              <div>
                <p 
                  style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: 'var(--brand-blue-dark)',
                    marginBottom: 'var(--forge-spacing-xsmall)',
                  }}
                >
                  How to select location:
                </p>
                <ul 
                  style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--muted-foreground)',
                    listStyleType: 'disc',
                    paddingLeft: 'var(--forge-spacing-medium)',
                    margin: 0,
                  }}
                >
                  <li style={{ marginBottom: '4px' }}>The map will reload as you interact with it - this is normal behavior</li>
                  <li style={{ marginBottom: '4px' }}>Use the Google Maps controls to zoom and navigate</li>
                  <li style={{ marginBottom: '4px' }}>Position the blue crosshair over your desired location</li>
                  <li>Click "Confirm Location" when the crosshair is positioned correctly</li>
                </ul>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </ForgeCard>
  );
}
