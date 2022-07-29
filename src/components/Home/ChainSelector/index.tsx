import React, { useMemo, useCallback } from 'react';
import { Dropdown, DropdownProps } from 'semantic-ui-react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectChain } from '../../../slices/keySlice';
import { cutter } from '@utils/text';
import chains from '@/config/chains';

export default () => {
  const dispatch = useAppDispatch();
  const selectedChain = useAppSelector(state => state.key.selectedChain);

  const chainOptions = useMemo(() => chains.map((chain, idx) => ({
    key: chain.name,
    value: chain.name,
    text: chain.name.toUpperCase()
  })), []);

  const onChainSelect = useCallback((event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
    dispatch(selectChain(data.value as string));
  }, []);


  return (
    <Dropdown
      className='chain-selector'
      selection
      options={chainOptions}
      value={selectedChain || chainOptions[0]?.value}
      onChange={onChainSelect}
    />
  );
}
