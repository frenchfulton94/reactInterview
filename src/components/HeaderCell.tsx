import {FC, ChangeEventHandler, useCallback,} from "react";
import {Box, Input} from "@chakra-ui/react";

interface HeaderCellProps {
    value: string;
    onSelect: (selectedColumn: string, index: number) => void;
    onTextChange: (newValue: string) => void;
    index: number;
}
const HeaderCell: FC<HeaderCellProps> = (props) => {
    const {
        value,
        index,
        onSelect,
        onTextChange
    } = props;

    const onChangeHandler = useCallback((ev) => {
        onTextChange(ev.target.value);
    }, []);

    const onSelectHandler = useCallback(() => {
        console.log(value, " ", index)
        onSelect(value, index);
    }, []);
    return (
        <Box
            color="white"
            backgroundColor="blue.700"
            onDoubleClick={onSelectHandler}
        >
            <Input
                borderRadius={0}
                width="full"
                value={value}
                onChange={onChangeHandler} />
        </Box>
    );
};

export default HeaderCell;