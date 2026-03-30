import { useState, useEffect } from 'react';
import { ForgeCard } from '@tylertech/forge-react';
import { defineCardComponent } from '@tylertech/forge';
defineCardComponent();
import { Badge } from '../ui/badge';
import { ForgeButton } from '@tylertech/forge-react';
import { defineButtonComponent } from '@tylertech/forge';
defineButtonComponent();
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Search, Download, AlertTriangle, CheckCircle, Clock, Wrench, MapPin, User, Calendar, AlertCircle, TrendingUp, TrendingDown, ChevronUp, ChevronDown, ChevronsUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '../ui/command';
import { ExportDropdown } from '../shared/ExportDropdown';
import type { ExportFormat } from '../shared/ExportDropdown';
import { toast } from 'sonner@2.0.3';
import { 
  BlueBirdVisionIcon, 
  ICBusCESeriesIcon, 
  ThomasSafTLinerC2Icon, 
  ThomasSafTLinerHDXIcon, 
  BlueBirdAllAmericanIcon 
} from './bus-icons';
import blueBirdVisionImage from 'figma:asset/105378278b009ee6fc94abaed536f64cd3d8e2b3.png';
import icBusCESeriesImage from 'figma:asset/21d74f75357e2f9c963f7de5c42dc2984e42128f.png';
import thomasSafTLinerC2Image from 'figma:asset/3a2ed08444e1236b5d2ed085fae8108be0e34f25.png';
import blueBirdAllAmericanImage from 'figma:asset/cc1ace2efdf898535c090348483c30c45b97c1ee.png';
import thomasSafTLinerHDXImage from 'figma:asset/82ee4edb9142f194220fb71fddfb690c50f6e977.png';

// Helper function to get bus image based on make and model
const getBusImage = (make: string, model: string) => {
  const key = `${make} ${model}`;
  const imageMap: { [key: string]: string } = {
    'Blue Bird Vision': blueBirdVisionImage,
    'IC Bus CE Series': icBusCESeriesImage,
    'Thomas Saf-T-Liner C2': thomasSafTLinerC2Image,
    'Blue Bird All American': blueBirdAllAmericanImage,
    'Thomas Saf-T-Liner HDX': thomasSafTLinerHDXImage,
  };
  return imageMap[key] || blueBirdVisionImage; // Default to Blue Bird Vision if not found
};

// Mock vehicle data
const mockVehicles = [
  {
    id: 'VEH-015',
    name: 'Bus 15',
    make: 'Blue Bird',
    model: 'Vision',
    year: 2022,
    vin: '1BABNBYA3NF123456',
    licensePlate: 'SCH-1015',
    capacity: 72,
    status: 'Active',
    driver: 'David Park',
    primaryRoute: 'Jefferson Middle AM - Blue',
    secondaryRoute: 'Jefferson Middle PM - Blue',
    defaultGarage: 'North District Garage',
    midDayGarage: 'Central Service Center',
    gpsHardwareId: 'GPS-7X4K9M2',
    hourmeter: 3456,
    useTydAvl: true,
    lastInspection: '2025-02-15',
    nextInspection: '2025-05-15',
    maintenanceStatus: 'Good',
    incidentCount: 8,
    mileage: 45230,
    fuelType: 'Diesel',
    notes: 'Rear camera replaced 2025-01-10'
  },
  {
    id: 'VEH-014',
    name: 'Bus 14',
    make: 'IC Bus',
    model: 'CE Series',
    year: 2021,
    vin: '1BABLCYA8MF987654',
    licensePlate: 'SCH-1014',
    capacity: 72,
    status: 'Active',
    driver: 'Robert Thompson',
    primaryRoute: 'Roosevelt High AM - Red',
    secondaryRoute: 'Roosevelt High PM - Red',
    defaultGarage: 'South District Garage',
    midDayGarage: 'South District Garage',
    gpsHardwareId: 'GPS-2A8N5P1',
    hourmeter: 2890,
    useTydAvl: true,
    lastInspection: '2025-02-20',
    nextInspection: '2025-05-20',
    maintenanceStatus: 'Good',
    incidentCount: 6,
    mileage: 38450,
    fuelType: 'Diesel',
    notes: ''
  },
  {
    id: 'VEH-012',
    name: 'Bus 12',
    make: 'Blue Bird',
    model: 'Vision',
    year: 2020,
    vin: '1BABNBYA2LF456789',
    licensePlate: 'SCH-1012',
    capacity: 72,
    status: 'Active',
    driver: 'Michael Chen',
    primaryRoute: 'Meyers Middle AM - Yellow',
    secondaryRoute: 'Meyers Middle PM - Yellow',
    defaultGarage: 'North District Garage',
    midDayGarage: 'East Service Center',
    gpsHardwareId: 'GPS-5B3L7R4',
    hourmeter: 4567,
    useTydAvl: true,
    lastInspection: '2025-01-25',
    nextInspection: '2025-04-25',
    maintenanceStatus: 'Needs Attention',
    incidentCount: 12,
    mileage: 62890,
    fuelType: 'Diesel',
    notes: 'Tire rotation scheduled for next week'
  },
  {
    id: 'VEH-009',
    name: 'Bus 9',
    make: 'Thomas Built',
    model: 'Saf-T-Liner C2',
    year: 2021,
    vin: '1T8HFEA19MF345678',
    licensePlate: 'SCH-1009',
    capacity: 84,
    status: 'Active',
    driver: 'Jennifer Martinez',
    primaryRoute: 'Lincoln Elementary AM - Green',
    secondaryRoute: 'Lincoln Elementary PM - Green',
    defaultGarage: 'Central Service Center',
    midDayGarage: 'Central Service Center',
    gpsHardwareId: 'GPS-9D1K4T6',
    hourmeter: 3120,
    useTydAvl: false,
    lastInspection: '2025-02-10',
    nextInspection: '2025-05-10',
    maintenanceStatus: 'Good',
    incidentCount: 5,
    mileage: 41200,
    fuelType: 'Diesel',
    notes: ''
  },
  {
    id: 'VEH-008',
    name: 'Bus 8',
    make: 'IC Bus',
    model: 'CE Series',
    year: 2019,
    vin: '1BABLCYA1KF234567',
    licensePlate: 'SCH-1008',
    capacity: 72,
    status: 'Active',
    driver: 'Lisa Anderson',
    primaryRoute: 'Washington High PM - Wolf Rd',
    secondaryRoute: '',
    defaultGarage: 'South District Garage',
    midDayGarage: 'Central Service Center',
    gpsHardwareId: 'GPS-3H7M2W8',
    hourmeter: 5234,
    useTydAvl: true,
    lastInspection: '2025-03-01',
    nextInspection: '2025-06-01',
    maintenanceStatus: 'Good',
    incidentCount: 9,
    mileage: 72340,
    fuelType: 'Diesel',
    notes: ''
  },
  {
    id: 'VEH-007',
    name: 'Bus 7',
    make: 'Blue Bird',
    model: 'All American',
    year: 2022,
    vin: '1BAANBKA4NF876543',
    licensePlate: 'SCH-1007',
    capacity: 84,
    status: 'Active',
    driver: 'Robert Martinez',
    primaryRoute: 'Lincoln Elementary AM - Orange',
    secondaryRoute: 'Lincoln Elementary PM - Orange',
    defaultGarage: 'North District Garage',
    midDayGarage: 'North District Garage',
    gpsHardwareId: 'GPS-6F8P1Y3',
    hourmeter: 2145,
    useTydAvl: true,
    lastInspection: '2025-02-18',
    nextInspection: '2025-05-18',
    maintenanceStatus: 'Excellent',
    incidentCount: 3,
    mileage: 28950,
    fuelType: 'Diesel',
    notes: ''
  },
  {
    id: 'VEH-005',
    name: 'Bus 5',
    make: 'Thomas Built',
    model: 'Saf-T-Liner HDX',
    year: 2018,
    vin: '1T8HEAA18JF567890',
    licensePlate: 'SCH-1005',
    capacity: 84,
    status: 'Inactive',
    driver: 'Unassigned',
    primaryRoute: '',
    secondaryRoute: '',
    defaultGarage: 'East Service Center',
    midDayGarage: 'East Service Center',
    gpsHardwareId: 'GPS-4Q2V9X5',
    hourmeter: 6789,
    useTydAvl: false,
    lastInspection: '2025-01-15',
    nextInspection: '2025-04-15',
    maintenanceStatus: 'In Repair',
    incidentCount: 4,
    mileage: 89560,
    fuelType: 'Diesel',
    notes: 'Engine repair in progress, estimated completion 2025-03-20'
  },
  {
    id: 'VEH-003',
    name: 'Bus 3',
    make: 'IC Bus',
    model: 'CE Series',
    year: 2020,
    vin: '1BABLCYA3LF098765',
    licensePlate: 'SCH-1003',
    capacity: 72,
    status: 'Active',
    driver: 'Patricia Wilson',
    primaryRoute: 'Central Elementary AM - Purple',
    secondaryRoute: 'Central Elementary PM - Purple',
    defaultGarage: 'Central Service Center',
    midDayGarage: 'North District Garage',
    gpsHardwareId: 'GPS-8R5T3N7',
    hourmeter: 2678,
    useTydAvl: true,
    lastInspection: '2025-02-05',
    nextInspection: '2025-05-05',
    maintenanceStatus: 'Good',
    incidentCount: 2,
    mileage: 35670,
    fuelType: 'Diesel',
    notes: ''
  },
  {
    id: 'VEH-002',
    name: 'Bus 2',
    make: 'Blue Bird',
    model: 'Vision',
    year: 2023,
    vin: '1BABNBYA5PF654321',
    licensePlate: 'SCH-1002',
    capacity: 72,
    status: 'Active',
    driver: 'James Rodriguez',
    primaryRoute: 'Northside High AM - Silver',
    secondaryRoute: 'Northside High PM - Silver',
    defaultGarage: 'South District Garage',
    midDayGarage: 'South District Garage',
    gpsHardwareId: 'GPS-1K9J6B2',
    hourmeter: 890,
    useTydAvl: true,
    lastInspection: '2025-02-28',
    nextInspection: '2025-05-28',
    maintenanceStatus: 'Excellent',
    incidentCount: 1,
    mileage: 12450,
    fuelType: 'Diesel',
    notes: 'New vehicle'
  },
  {
    id: 'VEH-001',
    name: 'Bus 1',
    make: 'Thomas Built',
    model: 'Saf-T-Liner C2',
    year: 2019,
    vin: '1T8HFEA11KF789012',
    licensePlate: 'SCH-1001',
    capacity: 84,
    status: 'Active',
    driver: 'Sarah Mitchell',
    primaryRoute: 'Westside Elementary AM - Gold',
    secondaryRoute: 'Westside Elementary PM - Gold',
    defaultGarage: 'East Service Center',
    midDayGarage: 'Central Service Center',
    gpsHardwareId: 'GPS-7W4U2C9',
    hourmeter: 5123,
    useTydAvl: false,
    lastInspection: '2025-02-12',
    nextInspection: '2025-05-12',
    maintenanceStatus: 'Needs Attention',
    incidentCount: 7,
    mileage: 67890,
    fuelType: 'Diesel',
    notes: 'Brake pads due for replacement'
  },
  {
    id: 'VEH-016',
    name: 'Bus 16',
    make: 'IC Bus',
    model: 'CE Series',
    year: 2023,
    vin: '1BABLCYA6PF112233',
    licensePlate: 'SCH-1016',
    capacity: 72,
    status: 'Active',
    driver: 'Kevin Brooks',
    primaryRoute: 'Oakwood Middle AM - Teal',
    secondaryRoute: 'Oakwood Middle PM - Teal',
    defaultGarage: 'North District Garage',
    midDayGarage: 'North District Garage',
    gpsHardwareId: 'GPS-4T6R8Q1',
    hourmeter: 1245,
    useTydAvl: true,
    lastInspection: '2025-03-05',
    nextInspection: '2025-06-05',
    maintenanceStatus: 'Excellent',
    incidentCount: 2,
    mileage: 15780,
    fuelType: 'Diesel',
    notes: 'New addition to fleet'
  },
  {
    id: 'VEH-017',
    name: 'Bus 17',
    make: 'Blue Bird',
    model: 'All American',
    year: 2021,
    vin: '1BAANBKA2MF445566',
    licensePlate: 'SCH-1017',
    capacity: 84,
    status: 'Active',
    driver: 'Angela Foster',
    primaryRoute: 'Riverside High AM - Maroon',
    secondaryRoute: 'Riverside High PM - Maroon',
    defaultGarage: 'South District Garage',
    midDayGarage: 'Central Service Center',
    gpsHardwareId: 'GPS-8K2M5V7',
    hourmeter: 3890,
    useTydAvl: true,
    lastInspection: '2025-01-30',
    nextInspection: '2025-04-30',
    maintenanceStatus: 'Good',
    incidentCount: 6,
    mileage: 51230,
    fuelType: 'Diesel',
    notes: ''
  },
  {
    id: 'VEH-018',
    name: 'Bus 18',
    make: 'Thomas Built',
    model: 'Saf-T-Liner HDX',
    year: 2020,
    vin: '1T8HEAA12LF778899',
    licensePlate: 'SCH-1018',
    capacity: 84,
    status: 'Inactive',
    driver: 'Unassigned',
    primaryRoute: '',
    secondaryRoute: '',
    defaultGarage: 'East Service Center',
    midDayGarage: 'East Service Center',
    gpsHardwareId: 'GPS-1P9S3X6',
    hourmeter: 5678,
    useTydAvl: false,
    lastInspection: '2025-02-01',
    nextInspection: '2025-05-01',
    maintenanceStatus: 'In Repair',
    incidentCount: 10,
    mileage: 78430,
    fuelType: 'Diesel',
    notes: 'Transmission replacement in progress'
  },
  {
    id: 'VEH-019',
    name: 'Bus 19',
    make: 'Blue Bird',
    model: 'Vision',
    year: 2024,
    vin: '1BABNBYA7RF334455',
    licensePlate: 'SCH-1019',
    capacity: 72,
    status: 'Active',
    driver: 'Marcus Greene',
    primaryRoute: 'Hillcrest Elementary AM - Coral',
    secondaryRoute: 'Hillcrest Elementary PM - Coral',
    defaultGarage: 'Central Service Center',
    midDayGarage: 'South District Garage',
    gpsHardwareId: 'GPS-5N7W1D4',
    hourmeter: 620,
    useTydAvl: true,
    lastInspection: '2025-03-01',
    nextInspection: '2025-06-01',
    maintenanceStatus: 'Excellent',
    incidentCount: 0,
    mileage: 8340,
    fuelType: 'Diesel',
    notes: 'Newest vehicle in fleet'
  },
  {
    id: 'VEH-020',
    name: 'Bus 20',
    make: 'Thomas Built',
    model: 'Saf-T-Liner C2',
    year: 2022,
    vin: '1T8HFEA15NF556677',
    licensePlate: 'SCH-1020',
    capacity: 84,
    status: 'Active',
    driver: 'Diane Nguyen',
    primaryRoute: 'Summit Academy AM - Ivory',
    secondaryRoute: 'Summit Academy PM - Ivory',
    defaultGarage: 'North District Garage',
    midDayGarage: 'East Service Center',
    gpsHardwareId: 'GPS-2G4H6J8',
    hourmeter: 2340,
    useTydAvl: true,
    lastInspection: '2025-02-22',
    nextInspection: '2025-05-22',
    maintenanceStatus: 'Good',
    incidentCount: 4,
    mileage: 32100,
    fuelType: 'Diesel',
    notes: 'New stop sign arm installed 2025-02-10'
  },
];

interface VehiclesPageProps {
  onNavigate: (page: string) => void;
}

export function VehiclesPage({ onNavigate }: VehiclesPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [maintenanceFilter, setMaintenanceFilter] = useState('all');
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [vehicleLookupOpen, setVehicleLookupOpen] = useState(false);
  
  // Sorting state - default sort by vehicle name
  const [sortColumn, setSortColumn] = useState<'id' | 'details' | 'driver' | 'route' | 'status' | 'maintenance' | 'incidents' | 'mileage'>('details');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Pagination state
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Function to get bus icon based on make and model
  const getBusIconByMakeModel = (make: string, model: string) => {
    const makeModelKey = `${make} ${model}`.toLowerCase();
    
    if (makeModelKey.includes('blue bird') && makeModelKey.includes('vision')) {
      return { icon: <BlueBirdVisionIcon />, type: 'Blue Bird Vision', description: 'Modern conventional school bus with distinctive front cap design' };
    } else if (makeModelKey.includes('ic bus') && makeModelKey.includes('ce')) {
      return { icon: <ICBusCESeriesIcon />, type: 'IC Bus CE Series', description: 'Commercial-style conventional with squared-off front profile' };
    } else if (makeModelKey.includes('thomas') && makeModelKey.includes('saf-t-liner c2')) {
      return { icon: <ThomasSafTLinerC2Icon />, type: 'Thomas Built Saf-T-Liner C2', description: 'Conventional bus with distinctive rounded nose' };
    } else if (makeModelKey.includes('thomas') && makeModelKey.includes('hdx')) {
      return { icon: <ThomasSafTLinerHDXIcon />, type: 'Thomas Built Saf-T-Liner HDX', description: 'Heavy-duty conventional with angular front design' };
    } else if (makeModelKey.includes('blue bird') && makeModelKey.includes('all american')) {
      return { icon: <BlueBirdAllAmericanIcon />, type: 'Blue Bird All American', description: 'Traditional conventional with classic Blue Bird profile' };
    } else {
      // Default to Blue Bird Vision for unknown models
      return { icon: <BlueBirdVisionIcon />, type: `${make} ${model}`, description: 'Conventional school bus' };
    }
  };

  // Calculate summary statistics
  const totalVehicles = mockVehicles.length;
  const activeVehicles = mockVehicles.filter(v => v.status === 'Active').length;
  const inMaintenance = mockVehicles.filter(v => v.status === 'Maintenance').length;
  const needsAttention = mockVehicles.filter(v => v.maintenanceStatus === 'Needs Attention' || v.maintenanceStatus === 'In Repair').length;
  const avgIncidents = (mockVehicles.reduce((sum, v) => sum + v.incidentCount, 0) / totalVehicles).toFixed(1);
  const avgMileage = Math.round(mockVehicles.reduce((sum, v) => sum + v.mileage, 0) / totalVehicles);

  // Filter vehicles
  const filteredVehicles = mockVehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.primaryRoute.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter;
    const matchesMaintenance = maintenanceFilter === 'all' || vehicle.maintenanceStatus === maintenanceFilter;

    return matchesSearch && matchesStatus && matchesMaintenance;
  });
  
  // Function to handle column header clicks
  const handleSort = (column: typeof sortColumn) => {
    if (sortColumn === column) {
      // Toggle direction if clicking the same column
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new column with ascending direction
      setSortColumn(column);
      setSortDirection('asc');
    }
  };
  
  // Sort the filtered vehicles
  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    let compareResult = 0;
    
    switch (sortColumn) {
      case 'id':
        compareResult = a.id.localeCompare(b.id);
        break;
      case 'details':
        // Sort by name
        compareResult = a.name.localeCompare(b.name);
        break;
      case 'driver':
        compareResult = a.driver.localeCompare(b.driver);
        break;
      case 'route':
        compareResult = a.primaryRoute.localeCompare(b.primaryRoute);
        break;
      case 'status':
        compareResult = a.status.localeCompare(b.status);
        break;
      case 'maintenance':
        const maintenanceOrder = { 'Excellent': 4, 'Good': 3, 'Needs Attention': 2, 'In Repair': 1 };
        compareResult = (maintenanceOrder[a.maintenanceStatus as keyof typeof maintenanceOrder] || 0) - 
                       (maintenanceOrder[b.maintenanceStatus as keyof typeof maintenanceOrder] || 0);
        break;
      case 'incidents':
        compareResult = a.incidentCount - b.incidentCount;
        break;
      case 'mileage':
        compareResult = a.mileage - b.mileage;
        break;
    }
    
    return sortDirection === 'asc' ? compareResult : -compareResult;
  });
  
  // Pagination calculations
  const totalPages = Math.ceil(sortedVehicles.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedVehicles = sortedVehicles.slice(startIndex, startIndex + rowsPerPage);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, maintenanceFilter, rowsPerPage]);

  // Render sort icon for column header
  const SortIcon = ({ column }: { column: typeof sortColumn }) => {
    if (sortColumn !== column) {
      return <ChevronsUpDown className="h-4 w-4 ml-1 text-muted-foreground" />;
    }
    return sortDirection === 'asc' 
      ? <ChevronUp className="h-4 w-4 ml-1" /> 
      : <ChevronDown className="h-4 w-4 ml-1" />;
  };

  const getMaintenanceColor = (status: string) => {
    switch (status) {
      case 'Excellent':
        return 'default';
      case 'Good':
        return 'secondary';
      case 'Needs Attention':
        return 'destructive';
      case 'In Repair':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getMaintenanceIcon = (status: string) => {
    switch (status) {
      case 'Excellent':
      case 'Good':
        return <CheckCircle className="h-4 w-4" />;
      case 'Needs Attention':
        return <AlertTriangle className="h-4 w-4" />;
      case 'In Repair':
        return <Wrench className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const handleExport = (format: ExportFormat) => {
    const formatLabels: Record<ExportFormat, string> = {
      excel: 'Excel Spreadsheet', word: 'Word Document', csv: 'CSV', 'csv-no-header': 'CSV (no header)',
    };
    const formatExtensions: Record<ExportFormat, string> = {
      excel: 'xlsx', word: 'docx', csv: 'csv', 'csv-no-header': 'csv',
    };

    toast.success('Export started', {
      description: `Preparing ${formatLabels[format]} export for vehicles data.`,
    });

    setTimeout(() => {
      const headers = ['Vehicle ID', 'Name', 'Make', 'Model', 'Year', 'Driver', 'Primary Route', 'Status', 'Maintenance', 'Incidents', 'Mileage', 'Last Inspection'];
      const rows = filteredVehicles.map(v => [
        v.id, v.name, v.make, v.model, v.year, `"${v.driver}"`,
        `"${v.primaryRoute}"`, v.status, v.maintenanceStatus,
        v.incidentCount, v.mileage, v.lastInspection
      ].join(','));

      const csvContent = format === 'csv-no-header'
        ? rows.join('\n')
        : [headers.join(','), ...rows].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `vehicles-export-${new Date().toISOString().split('T')[0]}.${formatExtensions[format]}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast.success('Export complete', {
        description: `Your ${formatLabels[format]} has been downloaded.`,
      });
    }, 1500);
  };

  return (
    <div style={{ padding: 'var(--forge-spacing-xlarge)' }}>
      {/* Page Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: 'var(--forge-spacing-large)' }}>
        <div>
          <h1 style={{ margin: 0, marginBottom: '8px' }}>Fleet Management</h1>
          <p className="text-muted-foreground" style={{ margin: 0 }}>
            Monitor and manage all district vehicles
          </p>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" style={{ marginBottom: 'var(--forge-spacing-large)' }}>
        <ForgeCard style={{ boxShadow: 'var(--forge-elevation-1)' }}>
          <div style={{ padding: 'var(--forge-spacing-medium)' }} className="flex flex-row items-center justify-between pb-2">
            <h3 className="forge-typography--heading4" style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>Total Vehicles</h3>
          </div>
          <div style={{ marginTop: 'var(--forge-spacing-small)' }}>
            <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'var(--brand-blue-dark)' }}>
              {totalVehicles}
            </div>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', marginTop: '4px' }}>
              Active fleet size
            </p>
          </div>
        </ForgeCard>

        <ForgeCard style={{ boxShadow: 'var(--forge-elevation-1)' }}>
          <div style={{ padding: 'var(--forge-spacing-medium)' }} className="flex flex-row items-center justify-between pb-2">
            <h3 className="forge-typography--heading4" style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>Active Vehicles</h3>
          </div>
          <div style={{ marginTop: 'var(--forge-spacing-small)' }}>
            <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'var(--brand-olive-medium)' }}>
              {activeVehicles}
            </div>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', marginTop: '4px' }}>
              {inMaintenance > 0 ? `${inMaintenance} in maintenance` : 'All operational'}
            </p>
          </div>
        </ForgeCard>

        <ForgeCard style={{ boxShadow: 'var(--forge-elevation-1)' }}>
          <div style={{ padding: 'var(--forge-spacing-medium)' }} className="flex flex-row items-center justify-between pb-2">
            <h3 className="forge-typography--heading4" style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>Maintenance Alerts</h3>
          </div>
          <div style={{ marginTop: 'var(--forge-spacing-small)' }}>
            <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, color: needsAttention > 0 ? '#dc2626' : 'var(--brand-blue-dark)' }}>
              {needsAttention}
            </div>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', marginTop: '4px' }}>
              {needsAttention > 0 ? 'Vehicles need attention' : 'All vehicles good'}
            </p>
          </div>
        </ForgeCard>

        <ForgeCard style={{ boxShadow: 'var(--forge-elevation-1)' }}>
          <div style={{ padding: 'var(--forge-spacing-medium)' }} className="flex flex-row items-center justify-between pb-2">
            <h3 className="forge-typography--heading4" style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>Avg. Incidents</h3>
          </div>
          <div style={{ marginTop: 'var(--forge-spacing-small)' }}>
            <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'var(--brand-blue-dark)' }}>
              {avgIncidents}
            </div>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', marginTop: '4px' }}>
              Per vehicle this year
            </p>
          </div>
        </ForgeCard>
      </div>

      {/* Filters Card */}
      <ForgeCard style={{ boxShadow: 'var(--forge-elevation-1)', marginBottom: 'var(--forge-spacing-large)' }}>
        <div style={{ padding: 'var(--forge-spacing-medium)', paddingTop: 'var(--forge-spacing-large)' }}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" style={{ zIndex: 1 }} />
                <Input
                  placeholder="Search vehicles, drivers, or routes..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setVehicleLookupOpen(true);
                  }}
                  onFocus={() => setVehicleLookupOpen(true)}
                  className="pl-10"
                />
                {vehicleLookupOpen && searchTerm && (
                  <div 
                    className="absolute z-50 w-full mt-1 border rounded-md shadow-lg max-h-[400px] overflow-auto"
                    style={{ 
                      backgroundColor: 'var(--popover)', 
                      borderColor: 'var(--border)',
                      boxShadow: 'var(--forge-elevation-4)'
                    }}
                  >
                    <Command>
                      <CommandList>
                        <CommandEmpty>No vehicle found.</CommandEmpty>
                        <CommandGroup>
                          {mockVehicles
                            .filter((vehicle) =>
                              vehicle.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              vehicle.primaryRoute.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .slice(0, 8)
                            .map((vehicle) => (
                              <CommandItem
                                key={vehicle.id}
                                value={vehicle.name}
                                onSelect={() => {
                                  setSearchTerm(vehicle.name);
                                  setVehicleLookupOpen(false);
                                }}
                                style={{
                                  cursor: 'pointer',
                                  padding: 'var(--forge-spacing-small)',
                                }}
                              >
                                <div className="flex flex-col w-full">
                                  <div className="flex items-center justify-between">
                                    <span style={{ fontWeight: 500 }}>{vehicle.name} - {vehicle.year} {vehicle.make} {vehicle.model}</span>
                                    <Badge variant={vehicle.status === 'Active' ? 'default' : 'secondary'} style={{ fontSize: '0.75rem' }}>
                                      {vehicle.status}
                                    </Badge>
                                  </div>
                                  <div className="text-sm text-muted-foreground mt-1">
                                    {vehicle.id} • Driver: {vehicle.driver}
                                  </div>
                                  <div className="text-sm text-muted-foreground flex items-center gap-4 mt-1">
                                    {vehicle.primaryRoute && (
                                      <span className="flex items-center gap-1">
                                        <MapPin className="h-3 w-3" />
                                        {vehicle.primaryRoute}
                                      </span>
                                    )}
                                    <span className="flex items-center gap-1">
                                      <Badge variant={getMaintenanceColor(vehicle.maintenanceStatus)} style={{ fontSize: '0.65rem', padding: '2px 6px' }}>
                                        {vehicle.maintenanceStatus}
                                      </Badge>
                                    </span>
                                  </div>
                                </div>
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </div>
                )}
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Maintenance Filter */}
            <div>
              <Select value={maintenanceFilter} onValueChange={setMaintenanceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Maintenance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Maintenance</SelectItem>
                  <SelectItem value="Excellent">Excellent</SelectItem>
                  <SelectItem value="Good">Good</SelectItem>
                  <SelectItem value="Needs Attention">Needs Attention</SelectItem>
                  <SelectItem value="In Repair">In Repair</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </ForgeCard>

      {/* Vehicles Table */}
      <ForgeCard style={{ boxShadow: 'var(--forge-elevation-1)' }}>
        <div style={{ padding: 'var(--forge-spacing-medium)' }} className="flex flex-row items-center justify-between">
          <h3 className="forge-typography--heading4">
            All Vehicles <span className="text-muted-foreground">({filteredVehicles.length})</span>
          </h3>
          <div className="flex gap-2">
            <ExportDropdown onExport={handleExport} />
          </div>
        </div>
        <div style={{ marginTop: 'var(--forge-spacing-small)' }}>
          <div className="overflow-x-auto">
            <table className="forge-table">
              <thead>
                <tr>
                  <th className="forge-table-cell forge-table-cell--header">
                    <button
                      onClick={() => handleSort('id')}
                      className="flex items-center hover:text-primary transition-colors cursor-pointer"
                    >
                      Vehicle ID
                      <SortIcon column="id" />
                    </button>
                  </th>
                  <th className="forge-table-cell forge-table-cell--header">
                    <button
                      onClick={() => handleSort('details')}
                      className="flex items-center hover:text-primary transition-colors cursor-pointer"
                    >
                      Vehicle
                      <SortIcon column="details" />
                    </button>
                  </th>
                  <th className="forge-table-cell forge-table-cell--header">
                    <button
                      onClick={() => handleSort('driver')}
                      className="flex items-center hover:text-primary transition-colors cursor-pointer"
                    >
                      Driver
                      <SortIcon column="driver" />
                    </button>
                  </th>
                  <th className="forge-table-cell forge-table-cell--header">
                    <button
                      onClick={() => handleSort('route')}
                      className="flex items-center hover:text-primary transition-colors cursor-pointer"
                    >
                      Primary Route
                      <SortIcon column="route" />
                    </button>
                  </th>
                  <th className="forge-table-cell forge-table-cell--header">
                    <button
                      onClick={() => handleSort('mileage')}
                      className="flex items-center hover:text-primary transition-colors cursor-pointer"
                    >
                      Mileage
                      <SortIcon column="mileage" />
                    </button>
                  </th>
                  <th className="forge-table-cell forge-table-cell--header">
                    <button
                      onClick={() => handleSort('incidents')}
                      className="flex items-center hover:text-primary transition-colors cursor-pointer"
                    >
                      Incidents
                      <SortIcon column="incidents" />
                    </button>
                  </th>
                  <th className="forge-table-cell forge-table-cell--header">
                    <button
                      onClick={() => handleSort('status')}
                      className="flex items-center hover:text-primary transition-colors cursor-pointer"
                    >
                      Status
                      <SortIcon column="status" />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedVehicles.map((vehicle) => (
                  <Dialog key={vehicle.id}>
                    <DialogTrigger asChild>
                      <tr
                        className="forge-table-row cursor-pointer"
                        onClick={() => setSelectedVehicle(vehicle)}
                      >
                        <td className="forge-table-cell">
                          <span style={{ fontWeight: 500, fontFamily: 'var(--forge-font-family)' }}>
                            {vehicle.id}
                          </span>
                        </td>
                        <td className="forge-table-cell">
                          <div>
                            <div style={{ fontWeight: 500, fontFamily: 'var(--forge-font-family)' }}>{vehicle.name}</div>
                          </div>
                        </td>
                        <td className="forge-table-cell">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>{vehicle.driver}</span>
                          </div>
                        </td>
                        <td className="forge-table-cell">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span style={{ fontSize: '0.875rem' }}>{vehicle.primaryRoute || 'Unassigned'}</span>
                          </div>
                        </td>
                        <td className="forge-table-cell">
                          <span style={{ fontSize: '0.875rem', color: 'var(--forge-theme-text-low)' }}>
                            {vehicle.mileage.toLocaleString()} mi
                          </span>
                        </td>
                        <td className="forge-table-cell">
                          <div className="flex items-center gap-2">
                            {vehicle.incidentCount > 8 ? (
                              <TrendingUp className="h-4 w-4 text-destructive" />
                            ) : vehicle.incidentCount < 4 ? (
                              <TrendingDown className="h-4 w-4 text-green-600" />
                            ) : null}
                            <span style={{ fontWeight: vehicle.incidentCount > 8 ? 600 : 'normal' }}>
                              {vehicle.incidentCount}
                            </span>
                          </div>
                        </td>
                        <td className="forge-table-cell">
                          <Badge variant={vehicle.status === 'Active' ? 'default' : 'secondary'}>
                            {vehicle.status}
                          </Badge>
                        </td>
                      </tr>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col">
                      <DialogHeader>
                        <div className="flex items-center justify-between pr-6">
                          <DialogTitle style={{ fontFamily: 'var(--forge-font-family)' }}>Vehicle Details - {vehicle.id}</DialogTitle>
                          <Badge variant={vehicle.status === 'Active' ? 'default' : 'secondary'}>
                            {vehicle.status}
                          </Badge>
                        </div>
                        <DialogDescription style={{ fontFamily: 'var(--forge-font-family)' }}>
                          Complete information for {vehicle.name}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="overflow-y-auto flex-1 pr-2" style={{ maxHeight: 'calc(85vh - 120px)' }}>
                        {selectedVehicle && (
                          <div className="space-y-6">
                            {/* VIN, Capacity, Current Mileage, Vehicle Incident Count */}
                            <div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <div className="text-muted-foreground" style={{ fontSize: 'var(--forge-font-size-sm)', fontFamily: 'var(--forge-font-family)' }}>VIN</div>
                                  <div style={{ fontFamily: 'var(--forge-font-family)', marginTop: 'var(--forge-spacing-xxsmall)' }}>{selectedVehicle.vin}</div>
                                </div>
                                <div>
                                  <div className="text-muted-foreground" style={{ fontSize: 'var(--forge-font-size-sm)', fontFamily: 'var(--forge-font-family)' }}>Capacity</div>
                                  <div style={{ fontFamily: 'var(--forge-font-family)', marginTop: 'var(--forge-spacing-xxsmall)' }}>{selectedVehicle.capacity} passengers</div>
                                </div>
                                <div>
                                  <div className="text-muted-foreground" style={{ fontSize: 'var(--forge-font-size-sm)', fontFamily: 'var(--forge-font-family)' }}>Current Mileage</div>
                                  <div style={{ fontFamily: 'var(--forge-font-family)', marginTop: 'var(--forge-spacing-xxsmall)' }}>{selectedVehicle.mileage.toLocaleString()} miles</div>
                                </div>
                                <div>
                                  <div className="text-muted-foreground" style={{ fontSize: 'var(--forge-font-size-sm)', fontFamily: 'var(--forge-font-family)' }}>Vehicle Incident Count</div>
                                  <div style={{ fontFamily: 'var(--forge-font-family)', marginTop: 'var(--forge-spacing-xxsmall)' }}>{selectedVehicle.incidentCount} incidents this year</div>
                                </div>
                              </div>
                            </div>

                            {/* GPS & AVL Configuration */}
                            <div className="border-t pt-4">
                              <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--forge-spacing-small)', fontFamily: 'var(--forge-font-family)' }}>
                                GPS & AVL Configuration
                              </h3>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <div className="text-muted-foreground" style={{ fontSize: 'var(--forge-font-size-sm)', fontFamily: 'var(--forge-font-family)' }}>GPS Hardware ID</div>
                                  <div style={{ fontFamily: 'var(--forge-font-family)', marginTop: 'var(--forge-spacing-xxsmall)' }}>{selectedVehicle.gpsHardwareId}</div>
                                </div>
                                <div>
                                  <div className="text-muted-foreground" style={{ fontSize: 'var(--forge-font-size-sm)', fontFamily: 'var(--forge-font-family)' }}>TYD AVL Integration</div>
                                  <div className="flex items-center gap-2" style={{ marginTop: 'var(--forge-spacing-xxsmall)' }}>
                                    <div 
                                      className={`w-3 h-3 rounded-full ${selectedVehicle.useTydAvl ? 'bg-green-500' : 'bg-gray-300'}`}
                                    />
                                    <span style={{ fontFamily: 'var(--forge-font-family)' }}>{selectedVehicle.useTydAvl ? 'Enabled' : 'Disabled'}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Garage Assignments */}
                            <div className="border-t pt-4">
                              <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--forge-spacing-small)', fontFamily: 'var(--forge-font-family)' }}>
                                Garage Assignments
                              </h3>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <div className="text-muted-foreground" style={{ fontSize: 'var(--forge-font-size-sm)', fontFamily: 'var(--forge-font-family)' }}>Default Garage</div>
                                  <div style={{ fontFamily: 'var(--forge-font-family)', marginTop: 'var(--forge-spacing-xxsmall)' }}>{selectedVehicle.defaultGarage}</div>
                                </div>
                                <div>
                                  <div className="text-muted-foreground" style={{ fontSize: 'var(--forge-font-size-sm)', fontFamily: 'var(--forge-font-family)' }}>Mid-Day Garage</div>
                                  <div style={{ fontFamily: 'var(--forge-font-family)', marginTop: 'var(--forge-spacing-xxsmall)' }}>{selectedVehicle.midDayGarage}</div>
                                </div>
                              </div>
                            </div>

                            {/* Assignment Information */}
                            <div className="border-t pt-4">
                              <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--forge-spacing-small)', fontFamily: 'var(--forge-font-family)' }}>
                                Assignment Information
                              </h3>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <div className="text-muted-foreground" style={{ fontSize: 'var(--forge-font-size-sm)', fontFamily: 'var(--forge-font-family)' }}>Assigned Driver</div>
                                  <div className="flex items-center gap-2" style={{ marginTop: 'var(--forge-spacing-xxsmall)' }}>
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <span style={{ fontWeight: 500, fontFamily: 'var(--forge-font-family)' }}>{selectedVehicle.driver}</span>
                                  </div>
                                </div>
                                <div>
                                  <div className="text-muted-foreground" style={{ fontSize: 'var(--forge-font-size-sm)', fontFamily: 'var(--forge-font-family)' }}>Primary Route</div>
                                  <div className="flex items-center gap-2" style={{ marginTop: 'var(--forge-spacing-xxsmall)' }}>
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span style={{ fontFamily: 'var(--forge-font-family)' }}>{selectedVehicle.primaryRoute || 'None'}</span>
                                  </div>
                                </div>
                                <div>
                                  <div className="text-muted-foreground" style={{ fontSize: 'var(--forge-font-size-sm)', fontFamily: 'var(--forge-font-family)' }}>Secondary Route</div>
                                  <div style={{ fontFamily: 'var(--forge-font-family)', marginTop: 'var(--forge-spacing-xxsmall)' }}>{selectedVehicle.secondaryRoute || 'None'}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between" style={{ paddingTop: 'var(--forge-spacing-medium)', borderTop: '1px solid var(--forge-color-border-subtle)', marginTop: 'var(--forge-spacing-medium)' }}>
            <div className="flex items-center" style={{ gap: 'var(--forge-spacing-small)' }}>
              <span style={{ fontSize: 'var(--forge-font-size-sm)', color: 'var(--muted-foreground)', fontFamily: 'var(--forge-font-family)' }}>
                Showing {startIndex + 1}–{Math.min(startIndex + rowsPerPage, sortedVehicles.length)} of {sortedVehicles.length} vehicles
              </span>
              {rowsPerPage === 10 && sortedVehicles.length > 10 && (
                <ForgeButton
                  variant="outlined"
                  size="sm"
                  onClick={() => { setRowsPerPage(25); setCurrentPage(1); }}
                  style={{ fontSize: 'var(--forge-font-size-sm)', fontFamily: 'var(--forge-font-family)' }}
                >
                  Show 25
                </ForgeButton>
              )}
              {rowsPerPage === 25 && (
                <ForgeButton
                  variant="outlined"
                  size="sm"
                  onClick={() => { setRowsPerPage(10); setCurrentPage(1); }}
                  style={{ fontSize: 'var(--forge-font-size-sm)', fontFamily: 'var(--forge-font-family)' }}
                >
                  Show 10
                </ForgeButton>
              )}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center" style={{ gap: 'var(--forge-spacing-xsmall)' }}>
                <ForgeButton
                  variant="outlined"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  style={{ padding: 'var(--forge-spacing-xxsmall) var(--forge-spacing-xsmall)' }}
                >
                  <ChevronLeft className="h-4 w-4" />
                </ForgeButton>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <ForgeButton
                    key={page}
                    variant={page === currentPage ? 'raised' : 'outlined'}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    style={{ minWidth: '32px', padding: 'var(--forge-spacing-xxsmall) var(--forge-spacing-xsmall)', fontSize: 'var(--forge-font-size-sm)', fontFamily: 'var(--forge-font-family)' }}
                  >
                    {page}
                  </ForgeButton>
                ))}
                <ForgeButton
                  variant="outlined"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  style={{ padding: 'var(--forge-spacing-xxsmall) var(--forge-spacing-xsmall)' }}
                >
                  <ChevronRight className="h-4 w-4" />
                </ForgeButton>
              </div>
            )}
          </div>
        </div>
      </ForgeCard>
    </div>
  );
}