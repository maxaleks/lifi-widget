import type { ExtendedChain } from '@lifi/sdk';
import { Avatar, Container, List, ListItemAvatar } from '@mui/material';
import { useChainSelect } from '../../components/ChainSelect';
import { useTokenSelect } from '../../components/TokenList';
import { useNavigateBack } from '../../hooks';
import { ListItemButton, ListItemText } from './SelectChainPage.style';
import type { SelectChainPageProps } from './types';

export const SelectChainPage: React.FC<SelectChainPageProps> = ({
  formType,
  selectNativeToken,
}) => {
  const { navigateBack } = useNavigateBack();
  const { chains, setCurrentChain } = useChainSelect(formType);
  const selectToken = useTokenSelect(formType, navigateBack);

  const handleClick = async (chain: ExtendedChain) => {
    if (selectNativeToken) {
      selectToken(chain.nativeToken.address, chain.id);
    } else {
      setCurrentChain(chain.id);
      navigateBack();
    }
  };

  return (
    <Container disableGutters>
      <List
        sx={{
          paddingLeft: 1.5,
          paddingRight: 1.5,
        }}
      >
        {chains?.map((chain) => (
          <ListItemButton
            key={chain.id}
            onClick={() => handleClick(chain)}
            disableRipple
          >
            <ListItemAvatar>
              <Avatar
                src={chain.logoURI}
                alt={chain.name}
                imgProps={{ crossOrigin: 'anonymous' }}
              >
                {chain.name[0]}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={chain.name} />
          </ListItemButton>
        ))}
      </List>
    </Container>
  );
};
