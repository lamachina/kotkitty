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