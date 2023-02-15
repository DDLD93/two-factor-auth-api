const UserCtrl = require('../controllers/user.controller');
const tokenParser = require("../middleware/token.middleware")

module.exports = (express) => {
    api = express.Router();
    api.post("/login", async (req, res) => {
        let { email, password } = req.body;
        const { ok, user, token, message } = await UserCtrl.loginUser(email, password)
        if (ok) {
            res.status(200).json({ ok, user, token })
        } else {
            res.status(500).json({ ok, message })
        }
    });

    api.post("/register", async (req, res) => {
        let data = req.body
        let { ok, user, message,accessToken } = await UserCtrl.registerUser(data)
        if (ok) {
            return res.status(201).json({ ok: true, user,accessToken })
        } else {
            return res.status(500).json({ ok: false, message });
        }
    });
    api.post("/verify",tokenParser, async (req, res) => {
        let {code } = req.body
        let { ok, user,token, message } = await UserCtrl.verifyUser(req.user.phone, code)
        if (ok) {
            return res.status(201).json({ ok: true, user,token })
        } else {
            return res.status(500).json({ ok: false, message });
        }
    });

    api.post("/resend-token", async (req, res) => {
        let { phone } = req.body
        let { ok, accessToken, message } = await UserCtrl.sendToken(phone)
        if (ok) {
            return res.status(201).json({ ok: true, accessToken })
        } else {
            return res.status(500).json({ ok: false, message });
        }
    });

    api.patch("/password/:id", async (req, res) => {
        const { password } = req.body;
        const { id } = req.params;
        const { ok, user, message } = await UserCtrl.updatePassword(id, password);
        if (ok) {
            res.status(200).json({ ok, user })
        } else {
            res.status(500).json({ ok, message })
        }


    });




    api.get("/", async (req, res) => {
        let status = await UserCtrl.getUsers();
        if (status.ok) {
            if (status.payload) return res.status(200).json(status);
            return res.status(200).json([]);
        } else {
            return res.status(500).json(status);
        }
    });

    api.get("/:id", async (req, res) => {
        let { id } = req.params;
        let status = await UserCtrl.getUser(id);
        if (status.ok) {
            if (status.payload) return res.status(200).json(status);
            return res.status(200).json({});
        } else {
            return res.status(500).json(status);
        }
    });

    api.post("/", async (req, res) => {
        let data = req.body
        console.log(req)
        let status = await UserCtrl.addUser(data);
        if (status.ok) {
            return res.status(200).json(status);
        } else {
            return res.status(500).json(status);
        }
    });

    api.put("/:id", async (req, res) => {
        let { id } = req.params;
        let body = req.body;
        delete body.createdAt;
        let status = await UserCtrl.updateUser(id, body)
        if (status.ok) {
            return res.status(200).json(status);
        } else {
            return res.status(500).json(status);
        }
    });

    // Deleting One
    api.delete("/:id", async (req, res) => {
        let { id } = req.params;
        let status = await UserCtrl.deleteUser(id)
        if (status.ok) {
            return res.status(200).json(status);
        } else {
            return res.status(500).json(status);
        }
    });

    return api;
}