import React from 'react';
import MuiTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import { Column, useTable } from 'react-table';
import { Text } from '../StyledUtils';
import { useDarkMode } from '../../../hooks';

const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        // '& tr td:last-child': {
        //     textAlign: 'right',
        // },
    },
    tableRow: {
        '&:nth-of-type(odd)': {
            backgroundColor: (props: CustomProps) =>
                props.stripTable ?? props.darkMode ? 'rgb(45, 53, 78)' : theme.palette.action.hover,
        },
    },
    tableHead: {
        '& th': {
            borderBottom: 'none',
        },
    },
    tableCell: {
        borderBottom: 'none',
    },
    tableContainer: {
        boxShadow: 'none',
    },
}));

type CustomProps = {
    stripTable?: boolean;
    darkMode: boolean;
};

interface Props {
    columns: Column<Record<any, any>>[];
    data: Record<any, any>[];
    customprops?: CustomProps;
}

export const TablePro: React.FC<Props> = ({ columns, data, ...rest }: Props) => {
    const darkMode = useDarkMode();
    const { customprops } = rest;
    const customStyleProps = { ...customprops, darkMode: darkMode.value };
    const classes = useStyles(customStyleProps);
    // Use the state and functions returned from useTable to build your UI
    const { getTableProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data,
    });

    // Render the UI for your table
    return (
        <MuiTable className={classes.root} {...getTableProps()}>
            <TableHead className={classes.tableHead}>
                {headerGroups.map((headerGroup) => (
                    // eslint-disable-next-line react/jsx-key
                    <TableRow {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            // eslint-disable-next-line react/jsx-key
                            <TableCell {...column.getHeaderProps()}>
                                <Text fontSize={'1.2em'} fontWeight={600}>
                                    {column.render('Header')}
                                </Text>
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableHead>
            <TableBody>
                {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        // eslint-disable-next-line react/jsx-key
                        <TableRow className={classes.tableRow} {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return (
                                    // eslint-disable-next-line react/jsx-key
                                    <TableCell className={classes.tableCell} {...cell.getCellProps()}>
                                        <Text fontSize={'1.2em'}>{cell.render('Cell')}</Text>
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    );
                })}
            </TableBody>
        </MuiTable>
    );
};
