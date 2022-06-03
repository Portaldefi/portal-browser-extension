import React, { useMemo, useCallback } from 'react';
import { Dropdown, DropdownProps } from 'semantic-ui-react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectAddress } from '../../../slices/keySlice';
import { cutter } from '../../../../utils/text';

export default () => {
  const dispatch = useAppDispatch();
  const addresses = useAppSelector(state => state.key.address);

  const accountOptions = useMemo(() => addresses.map((address, idx) => ({
    key: address,
    value: address,
    text: `Identity ${idx} (fabric${cutter(address)})`
  })), [addresses]);
  const handleChange = useCallback((event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
    dispatch(selectAddress(data.value as string));
  }, []);

  return (
    <Dropdown selection options={accountOptions} defaultValue={accountOptions[0]?.value} onChange={handleChange} />
  );
}