import { Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';
import {
    getTopThreeTokens, getTotalTopThreeAmount, getTotalAmountForAllUsers,
    getPercentWithDecimals, getUnitFromPercent, getPercentTopPerTop3, getPoolTrade, getTokenStats
} from './calc';

const generateRandomData = () => {
    const tokens = ['AVAX', 'SHIB', 'DOT', 'BTC', 'ETH', 'SOL', 'XRP', 'ATOM', 'BNB', 'INCH', 'AVAX', 'LDO', 'EGLD', 'ALGO', 'BCH', 'EOS', 'ADA', 'TRX', 'XMR', 'DOGE'];

    const tokenValues = {};
    tokens.forEach((token) => {
        const value = Math.floor(Math.random() < 0.05 ? Math.random() * 130 - 30 : Math.random() * 18 - 8);
        tokenValues[token] = { name: token, percentEv: value };
    });

    const users = [];
    for (let i = 0; i < 100; i++) {
        const username = `degen${i}`;
        const token_bet = tokens[Math.floor(Math.random() * tokens.length)];
        const amount_bet = Math.floor(Math.random() < 0.03 ? Math.random() * 6990 + 10 : Math.random() * 990 + 10);
        users.push({ name: username, token_bet, amount_bet });
    }
    const InitialPool = {};
    InitialPool.totalAmount = users.reduce((total, user) => total + user.amount_bet, 0);
    InitialPool.tokenBets = {};
    tokens.forEach((token) => {
        const tokenBets = users.filter((user) => user.token_bet === token);
        InitialPool.tokenBets[token] = {
            betCount: tokenBets.length,
            betAmount: tokenBets.reduce((total, user) => total + user.amount_bet, 0),
        };
    });
    return { tokenValues, users, InitialPool };
};

function PrototypeVisu() {

    const { tokenValues, users, InitialPool } = generateRandomData();

    // 3 TOKEN WITH MAX AMOUNT-BET
    const topThreeTokens = getTopThreeTokens(InitialPool);
    // TOTAL AMOUNT FROM TOP 
    const totalTopThreeAmount = getTotalTopThreeAmount(InitialPool);

    // Calculate the total amount owned for all users
    const totalAmountForAllUsers = getTotalAmountForAllUsers(users);

    //Object coin top /top 3 Amount
    const percentTopPerTop3 = getPercentTopPerTop3(InitialPool)

    const poolTrades = getPoolTrade(totalAmountForAllUsers, percentTopPerTop3, tokenValues)

    const TokenStats = getTokenStats(tokenValues)

    console.log(TokenStats);
    //console.log(poolTradesWithFinalAmount);
    /*     // Calculate the top 3 most owned tokens from the list of users
        const top3Tokens = findMostOwnedTokens(users);
    
        // Calculate the total amount owned for the top 3 tokens
        const totalAmountForTop3Tokens = getTotalAmountForTokens(users, top3Tokens);
    
        //Best and dumbest amount user top 1 and 3
        const biggestAmountUserforToken = getBiggestAmountUserForToken(users, top3Tokens[0])
        const lowestAmountUserForTop3Tokens = getLowestAmountUserForTop3Tokens(users, top3Tokens)
    
        
    
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
    
        //
        const percentPerUserOnPoolBiggest = getPercentWithDecimals(biggestAmountUserforToken.amount, TotalAmountForToken0)
        const percentPerUserOnPoolLowest = getPercentWithDecimals(lowestAmountUserForTop3Tokens.amount, TotalAmountForToken2)
    
        const tokenTop1PercentTotal = getPercentWithDecimals(TotalAmountForToken0, totalAmountForTop3Tokens)
        const tokenTop2PercentTotal = getPercentWithDecimals(TotalAmountForToken1, totalAmountForTop3Tokens)
        const tokenTop3PercentTotal = getPercentWithDecimals(TotalAmountForToken2, totalAmountForTop3Tokens)
    
        const tokenTop1FullyInvested = getUnitFromPercent(totalAmountForAllUsers, tokenTop1PercentTotal)
        const tokenTop2FullyInvested = getUnitFromPercent(totalAmountForAllUsers, tokenTop2PercentTotal)
        const tokenTop3FullyInvested = getUnitFromPercent(totalAmountForAllUsers, tokenTop3PercentTotal) */

    return (
        <>
            <Grid display={'flex'} flexDirection={'row'} gap={'1rem'} alignItems='center' justifyContent={'space-around'}>
                <Stack flexDirection={"column"}>
                    <Typography variant='h2'>List of Tokens</Typography>
                    <Typography variant='body2'>TOTAL POOL LIQUIDITY : {totalAmountForAllUsers} $</Typography>
                </Stack>
                <Stack flexDirection={"column"}>
                    <Typography variant='body1'>Choosen Tokens and amount repartition </Typography>
                    {Object.entries(percentTopPerTop3).map((token, index) => (
                        <Typography variant='body2' key={index}>
                            {token[0]} with {token[1]}%
                        </Typography>
                    ))}
                </Stack>


            </Grid>
            <Grid>
                <Typography variant='body1'>Pool Trades (7d)</Typography>
                <TableContainer sx={{ flexWrap: 'wrap', display: 'flex', width: '50%' }}>

                    <Table>
                        <TableHead sx={{ background: '#eeeeee' }}>
                            <TableRow>
                                <TableCell>TOP 3</TableCell>
                                <TableCell align="right">Pool amount</TableCell>
                                <TableCell align="right">After 7d</TableCell>
                                <TableCell align="right">Pool PnL</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {poolTrades.map((trade, index) => (
                                <TableRow
                                    key={trade}
                                >
                                    <TableCell>{trade.tokenName}</TableCell>
                                    <TableCell align="right">{trade.newAmount}</TableCell>
                                    <TableCell align="right">{trade.finalValue}</TableCell>
                                    <TableCell align="right">{trade.net_pnl}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

            <Grid display={'flex'} flexDirection={'row'} gap={'1rem'} alignItems='center' justifyContent={'center'}>
                <TableContainer sx={{ flexWrap: 'wrap', display: 'flex', width: '50%' }}>

                    <Table>
                        <TableHead sx={{ background: '#eeeeee' }}>
                            <TableRow>
                                <TableCell>Token</TableCell>
                                <TableCell align="right">Total Amount</TableCell>
                                <TableCell align="right">Voters</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.entries(InitialPool.tokenBets)
                                .sort((a, b) => b[1].betAmount - a[1].betAmount)
                                .map(([token, pool], index) => (
                                    <TableRow
                                        key={token}
                                        className={index < 3 ? "highlighted-row" : ""}
                                    >
                                        <TableCell>{token}</TableCell>
                                        <TableCell align="right">{pool.betAmount}</TableCell>
                                        <TableCell align="right">{pool.betCount}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TableContainer sx={{ flexWrap: 'wrap', display: 'flex', width: '40%' }}>

                    <Table>
                        <TableHead sx={{ background: '#eeeeee' }}>
                            <TableRow>
                                <TableCell>Token</TableCell>
                                <TableCell align="right">Evolution (7d)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.entries(tokenValues)
                                .sort((a, b) => b[1].percentEv - a[1].percentEv)
                                .map(([token, percentEv], index) => (
                                    <TableRow
                                        key={token}
                                        className={index < 3 ? "highlighted-row" : ""}
                                    >
                                        <TableCell>{token}</TableCell>
                                        <TableCell align="right">{percentEv.percentEv} %</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>

                </TableContainer>
            </Grid><Typography variant='h2'>List of Degens</Typography><TableContainer sx={{ flexWrap: 'wrap', display: 'flex' }}>

                <Table>
                    <TableHead sx={{ background: '#eeeeee' }}>
                        <TableRow>
                            <TableCell>User</TableCell>
                            <TableCell align="right">Token</TableCell>
                            <TableCell align="right">Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.sort((a, b) => b.amount_bet - a.amount_bet).map((user, index) => (
                            <TableRow key={user.name}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell align="right">{user.token_bet}</TableCell>
                                <TableCell align="right">{user.amount_bet}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </TableContainer>
        </>

    );
}

export default PrototypeVisu;
