import React, {useCallback, useState} from "react";
import _ from 'lodash';
import HeaderCell from "./HeaderCell";
import {Flex} from "@chakra-ui/react";

interface SpreadsheetHeaderProps {
    numberOfCells: number;
    onSelect: (selectedColumn: string, index: number) => void;
    isRowHeader: boolean;
}

const SpreadsheetHeader: React.FC<SpreadsheetHeaderProps>  = ({numberOfCells, onSelect, isRowHeader} ) => {
    const [columnsState, setColumnState] = useState(_.times(numberOfCells, _.constant('')));
    const onSelectHandler = useCallback(
        (selectedColumn: string, index: number) => {
            onSelect(selectedColumn, index)
        }, [])

    const toCells = useCallback(
        (column: string, index: number): JSX.Element =>
            (<HeaderCell
                key={"colheader" + index}
                value={columnsState[index]}
                index={index}
                onSelect={onSelectHandler}
                onTextChange={(newValue: string) =>
                    {
                        const header = [
                            ...columnsState.slice(0, index),
                            newValue,
                            ...columnsState.slice(index + 1)
                        ];

                        setColumnState(header);
                    }
                }
            />)
        , []);

    const getHeaderCells = () => {
        const headerCells = [];
        for (let i = 0; i < numberOfCells; i++) {
            headerCells.push(toCells(columnsState[i], i))
        }

        return headerCells;
    }
    return (
        <Flex direction={isRowHeader ? 'column' : 'row'}>
            {getHeaderCells()}
        </Flex>
    )
}

export default SpreadsheetHeader;