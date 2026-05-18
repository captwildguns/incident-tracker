import { ForgeMenu, ForgeButton } from '@tylertech/forge-react';
import {
  defineButtonComponent,
  defineMenuComponent,
  defineIconComponent,
} from '@tylertech/forge';
defineButtonComponent();
defineMenuComponent();
defineIconComponent();

export type ExportFormat = 'excel' | 'csv';

interface ExportDropdownProps {
  onExport?: (format: ExportFormat) => void;
  label?: string;
}

const exportOptions = [
  { label: 'Excel Spreadsheet', value: 'excel' },
  { label: 'CSV', value: 'csv' },
];

export function ExportDropdown({ onExport, label = 'Export' }: ExportDropdownProps) {
  return (
    <ForgeMenu
      placement="bottom-end"
      options={exportOptions}
      on-forge-menu-select={(evt: any) => {
        const val = evt.detail?.value as ExportFormat | undefined;
        if (!val) return;
        onExport?.(val);
      }}
    >
      <ForgeButton variant="outlined" style={{ fontFamily: 'var(--forge-font-family)', fontSize: 'var(--forge-font-size-sm)' }}>
        <forge-icon slot="start" name="download"></forge-icon>
        {label}
        <forge-icon slot="end" name="arrow_drop_down"></forge-icon>
      </ForgeButton>
    </ForgeMenu>
  );
}
