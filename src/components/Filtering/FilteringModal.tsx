import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Divider, IconButton, Modal, Stack, Typography } from '@mui/material';
import { AvailableFilterOptions, Filters } from '../../types/filterTypes';
import SearchFilter from './SearchFilter';

interface FilteringModalProps {
  open: boolean;
  handleClose: () => void;
  setActiveFilters: React.Dispatch<React.SetStateAction<Filters[]>>;
  activeFilters: Filters[];
  filterOptions: AvailableFilterOptions;
}

export const FilteringModal = ({
  open,
  handleClose,
  setActiveFilters,
  activeFilters,
  filterOptions
}: FilteringModalProps) => {
  const handleSelect = (options: string[], label: string) => {
    setActiveFilters((prev) => {
      const newFilters = prev.map((filter) => {
        if (filter.property_name === label) {
          return {
            property_name: label,
            values: options
          };
        } else {
          return filter;
        }
      });
      return newFilters;
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Stack
        spacing={2}
        direction={'column'}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: '10px'
        }}
      >
        <Stack direction={'column'} spacing={1}>
          <Stack
            direction={'row'}
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Filtering Options
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseOutlinedIcon />
            </IconButton>
          </Stack>

          <Divider />
        </Stack>
        <Stack
          direction={'column'}
          spacing={4}
          sx={{ paddingTop: '10px' }}
          key={crypto.randomUUID()}
        >
          <SearchFilter
            options={filterOptions.isin}
            label={'isin'}
            handleSelect={handleSelect}
            activeFilters={activeFilters}
          />

          <SearchFilter
            options={filterOptions.shortname}
            label={'shortname'}
            handleSelect={handleSelect}
            activeFilters={activeFilters}
          />
        </Stack>
      </Stack>
    </Modal>
  );
};
