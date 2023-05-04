import { Box, Flex } from '@chakra-ui/react';
import _ from 'lodash';
import React, {useCallback, useState} from 'react';

import Cell from 'components/Cell';
import SpreadsheetHeader from "./SpreadsheetHeader";
import HeaderCell from "./HeaderCell";

const NUM_ROWS = 10;
const NUM_COLUMNS = 10;

const Spreadsheet: React.FC = () => {
  const [spreadsheetState, setSpreadsheetState] = useState(
    _.times(NUM_ROWS, () => _.times(NUM_COLUMNS, _.constant(''))),
  );
  const [selectedState, setSelectedState] = useState({
    isSelected: false,
    isRow: false,
    index: 0,
  });
  const onColumnSelectHandler = useCallback((selectedColumn: string, index: number) => {
    console.log("col", selectedColumn, index)

    setSelectedState({
      isSelected: true,
      isRow: false,
      index,
    });
  }, [selectedState]);
    const onRowSelectHandler = useCallback((selectedColumn: string, index: number) => {
        console.log("row: ", selectedColumn, index)
      setSelectedState({
        isSelected: true,
        isRow: true,
        index,
      });
    }, []);
    console.log(selectedState)
  const isRowSelected =  selectedState.isSelected && selectedState.isRow;
  const isColSelected = selectedState.isSelected && !selectedState.isRow
  return (
    <Box width="full">
      <SpreadsheetHeader
          numberOfCells={NUM_COLUMNS + 1}
          onSelect={onColumnSelectHandler}
          isRowHeader={false} />
      {spreadsheetState.map((row, rowIdx) => {
        return (
              <Flex
                  key={String(rowIdx)}
              >
                <HeaderCell
                    key={"rowheader" + rowIdx}
                    value={""}
                    onSelect={onRowSelectHandler}
                    onTextChange={() => {}}
                    index={rowIdx}
                    />
                {row.map((cellValue, columnIdx) => (
                  <Cell
                      index={columnIdx}
                    isStart={selectedState.isRow ? columnIdx === 0 : rowIdx === 0 }
                    isEnd={selectedState.isRow ? columnIdx === NUM_COLUMNS - 1 : rowIdx === NUM_ROWS - 1}
                    rowSelected={isRowSelected && selectedState.index === rowIdx }
                    columnSelected={isColSelected && selectedState.index - 1 === columnIdx}
                    key={`${rowIdx}/${columnIdx}`}
                    value={cellValue}
                    onChange={(newValue: string) => {
                      const newRow = [
                        ...spreadsheetState[rowIdx].slice(0, columnIdx),
                        newValue,
                        ...spreadsheetState[rowIdx].slice(columnIdx + 1),
                      ];
                      setSpreadsheetState([
                        ...spreadsheetState.slice(0, rowIdx),
                        newRow,
                        ...spreadsheetState.slice(rowIdx + 1),
                      ]);
                    }}
                  />
                ))}
              </Flex>
        );
      })}
    </Box>
  );
};

export default Spreadsheet;
