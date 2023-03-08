
const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token']
    if (!token) {
        return res.status(401).json({
            error: 'no token provided'
        })
    }
    next()
}

export default verifyToken