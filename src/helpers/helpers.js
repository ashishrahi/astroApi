import jwt from 'jsonwebtoken';

export const generateAccessToken = (userId) => {
    return jwt.sign(
        { sub: userId },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: '10m', issuer: 'astro' }
    );
};

export const generateRefreshToken = (userId) => {
    return jwt.sign(
        { sub: userId },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '30d', issuer: 'astro' }
    );
};
