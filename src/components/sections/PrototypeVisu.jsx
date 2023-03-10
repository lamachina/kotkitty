import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';
import {
    findMostOwnedTokens, getTotalAmountForTokens, getTotalAmountForAllUsers, getRatioTopThreeOnTotal,
    getNumberOfUsersForToken, getTotalAmountForToken, getBiggestAmountUserForToken, getLowestAmountUserForTop3Tokens
} from './calc';

const tokenList = ['BTC', 'ETH', 'SOL', 'DOT', 'XRP', 'ATOM', 'BNB', 'INCH', 'AVAX', 'LDO', 'EGLD'];

function PrototypeVisu() {
    // Create an array of 100 random users
    const users = Array.from({ length: 100 }, () => ({
        token: tokenList[Math.floor(Math.random() * tokenList.length)],
        amount: Math.floor(Math.random() * 9901) + 100, // Random number between 100 and 100000
    }));
    // Calculate the top 3 most owned tokens from the list of users
    const top3Tokens = findMostOwnedTokens(users);

    // Calculate the total amount owned for the top 3 tokens
    const totalAmountForTop3Tokens = getTotalAmountForTokens(users, top3Tokens);

    //Best and dumbest amount user top 1 and 3
    const biggestAmountUserforToken = getBiggestAmountUserForToken(users, top3Tokens[0])
    const lowestAmountUserForTop3Tokens = getLowestAmountUserForTop3Tokens(users, top3Tokens)

    // Calculate the total amount owned for all users
    const totalAmountForAllUsers = getTotalAmountForAllUsers(users);

    // Calculate the total amount owned for all users
    const ratioTopThreeOnTotal = getRatioTopThreeOnTotal(totalAmountForTop3Tokens, totalAmountForAllUsers);
    // Calculate the total amount owned for all users
    const NumberOfUsersForToken0 = getNumberOfUsersForToken(users, top3Tokens[0]);
    const NumberOfUsersForToken1 = getNumberOfUsersForToken(users, top3Tokens[1]);
    const NumberOfUsersForToken2 = getNumberOfUsersForToken(users, top3Tokens[2]);
    // Calculate the total amount owned for all users
    const TotalAmountForToken0 = getTotalAmountForToken(users, top3Tokens[0]);
    const TotalAmountForToken1 = getTotalAmountForToken(users, top3Tokens[1]);
    const TotalAmountForToken2 = getTotalAmountForToken(users, top3Tokens[2]);


    return (
        <><Grid>
            <Typography variant='h2'>List of Random Users</Typography>
            <Typography variant='body2'>The top 3 owned token is {top3Tokens[0] + ' ' + top3Tokens[1] + ' ' + top3Tokens[2]}</Typography>
            <Typography variant='body2'>The total pool for the top 3 is {totalAmountForTop3Tokens} $</Typography>
            <Typography variant='body2'>The total pool is {totalAmountForAllUsers} $</Typography>
            <Typography variant='body2'>{ratioTopThreeOnTotal}% winners on the pool</Typography>
            <Typography variant='body2'>{NumberOfUsersForToken0} users invested in {top3Tokens[0]} = {TotalAmountForToken0} $  </Typography>
            <Typography variant='body2'>{NumberOfUsersForToken1} users invested in {top3Tokens[1]} = {TotalAmountForToken1} $  </Typography>
            <Typography variant='body2'>{NumberOfUsersForToken2} users invested in {top3Tokens[2]} = {TotalAmountForToken2} $  </Typography>

            <Typography>The smartest user has: {biggestAmountUserforToken.amount} $ of {biggestAmountUserforToken.token} </Typography>
            <Typography>The dumbest user has: {lowestAmountUserForTop3Tokens.amount} $ of {lowestAmountUserForTop3Tokens.token} </Typography>
        </Grid>

            <TableContainer sx={{ flexWrap: 'wrap', display: 'flex' }}>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>user</TableCell>
                            <TableCell align="right">Token</TableCell>
                            <TableCell align="right">Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user, index) => (
                            <TableRow>
                                <TableCell>{index}</TableCell>
                                <TableCell align="right">{user.token}</TableCell>
                                <TableCell align="right">{user.amount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer></>
    );
}

export default PrototypeVisu;
