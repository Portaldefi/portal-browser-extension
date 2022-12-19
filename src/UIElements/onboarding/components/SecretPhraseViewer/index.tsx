import React
// , { useState }
 from 'react';
import { Label, Segment } from 'semantic-ui-react';
import { 
  // useAppDispatch, 
  useAppSelector } from '../../hooks';
import { RootState } from '../../store';

export default () => {
  // const [visible, setVisible] = useState(false);

  const phrases = useAppSelector((state: RootState) => state.phrase.SRF_List);
  console.log(phrases);

  return (
    <Segment>
      <div>
        {phrases.map(phrase => <Label>{phrase}</Label>)}
      </div>
    </Segment>
  );
}
