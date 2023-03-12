export function getTopThreeTokens(pool) {
    const sortedTokens = Object.entries(pool.tokenBets)
        .sort(([, a], [, b]) => b.betAmount - a.betAmount);
    return sortedTokens.slice(0, 3).map(([token]) => token);
}


export function getTotalTopThreeAmount(pool) {
    const topThreeTokens = getTopThreeTokens(pool);
    return topThreeTokens.reduce((total, token) => {
        return total + pool.tokenBets[token].betAmount;
    }, 0);
}


export function getTotalAmountForAllUsers(users) {
    // Sum the amounts for all users
    const totalAmount = users.reduce((sum, user) => sum + user.amount_bet, 0);

    return totalAmount;
}

export function getPercentTopPerTop3(pool) {
    const topThreeTokens = getTopThreeTokens(pool);
    const totalTopThreeAmount = getTotalTopThreeAmount(pool);

    const result = {};

    for (let i = 0; i < topThreeTokens.length; i++) {
        const token = topThreeTokens[i];
        const percent = getPercentWithDecimals(pool.tokenBets[token].betAmount, totalTopThreeAmount);
        result[token] = percent;
    }

    return result;
}


export function getPoolTrade(totalAmount, percentTOpPerTop3, tokenValues) {
    const tokenNames = Object.keys(percentTOpPerTop3);
    const poolTrades = [];

    for (let i = 0; i < tokenNames.length; i++) {
        const tokenName = tokenNames[i];
        const percentOp = percentTOpPerTop3[tokenName];
        const tokenValue = tokenValues[tokenName];
        const newAmount = totalAmount * (percentOp / 100);
        const finalValue = newAmount + (newAmount / 100 * tokenValue.percentEv);
        const difference = finalValue - newAmount

        poolTrades.push({
            tokenName: tokenName,
            newAmount: Math.round(newAmount * 100) / 100,
            finalValue: Math.round(finalValue * 100) / 100,
            net_pnl: Math.round(difference * 100) / 100,
        });
    }

    return poolTrades;
}


export function getAvgEvmTopThree(pool, tokenValues) {
    const topThreeTokens = getTopThreeTokens(pool);
    const topThreePercentEvs = topThreeTokens.map((token) => tokenValues[token].percentEv);
    const sum = topThreePercentEvs.reduce((acc, percentEv) => acc + percentEv, 0);
    return Math.round(sum / topThreePercentEvs.length * 100) / 100;
}

export function getAvgEvm(pool, tokenValues) {
    const topThreeTokens = getTopThreeTokens(pool);
    const tokens = Object.keys(tokenValues).filter(token => !topThreeTokens.includes(token));
    const sortedTokens = tokens.sort((a, b) => tokenValues[b].percentEv - tokenValues[a].percentEv);
    const topTwelveTokens = sortedTokens.slice(0, 9);
    const evmValues = topTwelveTokens.map(token => tokenValues[token].percentEv);
    const avgEvm = evmValues.reduce((sum, ev) => sum + ev, 0) / evmValues.length;

    return Math.round(avgEvm * 100) / 100;
}



export function getTopTokenBets(users, topThreeTokens, InitialPool, poolTrades) {
    const topTokenBets = [];


    // Loop through each user in the users array
    for (let user of users) {
        // Check if the user's token_bet is one of the top three tokens
        if (topThreeTokens.includes(user.token_bet)) {
            // If so, add the user's name, token, and amount_bet to the topTokenBets array
            const betAmount = InitialPool.tokenBets[user.token_bet]?.betAmount ?? 0;
            const ratio = betAmount > 0 ? user.amount_bet / betAmount : 0;
            const benef = ratio > 0 ? ratio * (poolTrades.find((trade) => trade.tokenName === user.token_bet)?.finalValue / 2) : 0;


            // Get the two tokens that are different from the user's token_bet
            const otherTokens = Object.keys(poolTrades[0].tokenName)
                .filter(token => token !== user.token_bet);

            // Calculate the benefSec
            const benefSec = otherTokens.reduce((sum, token) => {
                const trade = poolTrades.find((trade) => trade.tokenName === token);
                return sum + (trade?.finalValue ?? 0) / 2;
            }, 0);

            topTokenBets.push({
                name: user.name,
                token: user.token_bet,
                amount_bet: user.amount_bet,
                ratio: Math.round(ratio * 10000) / 100,
                benef: Math.round(benef * 100) / 100,
                benefSecond: Math.round(benefSec * 100) / 100
            });
        }
    }

    return topTokenBets;
}

/* export function getOtherTokenData(users, InitialPool, poolTrades, topThreeTokens) {
    const otherTokenData = [];

    for (let token of Object.keys(InitialPool.tokenBets)) {
        if (token !== users.token_bet && topThreeTokens.includes(token)) {
            const betCount = InitialPool.tokenBets[token].betCount;
            const finalValue = poolTrades.find((trade) => trade.tokenName === token)?.finalValue;
            const equityprop = finalValue / 2 / betCount

            otherTokenData.push({
                token: token,
                betCount: betCount,
                finalValue: equityprop
            });
        }
    }

    return otherTokenData;
} */

export function getOtherTokenData(TopTokenBets, InitialPool, poolTrades, topThreeTokens) {
    const otherTokenData = [];

    // Get an array of the other two tokens
    const otherTokens = Object.keys(InitialPool.tokenBets).filter(token => token !== TopTokenBets.token && topThreeTokens.includes(token)).slice(0, 2);

    // Calculate the sum of betCount of the other two tokens
    const otherBetCountSum = otherTokens.reduce((sum, token) => sum + InitialPool.tokenBets[token].betCount, 0);

    for (let token of otherTokens) {
        const betCount = InitialPool.tokenBets[token].betCount;
        const finalValue = poolTrades.find((trade) => trade.tokenName === token)?.finalValue;
        const equityprop = finalValue / 2 / otherBetCountSum;

        otherTokenData.push({
            token: token,
            betCount: betCount,
            finalValue: finalValue,
            equityprop: equityprop
        });
    }

    return otherTokenData;
}




export function getNumNonVoters(topTokenBets, InitialPool, token) {
    // Find the index of the pool that matches the given token
    const poolIndex = InitialPool.findIndex((pool) => pool.token === token);

    if (poolIndex === -1) {
        // The given token wasn't found in the InitialPool, so return null
        return null;
    }

    // Get the betCount for the given token from the InitialPool
    const tokenBetCount = InitialPool[poolIndex].betCount;

    // Create a Set of the voters who bet on the given token
    const tokenVoters = new Set(topTokenBets.filter((bet) => bet.token === token).map((bet) => bet.name));

    // Calculate the number of voters who did not bet on the given token
    const nonVotersCount = InitialPool.reduce((sum, pool, i) => {
        // Ignore the pool for the given token
        if (i === poolIndex) {
            return sum;
        }

        // Add the betCount for pools that aren't the given token and whose voters did not bet on the given token
        const voters = new Set(Object.keys(pool.voters));
        if (![...voters].some((voter) => tokenVoters.has(voter))) {
            sum += pool.betCount;
        }

        return sum;
    }, 0);

    return nonVotersCount;
}






///////////////////////////////////////////////////////////////////////////////////////////////////////
export function getRatioTopThreeOnTotal(totalAmountForTop3Tokens, totalAmountForAllUsers) {
    // Sum the amounts for all users

    return Math.round((totalAmountForTop3Tokens / totalAmountForAllUsers) * 10000) / 100;
}

export function getUsersForToken(users, token) {
    // Filter the list of users to only include those who own the given token
    const filteredUsers = users.filter(user => user.token === token);

    return filteredUsers;
}

export function getNumberOfUsersForToken(users, token) {
    // Get the number of users who own the given token
    const usersForToken = getUsersForToken(users, token);
    const numberOfUsers = usersForToken.length;

    return numberOfUsers;
}

export function getTotalAmountForToken(users, token) {
    // Get the total amount owned for the given token
    const usersForToken = getUsersForToken(users, token);
    const totalAmount = usersForToken.reduce((sum, user) => sum + user.amount, 0);

    return totalAmount;
}


export function getBiggestAmountUserForToken(users, token) {
    const usersWithToken = users.filter((user) => user.token === token);
    return usersWithToken.reduce((prev, current) => {
        return prev.amount > current.amount ? prev : current;
    });
}

export function getLowestAmountUserForTop3Tokens(users, top3Tokens) {
    const usersWithTop3Tokens = users.filter((user) => top3Tokens.includes(user.token));
    return usersWithTop3Tokens.reduce((prev, current) => {
        return prev.amount < current.amount ? prev : current;
    });
}

// XX.XX%
export function getPercentWithDecimals(num1, num2) {

    return Math.round((num1 / num2) * 10000) / 100;
}
//
export function getUnitFromPercent(num1, num2) {

    return Math.round((num1 / 100) * num2);
}