import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { Dropdown, DropdownProps } from 'semantic-ui-react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectChain } from '../../../slices/keySlice';
import { cutter } from '@utils/text';
import chains from '@/config/chains';
import { getGlobalChainState } from '@/serviceworker/database';

export default () => {
  const dispatch = useAppDispatch();
  const selectedChainId = useAppSelector(state => state.key.selectedChainId);
  const [chainState, setChainState] = useState([] as Array<Boolean>);

  useEffect(() => {
    const core = async () => {
      setChainState(await getGlobalChainState());
    };
    core();
  }, []);

  const chainOptions = useMemo(() => chains.map((chain, idx) => ({
    key: idx,
    value: idx,
    text: chain.name.toUpperCase()
  })), [chainState]);

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
