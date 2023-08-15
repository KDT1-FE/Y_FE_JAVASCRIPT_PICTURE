export default function getMembersAll(req, res) {
    if (req.method === 'GET') {
        return res.status(200).json({
            message: 'getMembersAll',
        });
    } else {
        return res.status(400).json({
            message: 'Error',
        });
    }
}
