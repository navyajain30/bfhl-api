
export const isPrime = (num) => {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};

export const getFibonacci = (n) => {
    if (n < 0) throw new Error("Negative number for Fibonacci");
    if (n === 0) return [0];
    if (n === 1) return [0];
    let seq = [0, 1];
    for (let i = 2; i < n; i++) {
        seq.push(seq[i - 1] + seq[i - 2]);
    }
    return seq;
};

export const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);

export const getHCF = (arr) => {
    if (!arr.length) return null;
    let result = arr[0];
    for (let i = 1; i < arr.length; i++) {
        result = gcd(arr[i], result);
    }
    return result;
};

export const getLCM = (arr) => {
    if (!arr.length) return null;
    let result = arr[0];
    for (let i = 1; i < arr.length; i++) {
        result = (Math.abs(arr[i] * result)) / gcd(arr[i], result);
    }
    return result;
};
