import React, { useMemo, useCallback } from 'react';
import { Dropdown, DropdownProps } from 'semantic-ui-react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectAddress } from '../../../slices/keySlice';
import { cutter } from '@utils/text';


export default () => {
  const dispatch = useAppDispatch();
  const identities = useAppSelector(state => state.key.identity);
  const selectedIdentity = useAppSelector(state => state.key.selectedIdentity);

  console.log(identities);

  const accountOptions = useMemo(() => identities.map((identity, idx) => ({
    key: identity[0].address,
    value: identity[0].address,
    text: `Identity ${idx} (${cutter(identity[0].address)})`
  })), [identities]);

  const handleSelectAccount = useCallback((event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
    dispatch(selectAddress(data.value as string));
  }, []);

  return (
    <Dropdown
      selection
      options={accountOptions}
      value={selectedIdentity || accountOptions[0]?.value}
      onChange={handleSelectAccount} />
  );
}
