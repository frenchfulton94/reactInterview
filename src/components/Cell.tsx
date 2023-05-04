import { Input, Box } from '@chakra-ui/react';
import React, { useCallback } from 'react';

interface Props {
  isStart?: boolean;
  isEnd?: boolean;
  value: string;
  onChange: (newValue: string) => void;
  columnSelected: boolean;
  rowSelected: boolean;
  index: number;
}

const Cell: React.FC<Props> = ({key, value, onChange, columnSelected, isStart, isEnd, rowSelected, index}) => {
  const onChangeHandler = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (ev) => {
      onChange(ev.target.value);
    },
    [onChange],
  );

  console.log(isEnd, "end", rowSelected, index)

  return (
    <Box
        borderRightColor={ (rowSelected && isEnd) || columnSelected ? 'orange.600' : ''}
        borderLeftColor={(rowSelected && isStart) || columnSelected ? 'orange.600' : ''}
        borderTopColor={(columnSelected && isStart) || rowSelected ? 'orange.600' : ''}
        borderBottomColor={(columnSelected && isEnd) || rowSelected ? 'orange.600' : ''}
    >
      <Input value={value} borderRadius={0} width="full" onChange={onChangeHandler} />
    </Box>
  );
};

export default Cell;
