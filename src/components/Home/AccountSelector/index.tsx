import React, { useMemo, useCallback } from 'react';
import { Dropdown, DropdownProps } from 'semantic-ui-react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectIdentity } from '../../../slices/keySlice';
import { cutter } from '@utils/text';


export default () => {
  const dispatch = useAppDispatch();
  const identities = useAppSelector(state => state.key.identity);
  const selectedIdentityId = useAppSelector(state => state.key.selectedIdentityId);


  const accountOptions = useMemo(() => identities.map((identity, idx) => ({
    key: idx,
    value: idx,
    text: `Identity ${idx} (${cutter(identity[0].address)})`
  })), [identities]);

  const handleSelectAccount = useCallback((event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
    dispatch(selectIdentity(data.value as number));
  }, []);

  return (
    <Dropdown
      selection
      options={accountOptions}
      value={(selectedIdentityId) || 0}
      onChange={handleSelectAccount} />
  );
}
