import { User } from "../models/User.js";

const users = async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    } catch (error) {
        return res.status(500).json({error: "Error de server"});
    }
};

const user = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        res.json(user);
    } catch (error) {
        return res.status(500).json({error: "Error de server"});
    }
};

const register = async (req, res) => {
    const { email, user, password, repassword } = req.body;
    try {
        const newUser = new User({ email, user, password, repassword });
        await newUser.save();
        console.log(newUser);
        return res.status(201).json({ ok: true });

    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            if (error.keyValue.hasOwnProperty('email')) {
                return res.status(400).json({error: 'Ya existe un usuario con este email'});
            } else if (error.keyValue.hasOwnProperty('user')) {
                return res.status(400).json({error: 'Ya existe este usuario'});
            } else {
                return res.status(500).json({ error: "Error de servidor" });                
            }
        };
        return res.status(500).json({ error: "Error de servidor" });
    }
}

const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(403).json({ error: 'No existe este usuario' });
        }
        const respuestaPassword = await user.comparePassword(password);
        if(!respuestaPassword){
            return res.status(403).json({ error: "Contraseña incorrecta" });
        }
        console.log({ email, password });
        return res.json({ ok: true });
    } catch (error) {
        console.log(error);
    }
}

export { user, users, register, login };