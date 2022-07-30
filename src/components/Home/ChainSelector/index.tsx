import React, { useMemo, useCallback } from 'react';
import { Dropdown, DropdownProps } from 'semantic-ui-react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectChain } from '../../../slices/keySlice';
import { cutter } from '@utils/text';
import chains from '@/config/chains';

export default () => {
  const dispatch = useAppDispatch();
  const selectedChainId = useAppSelector(state => state.key.selectedChainId);

  const chainOptions = useMemo(() => chains.map((chain, idx) => ({
    key: idx,
    value: idx,
    text: chain.name.toUpperCase()
  })), []);

  const onChainSelect = useCallback((event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
    dispatch(selectChain(data.value as number));
  }, []);


  return (
    <Dropdown
      className='chain-selector'
      selection
      options={chainOptions}
      value={selectedChainId || 0}
      onChange={onChainSelect}
    />
  );
}
