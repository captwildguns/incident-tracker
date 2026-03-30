import React from 'react';
import { Download, ChevronDown } from 'lucide-react';
import { ForgeButton } from '@tylertech/forge-react';
import { defineButtonComponent } from '@tylertech/forge';
defineButtonComponent();
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../ui/dropdown-menu';
import { toast } from 'sonner@2.0.3';

export type ExportFormat = 'excel' | 'word' | 'csv' | 'csv-no-header';

interface ExportDropdownProps {
  onExport?: (format: ExportFormat) => void;
  label?: string;
}

const exportOptions: { label: string; value: ExportFormat }[] = [
  { label: 'Excel Spreadsheet', value: 'excel' },
  { label: 'Word Document', value: 'word' },
  { label: 'CSV', value: 'csv' },
  { label: 'CSV (no header)', value: 'csv-no-header' },
];

export function ExportDropdown({ onExport, label = 'Export report...' }: ExportDropdownProps) {
  const handleSelect = (format: ExportFormat) => {
    if (onExport) {
      onExport(format);
    } else {
      const formatLabels: Record<ExportFormat, string> = {
        excel: 'Excel Spreadsheet',
        word: 'Word Document',
        csv: 'CSV',
        'csv-no-header': 'CSV (no header)',
      };
      toast.success('Export started', {
        description: `Preparing ${formatLabels[format]} export. It will download shortly.`,
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ForgeButton
          variant="outlined"
          style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--forge-font-size-sm)' }}
        >
          <Download className="mr-2 h-4 w-4" />
          {label}
          <ChevronDown className="ml-1 h-3 w-3" />
        </ForgeButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        style={{
          fontFamily: 'var(--forge-font-family)',
          fontSize: 'var(--forge-font-size-sm)',
          borderRadius: 'var(--forge-radius-medium)',
          border: '1px solid var(--forge-color-border-default)',
        }}
      >
        {exportOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handleSelect(option.value)}
            style={{
              fontFamily: 'var(--forge-font-family)',
              fontSize: 'var(--forge-font-size-sm)',
              cursor: 'pointer',
            }}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
