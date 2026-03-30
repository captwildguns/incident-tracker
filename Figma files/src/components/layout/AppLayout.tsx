import { ReactNode, useState, useRef, useEffect } from 'react';
import { Menu, Search, HelpCircle, Home, AlertCircle, Users, UserCircle, Bus, MessageSquare, FileText, GitBranch, Shield } from 'lucide-react';
import {
  defineScaffoldComponent,
  defineAppBarComponent,
  defineModalDrawerComponent,
  defineIconComponent,
  defineListComponent,
  defineListItemComponent,
  defineDividerComponent,
  IconRegistry,
} from '@tylertech/forge';
import {
  tylIconHome,
  tylIconWarning,
  tylIconPeople,
  tylIconPerson,
  tylIconDirectionsBus,
  tylIconChat,
  tylIconDescription,
  tylIconAccountTree,
  tylIconSecurity,
  tylIconHelpOutline,
  tylIconExitToApp,
  tylIconFeedback,
} from '@tylertech/tyler-icons';
import { NotificationsDropdown } from './NotificationsDropdown';

// Define Forge custom elements (one-time registration)
defineScaffoldComponent();
defineAppBarComponent();
defineModalDrawerComponent();
defineIconComponent();
defineListComponent();
defineListItemComponent();
defineDividerComponent();

// Register Tyler icons
IconRegistry.define([
  tylIconHome, tylIconWarning, tylIconPeople, tylIconPerson,
  tylIconDirectionsBus, tylIconChat, tylIconDescription,
  tylIconAccountTree, tylIconSecurity, tylIconHelpOutline,
  tylIconExitToApp, tylIconFeedback,
]);

interface AppLayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  onNavigateToCommunication?: (incidentId: string, incidentData?: any) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, forgeIcon: 'home' },
  { id: 'incidents', label: 'Incidents', icon: AlertCircle, forgeIcon: 'warning' },
  { id: 'students', label: 'Students', icon: Users, forgeIcon: 'people' },
  { id: 'drivers', label: 'Drivers', icon: UserCircle, forgeIcon: 'person' },
  { id: 'vehicles', label: 'Vehicles', icon: Bus, forgeIcon: 'directions_bus' },
  { id: 'communications', label: 'Communications', icon: MessageSquare, forgeIcon: 'chat' },
  { id: 'reports', label: 'Reports', icon: FileText, forgeIcon: 'description' },
  { id: 'workflows', label: 'Workflows', icon: GitBranch, forgeIcon: 'account_tree' },
  { id: 'admin', label: 'Admin', icon: Shield, forgeIcon: 'security' },
];

export function AppLayout({ children, currentPage, onNavigate, onNavigateToCommunication }: AppLayoutProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLElement>(null);

  // Listen for drawer dismiss (clicking backdrop / pressing Escape)
  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) return;
    const handler = () => setIsDrawerOpen(false);
    drawer.addEventListener('forge-modal-drawer-close', handler);
    drawer.addEventListener('forge-drawer-after-close', handler);
    return () => {
      drawer.removeEventListener('forge-modal-drawer-close', handler);
      drawer.removeEventListener('forge-drawer-after-close', handler);
    };
  }, []);

  // Sync drawer open state — set both property and attribute for reliability
  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) return;
    if (isDrawerOpen) {
      drawer.setAttribute('open', '');
      (drawer as any).open = true;
    } else {
      drawer.removeAttribute('open');
      (drawer as any).open = false;
    }
  }, [isDrawerOpen]);

  return (
    <>
    {/* Modal Drawer for Navigation — outside scaffold so overlay renders on top */}
    <forge-modal-drawer ref={drawerRef}>
      <aside style={{
        width: '280px', height: '100%', display: 'flex', flexDirection: 'column',
        backgroundColor: 'var(--forge-theme-surface)', color: 'var(--forge-theme-text-high)',
      }}>
        {/* Profile Section */}
        <div style={{
          padding: 'var(--forge-spacing-medium) var(--forge-spacing-large)',
          borderBottom: '1px solid var(--forge-theme-outline)',
          backgroundColor: 'var(--forge-theme-primary)',
          color: 'white',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--forge-spacing-small)' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              backgroundColor: 'var(--brand-olive-dark)', display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: 'white', fontSize: '14px',
              fontWeight: 500, flexShrink: 0,
            }}>
              SW
            </div>
            <div>
              <div className="forge-typography--body1" style={{ fontWeight: 500, color: 'white', fontSize: '14px' }}>Sarah Williams</div>
              <div className="forge-typography--label1" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>Safety Coordinator</div>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: 'var(--forge-spacing-xsmall) 0' }}>
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); setIsDrawerOpen(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px', width: '100%',
                  padding: '10px 20px',
                  background: isActive ? 'var(--forge-theme-primary-container)' : 'none',
                  border: 'none', cursor: 'pointer',
                  color: isActive ? 'var(--forge-theme-primary)' : 'var(--forge-theme-text-high)',
                  fontFamily: 'Roboto, sans-serif', fontSize: '14px',
                  fontWeight: isActive ? 500 : 400,
                  borderLeft: isActive ? '3px solid var(--forge-theme-primary)' : '3px solid transparent',
                }}
              >
                <Icon size={20} style={{ opacity: isActive ? 1 : 0.6, flexShrink: 0 }} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div style={{ borderTop: '1px solid var(--forge-theme-outline)', padding: 'var(--forge-spacing-xsmall) 0' }}>
          <button
            onClick={() => { onNavigate('help'); setIsDrawerOpen(false); }}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px', width: '100%',
              padding: '10px 20px', background: 'none', border: 'none',
              cursor: 'pointer', color: 'var(--forge-theme-text-medium)',
              fontFamily: 'Roboto, sans-serif', fontSize: '14px',
            }}
          >
            <HelpCircle size={20} style={{ opacity: 0.6 }} />
            <span>Help</span>
          </button>
          <button
            style={{
              display: 'flex', alignItems: 'center', gap: '12px', width: '100%',
              padding: '10px 20px', background: 'none', border: 'none',
              cursor: 'pointer', color: 'var(--forge-theme-text-medium)',
              fontFamily: 'Roboto, sans-serif', fontSize: '14px',
            }}
          >
            <forge-icon name="exit_to_app" style={{ fontSize: '20px', opacity: 0.6 }}></forge-icon>
            <span>Logout</span>
          </button>
        </div>

        <div className="forge-typography--label1" style={{
          color: 'var(--forge-theme-text-low)',
          padding: 'var(--forge-spacing-small) var(--forge-spacing-large)',
          textAlign: 'center',
          borderTop: '1px solid var(--forge-theme-outline)',
        }}>
          &copy; 2025 Tyler Technologies Inc. v1.2.0
        </div>
      </aside>
    </forge-modal-drawer>

    <forge-scaffold>
      {/* Context Bar */}
      <div slot="header">
        <div
          className="forge-typography--label1"
          style={{
            backgroundColor: 'var(--forge-theme-surface-container-high)',
            color: 'var(--forge-theme-text-medium)',
            padding: 'var(--forge-spacing-xxsmall) var(--forge-spacing-large)',
            fontSize: '12px',
            borderBottom: '1px solid var(--forge-theme-outline)',
          }}
        >
          <span style={{ fontWeight: 500 }}>2024-25 School Year</span>
        </div>

        {/* App Bar */}
        <forge-app-bar>
          <button slot="start" type="button" aria-label="Menu"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', color: 'white',
              display: 'flex', alignItems: 'center', padding: '8px',
            }}
          >
            <Menu size={24} />
          </button>

          <div slot="start" style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }} onClick={() => onNavigate('dashboard')}>
            <span className="forge-typography--label1" style={{ color: 'var(--forge-theme-text-medium-inverse)', lineHeight: 1.2 }}>
              Student Transportation - <em style={{ fontWeight: 400 }}>powered by Traversa</em>
            </span>
            <span className="forge-typography--heading4" style={{ color: 'var(--forge-theme-text-high-inverse)', lineHeight: 1.3 }}>
              Incident Tracker
            </span>
          </div>

          <div slot="center" style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              display: 'flex', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.15)',
              borderRadius: 'var(--forge-shape-full)', padding: '4px 16px', minWidth: '280px',
            }}>
              <Search size={16} style={{ color: 'rgba(255,255,255,0.7)', marginRight: '8px' }} />
              <input type="text" placeholder="Search..."
                style={{
                  background: 'none', border: 'none', outline: 'none', color: 'white',
                  fontSize: '14px', fontFamily: 'Roboto, sans-serif', width: '100%',
                }}
              />
            </div>
          </div>

          <div slot="end" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <NotificationsDropdown onNavigate={onNavigate} />
            <button type="button" aria-label="Help"
              onClick={() => onNavigate('help')}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', color: 'white',
                display: 'flex', alignItems: 'center', padding: '8px', borderRadius: '50%',
              }}
            >
              <HelpCircle size={22} />
            </button>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 8px',
              cursor: 'pointer', borderRadius: 'var(--forge-shape-full)',
            }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                backgroundColor: 'var(--brand-olive-dark)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', color: 'white',
                fontSize: '13px', fontWeight: 500, fontFamily: 'Roboto, sans-serif',
              }}>
                SW
              </div>
            </div>
          </div>
        </forge-app-bar>
      </div>

      {/* Main Content */}
      <main slot="body" style={{ backgroundColor: 'var(--forge-theme-surface-dim)', minHeight: 'calc(100vh - 140px)' }}>
        {children}
      </main>

      {/* Footer */}
      <footer
        slot="footer"
        className="forge-typography--label1"
        style={{
          backgroundColor: '#2a2a2a',
          color: 'var(--forge-theme-text-medium-inverse)',
          padding: 'var(--forge-spacing-small) var(--forge-spacing-large)',
          textAlign: 'center',
          borderTop: '1px solid #444',
        }}
      >
        &copy; 2025 Tyler Technologies Inc. - Student Transportation powered by Traversa
      </footer>
    </forge-scaffold>
    </>
  );
}
