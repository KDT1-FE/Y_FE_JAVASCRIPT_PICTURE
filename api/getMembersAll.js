export default function getMembersAll(req, res) {
    if (req.method === 'GET') {
        return res.status(200).json({
            message: 'Hello, World!',
        });
    } else {
        return res.status(405).json({
            message: 'We only support GET',
        });
    }
}
