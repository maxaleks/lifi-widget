import {
  Avatar,
  FormControl,
  ListItemIcon,
  MenuItem,
  SelectChangeEvent,
  Skeleton,
} from '@mui/material';
import { useFormContext, useWatch } from 'react-hook-form';
import { Select } from '../../components/Select';
import { useChains } from '../../hooks/useChains';
import {
  SwapFormKey,
  SwapFormKeyHelper,
  SwapFormTypeProps,
} from '../../providers/SwapFormProvider';
import { useWidgetConfig } from '../../providers/WidgetProvider';

export const ChainSelect = ({ formType }: SwapFormTypeProps) => {
  const { setValue } = useFormContext();
  const { fromChain, toChain } = useWidgetConfig();
  const { chains, isLoading } = useChains();
  const [fromChainId, toChainId] = useWatch({
    name: [SwapFormKey.FromChain, SwapFormKey.ToChain],
  });

  const handleChain = (event: SelectChangeEvent<unknown>) => {
    setValue(SwapFormKeyHelper.getChainKey(formType), event.target.value);
    setValue(SwapFormKeyHelper.getTokenKey(formType), '');
    setValue(SwapFormKeyHelper.getAmountKey(formType), '');
  };

  const menuItems = chains?.map((chain) => (
    <MenuItem key={chain.key} value={chain.id}>
      <ListItemIcon>
        <Avatar
          src={chain.logoURI}
          alt={chain.key}
          sx={{ width: 24, height: 24 }}
        >
          {chain.name[0]}
        </Avatar>
      </ListItemIcon>
      {chain.name}
    </MenuItem>
  ));

  return !isLoading ? (
    <>
      <FormControl
        fullWidth
        sx={{ display: formType === 'from' ? 'inline-flex' : 'none' }}
      >
        <Select
          MenuProps={{ elevation: 2 }}
          defaultValue={fromChain}
          value={fromChainId}
          onChange={handleChain}
        >
          {menuItems}
        </Select>
      </FormControl>
      <FormControl
        fullWidth
        sx={{ display: formType === 'to' ? 'inline-flex' : 'none' }}
      >
        <Select
          MenuProps={{ elevation: 2 }}
          defaultValue={toChain}
          value={toChainId}
          onChange={handleChain}
        >
          {menuItems}
        </Select>
      </FormControl>
    </>
  ) : (
    <Skeleton
      variant="rectangular"
      width="100%"
      height={45}
      sx={{ borderRadius: 1 }}
    />
  );
};