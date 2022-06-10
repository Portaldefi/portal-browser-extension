import React, { useMemo, useCallback } from 'react';
import { Dropdown, DropdownProps } from 'semantic-ui-react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectAddress } from '../../../slices/keySlice';
import { cutter } from '../../../../utils/text';


export default () => {
  const dispatch = useAppDispatch();
  const addresses = useAppSelector(state => state.key.address);
  const selectedAddress = useAppSelector(state => state.key.selectedAddress);

  const accountOptions = useMemo(() => addresses.map((address, idx) => ({
    key: address,
    value: address,
    text: `Identity ${idx} (fabric${cutter(address)})`
  })), [addresses]);
  const handleChange = useCallback((event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
    dispatch(selectAddress(data.value as string));
  }, []);
  console.log(selectedAddress);
  console.log(selectedAddress && accountOptions[0]?.value);

  return (
    <Dropdown selection options={accountOptions} value={selectedAddress || accountOptions[0]?.value} onChange={handleChange} />
  );
}