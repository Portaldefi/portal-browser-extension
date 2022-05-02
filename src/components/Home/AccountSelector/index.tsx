import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const accountOptions = [
  { key: 'id1', value: 'id1', text: 'Identity 1 (fabric28h...8o3)' },
  { key: 'id2', value: 'id2', text: 'Identity 2 (fabric23i...33b)' },
  { key: 'id3', value: 'id3', text: 'Identity 3 (fabric82s...12k)' },
  { key: 'id4', value: 'id4', text: 'Identity 4 (fabric678...32d)' },
  { key: 'id5', value: 'id5', text: 'Identity 5 (fabric98j...3kj)' },
  { key: 'id6', value: 'id6', text: 'Identity 6 (fabricw2d...skb)' },
];

export default () => {
  return (
    <Dropdown selection options={accountOptions} defaultValue={accountOptions[0].value} />
  );
}