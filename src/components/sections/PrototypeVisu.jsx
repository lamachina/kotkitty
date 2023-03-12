import { Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';
import {
    getTopThreeTokens, getTotalTopThreeAmount, getTotalAmountForAllUsers,
    getPercentWithDecimals, getUnitFromPercent, getPercentTopPerTop3, getPoolTrade, getAvgEvmTopThree, getAvgEvm, getTopTokenBets, getOtherTokenData
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

    const AvgEvmTopThree = getAvgEvmTopThree(InitialPool, tokenValues)

    const AvgEvm = getAvgEvm(InitialPool, tokenValues)

    const restOfTrade = poolTrades[0].finalValue + poolTrades[1].finalValue + poolTrades[2].finalValue

    const TopTokenBets = getTopTokenBets(users, topThreeTokens, InitialPool, poolTrades)

    const token = TopTokenBets[0].token;

    //const numNonVoters = getNumNonVoters(token, TopTokenBets, InitialPool);

    const OtherTokenData = getOtherTokenData(TopTokenBets, InitialPool, poolTrades, topThreeTokens)

    console.log(OtherTokenData);

    return (
        <Grid >
            <Grid display={'flex'} flexDirection={'column'} alignItems='left' justifyContent={'space-around'}>
                <Typography variant='h2'>List of Tokens</Typography>
                <Typography variant='body2'>TOTAL POOL LIQUIDITY : {totalAmountForAllUsers} $</Typography>
                <Stack flexDirection={"column"} gap='0.3rem'>
                    <Typography variant='body1'>Choosen Tokens and amount repartition </Typography>
                    {Object.entries(percentTopPerTop3).map((token, index) => (
                        <Typography variant='body2' key={index}>
                            {token[0]} with {token[1]}%
                        </Typography>
                    ))}
                </Stack>
                <Typography variant='body1'>Pool Trades (7d) generated {AvgEvmTopThree}% . The minority average generated is {AvgEvm}%</Typography>
                <Typography variant='overline'>Pool {AvgEvmTopThree > 0 ? AvgEvmTopThree > AvgEvm * 2 ? '' : 'did not' : 'did not'} won</Typography>
                <Typography variant='body1'>Rest : {Math.round(restOfTrade * 100) / 100} ( {Math.round((restOfTrade - totalAmountForAllUsers) * 100) / 100} )</Typography>

            </Grid>
            <Grid display={'flex'} flexDirection={'column'} alignItems='left' justifyContent={'space-around'}>

                <TableContainer sx={{ display: 'flex' }}>
                    <Table stickyHeader>
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

            <Grid display={'flex'} flexDirection={'column'} gap={'1rem'} alignItems='center' justifyContent={'center'}>
                <TableContainer sx={{ flexWrap: 'wrap', display: 'flex', height: '13rem', overflowY: 'initial' }}>

                    <Table stickyHeader>
                        <TableHead sx={{ background: '#eeeeee' }} >
                            <TableRow >
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
                <TableContainer sx={{ flexWrap: 'wrap', display: 'flex', height: '13rem', overflowY: 'initial' }}>

                    <Table stickyHeader>
                        <TableHead >
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
                                        className={index < 3 ? "highlighted-roww" : ""}
                                    >
                                        <TableCell>{token}</TableCell>
                                        <TableCell align="right">{percentEv.percentEv} %</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>

                </TableContainer>
            </Grid>
            <Grid>
                <Typography variant='h2'>List of Winners Degens</Typography>
                <TableContainer sx={{ flexWrap: 'wrap', display: 'flex', height: '13rem', overflowY: 'initial' }}>

                    <Table stickyHeader>
                        <TableHead sx={{ background: '#eeeeee' }}>
                            <TableRow>
                                <TableCell>User</TableCell>
                                <TableCell align="right">Amount</TableCell>
                                <TableCell align="right">Primary</TableCell>
                                <TableCell align="right">Secondary</TableCell>
                                <TableCell align="right">Token</TableCell>
                                <TableCell align="right">% in Pool</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {TopTokenBets.map((degen, index) => (
                                <TableRow key={degen.name}>
                                    <TableCell>{degen.name}</TableCell>
                                    <TableCell align="right">{degen.amount_bet}</TableCell>
                                    <TableCell align="right">{degen.benef}</TableCell>
                                    <TableCell align="right">{OtherTokenData[index]}</TableCell>
                                    <TableCell align="right">{degen.token}</TableCell>
                                    <TableCell align="right">{degen.ratio}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </TableContainer>
                <Typography variant='h2'>List of Degens</Typography>
                <TableContainer sx={{ flexWrap: 'wrap', display: 'flex', height: '13rem', overflowY: 'initial' }}>

                    <Table stickyHeader>
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
            </Grid>
        </Grid>

    );
}

export default PrototypeVisu;
